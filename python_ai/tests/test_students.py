import pytest

from tests.seed_data import EXPECTED_ORDER, EXPECTED_SCORES, PERFORMANCE

DASHBOARD = "/api/v1/students/me/dashboard"


@pytest.mark.parametrize("student", EXPECTED_ORDER)
def test_dashboard_returns_own_stats_rank_and_score(client, auth_headers, student):
    res = client.get(DASHBOARD, headers=auth_headers(student))
    assert res.status_code == 200
    body = res.json()
    perf = PERFORMANCE[student]
    assert body == {
        "attendance": perf["attendance"],
        "assignments": perf["assignments"],
        "midterm_marks": perf["midterm_marks"],
        "participation": perf["participation"],
        "risk_category": perf["risk_category"],
        "score": EXPECTED_SCORES[student],
        "rank": EXPECTED_ORDER.index(student) + 1,
        "total_students": len(PERFORMANCE),
    }


def test_dashboard_404_without_performance_record(client, auth_headers):
    res = client.get(DASHBOARD, headers=auth_headers("student_noperf"))
    assert res.status_code == 404
    assert res.json()["detail"] == "Performance records not found"


def test_dashboard_agrees_with_leaderboard(client, auth_headers):
    headers = auth_headers("student_b")
    me = client.get(DASHBOARD, headers=headers).json()
    lb = client.get("/api/v1/students/leaderboard", headers=headers).json()["current_user_rank"]
    assert (me["rank"], me["score"]) == (lb["rank"], lb["score"])
