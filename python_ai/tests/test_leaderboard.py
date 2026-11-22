import pytest

from tests.seed_data import ALL_ROLES, EXPECTED_ORDER, EXPECTED_SCORES, PERFORMANCE, USERS

LEADERBOARD = "/api/v1/students/leaderboard"


def test_response_structure(client, auth_headers):
    body = client.get(LEADERBOARD, headers=auth_headers("student_a")).json()
    assert set(body) == {"leaderboard", "current_user_rank"}
    for entry in body["leaderboard"]:
        assert set(entry) == {"id", "name", "score", "attendance", "rank", "is_current_user"}


def test_entries_sorted_ranked_and_named(client, auth_headers, user_ids):
    board = client.get(LEADERBOARD, headers=auth_headers("student_a")).json()["leaderboard"]
    # Only students with performance rows appear (student_noperf is excluded).
    assert [e["id"] for e in board] == [user_ids[k] for k in EXPECTED_ORDER]
    assert [e["name"] for e in board] == [USERS[k]["name"] for k in EXPECTED_ORDER]
    assert [e["score"] for e in board] == [EXPECTED_SCORES[k] for k in EXPECTED_ORDER]
    assert [e["rank"] for e in board] == list(range(1, len(EXPECTED_ORDER) + 1))
    assert [e["attendance"] for e in board] == [PERFORMANCE[k]["attendance"] for k in EXPECTED_ORDER]


@pytest.mark.parametrize("student", EXPECTED_ORDER)
def test_current_user_flag_and_rank(client, auth_headers, user_ids, student):
    body = client.get(LEADERBOARD, headers=auth_headers(student)).json()
    flagged = [e for e in body["leaderboard"] if e["is_current_user"]]
    assert len(flagged) == 1 and flagged[0]["id"] == user_ids[student]
    assert body["current_user_rank"] == flagged[0]
    assert body["current_user_rank"]["rank"] == EXPECTED_ORDER.index(student) + 1


@pytest.mark.parametrize("user_key", ["admin", "teacher", "parent", "student_noperf"])
def test_users_without_performance_have_no_rank(client, auth_headers, user_key):
    body = client.get(LEADERBOARD, headers=auth_headers(user_key)).json()
    assert body["current_user_rank"] is None
    assert not any(e["is_current_user"] for e in body["leaderboard"])
    assert len(body["leaderboard"]) == len(EXPECTED_ORDER)


@pytest.mark.parametrize("role", ALL_ROLES)
def test_accessible_to_all_authenticated_roles(client, role_headers, role):
    assert client.get(LEADERBOARD, headers=role_headers(role)).status_code == 200


def test_requires_authentication(client):
    assert client.get(LEADERBOARD).status_code == 401
