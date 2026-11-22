from datetime import timedelta

import pytest
from jose import jwt

from app.core.config import settings
from app.core.security import create_access_token, create_refresh_token
from tests.seed_data import PASSWORD, ROLE_USER, USERS

LOGIN = "/api/v1/auth/login/access-token"
REFRESH = "/api/v1/auth/refresh-token"
ME = "/api/v1/users/me"


def login(client, email, password=PASSWORD):
    return client.post(LOGIN, data={"username": email, "password": password})


@pytest.mark.parametrize("role", list(ROLE_USER))
def test_valid_login_returns_token_pair(client, user_ids, role):
    key = ROLE_USER[role]
    res = login(client, USERS[key]["email"])
    assert res.status_code == 200
    body = res.json()
    assert body["token_type"] == "bearer"
    access = jwt.decode(body["access_token"], settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    refresh = jwt.decode(body["refresh_token"], settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
    assert access["sub"] == str(user_ids[key]) and access["type"] == "access"
    assert refresh["sub"] == str(user_ids[key]) and refresh["type"] == "refresh"


def test_login_token_works_on_protected_endpoint(client):
    token = login(client, USERS["student_a"]["email"]).json()["access_token"]
    res = client.get(ME, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 200
    assert res.json()["email"] == USERS["student_a"]["email"]


def test_invalid_password(client):
    res = login(client, USERS["admin"]["email"], password="wrong-password")
    assert res.status_code == 400
    assert res.json()["detail"] == "Incorrect email or password"


def test_unknown_email(client):
    res = login(client, "nobody@test.uniinsight.edu")
    assert res.status_code == 400
    assert res.json()["detail"] == "Incorrect email or password"


def test_login_requires_form_fields(client):
    assert client.post(LOGIN, data={}).status_code == 422


def test_missing_token(client):
    res = client.get(ME)
    assert res.status_code == 401


@pytest.mark.parametrize(
    "token",
    ["not-a-jwt", "Bearer", "a.b.c"],
    ids=["garbage", "word", "fake-segments"],
)
def test_invalid_token(client, token):
    res = client.get(ME, headers={"Authorization": f"Bearer {token}"})
    assert res.status_code == 403
    assert res.json()["detail"] == "Could not validate credentials"


def test_token_signed_with_wrong_key(client, user_ids):
    forged = jwt.encode({"sub": str(user_ids["admin"]), "type": "access"}, "not-the-secret", algorithm=settings.ALGORITHM)
    res = client.get(ME, headers={"Authorization": f"Bearer {forged}"})
    assert res.status_code == 403


def test_expired_token(client, user_ids):
    expired = create_access_token(user_ids["admin"], expires_delta=timedelta(minutes=-5))
    res = client.get(ME, headers={"Authorization": f"Bearer {expired}"})
    assert res.status_code == 403


def test_token_for_deleted_user(client):
    res = client.get(ME, headers={"Authorization": f"Bearer {create_access_token(999999)}"})
    assert res.status_code == 404


def test_me_returns_user_without_password_hash(client, auth_headers, user_ids):
    res = client.get(ME, headers=auth_headers("teacher"))
    assert res.status_code == 200
    assert res.json() == {
        "id": user_ids["teacher"],
        "email": USERS["teacher"]["email"],
        "name": USERS["teacher"]["name"],
        "role": "teacher",
    }


def test_refresh_token_flow(client, user_ids):
    res = client.post(REFRESH, json={"refresh_token": create_refresh_token(user_ids["parent"])})
    assert res.status_code == 200
    new_access = res.json()["access_token"]
    assert client.get(ME, headers={"Authorization": f"Bearer {new_access}"}).json()["role"] == "parent"


def test_refresh_rejects_access_token(client, user_ids):
    res = client.post(REFRESH, json={"refresh_token": create_access_token(user_ids["parent"])})
    assert res.status_code == 403
    assert res.json()["detail"] == "Invalid token type"


def test_refresh_rejects_garbage(client):
    assert client.post(REFRESH, json={"refresh_token": "garbage"}).status_code == 403
