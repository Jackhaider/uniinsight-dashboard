"""Role-based access control: endpoint matrix and the deps.* role guards.

The expected codes document the CURRENT behaviour. If a Phase 1 change alters
access rules intentionally, update the matrix in the same commit.
"""
import itertools

import pytest
from fastapi import HTTPException

from app.api import deps
from app.models import User
from tests.seed_data import ALL_ROLES

# (method, path, {role: expected status})
ENDPOINT_MATRIX = [
    ("GET", "/api/v1/users/me", {"admin": 200, "teacher": 200, "student": 200, "parent": 200}),
    ("GET", "/api/v1/students/leaderboard", {"admin": 200, "teacher": 200, "student": 200, "parent": 200}),
    # Admin passes the role check but has no performance row -> 404.
    ("GET", "/api/v1/students/me/dashboard", {"admin": 404, "teacher": 403, "student": 200, "parent": 403}),
    ("POST", "/api/v1/users/", {"admin": 200, "teacher": 403, "student": 403, "parent": 403}),
]

CASES = [
    pytest.param(method, path, role, expected[role], id=f"{method} {path} as {role}")
    for (method, path, expected), role in itertools.product(ENDPOINT_MATRIX, ALL_ROLES)
]


def _call(client, method, path, headers, role):
    if method == "POST":
        body = {"email": f"new.{role}@test.uniinsight.edu", "name": "New User", "role": "student", "password": "pw-123456"}
        return client.post(path, json=body, headers=headers)
    return client.get(path, headers=headers)


@pytest.mark.parametrize("method,path,role,expected", CASES)
def test_endpoint_access_by_role(client, role_headers, method, path, role, expected):
    res = _call(client, method, path, role_headers(role), role)
    assert res.status_code == expected, res.text
    if expected == 403:
        assert res.json()["detail"] == "The user doesn't have enough privileges"


@pytest.mark.parametrize("method,path", [(m, p) for m, p, _ in ENDPOINT_MATRIX], ids=lambda v: v)
def test_endpoints_reject_unauthenticated(client, method, path):
    assert _call(client, method, path, {}, "anon").status_code == 401


def test_admin_create_user_persists_and_rejects_duplicates(client, role_headers, db):
    body = {"email": "created@test.uniinsight.edu", "name": "Created", "role": "teacher", "password": "pw-123456"}
    first = client.post("/api/v1/users/", json=body, headers=role_headers("admin"))
    assert first.status_code == 200
    assert first.json()["role"] == "teacher" and "hashed_password" not in first.json()
    assert db.query(User).filter(User.email == body["email"]).count() == 1
    dup = client.post("/api/v1/users/", json=body, headers=role_headers("admin"))
    assert dup.status_code == 400


# --- Dependency guards (unit level; covers guards not yet used by endpoints) ---
GUARDS = {
    "get_current_active_user": {"admin", "teacher", "student", "parent"},
    "get_current_active_admin": {"admin"},
    "get_current_teacher": {"teacher", "admin"},
    "get_current_student": {"student", "admin"},
    "get_current_parent": {"parent", "admin"},
}


@pytest.mark.parametrize(
    "guard,role",
    list(itertools.product(GUARDS, ALL_ROLES)),
    ids=lambda v: v,
)
def test_role_guard(guard, role):
    user = User(id=1, name="x", email="x@test", role=role)
    fn = getattr(deps, guard)
    if role in GUARDS[guard]:
        assert fn(current_user=user) is user
    else:
        with pytest.raises(HTTPException) as exc:
            fn(current_user=user)
        assert exc.value.status_code == 403
