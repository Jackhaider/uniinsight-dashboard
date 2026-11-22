import pytest
from sqlalchemy import inspect
from sqlalchemy.exc import IntegrityError

from app.db.base import Base
from app.models import FeeLedger, Instructor, Schedule, StudentPerformance, User
from tests.seed_data import FEE, INSTRUCTOR, PERFORMANCE, SCHEDULE, USERS

EXPECTED_COLUMNS = {
    "users": {"id", "name", "email", "hashed_password", "role"},
    "student_performance": {"id", "user_id", "attendance", "assignments", "midterm_marks", "participation", "risk_category"},
    "fee_ledgers": {"id", "user_id", "total_tuition", "paid_amount", "due_amount"},
    "instructors": {"id", "name", "email", "office", "subject_expertise"},
    "schedules": {"id", "time_str", "subject", "venue", "instructor_id", "target_role"},
}


def test_metadata_registers_all_models():
    assert set(Base.metadata.tables) == set(EXPECTED_COLUMNS)


@pytest.mark.parametrize("table", sorted(EXPECTED_COLUMNS))
def test_database_columns_match_models(db_engine, table):
    columns = {c["name"] for c in inspect(db_engine).get_columns(table)}
    assert columns == EXPECTED_COLUMNS[table]
    assert {c.name for c in Base.metadata.tables[table].columns} == EXPECTED_COLUMNS[table]


def test_foreign_keys(db_engine):
    insp = inspect(db_engine)
    fk = lambda t: {(f["constrained_columns"][0], f["referred_table"]) for f in insp.get_foreign_keys(t)}
    assert fk("student_performance") == {("user_id", "users")}
    assert fk("fee_ledgers") == {("user_id", "users")}
    assert fk("schedules") == {("instructor_id", "instructors")}


def test_user_performance_and_fees_relationships(db):
    user = db.query(User).filter(User.email == USERS["student_a"]["email"]).one()
    assert isinstance(user.performance, StudentPerformance)
    assert user.performance.midterm_marks == PERFORMANCE["student_a"]["midterm_marks"]
    assert user.performance.user is user  # back_populates
    assert isinstance(user.fees, FeeLedger)
    assert user.fees.due_amount == FEE["due_amount"]
    assert user.fees.user is user


def test_user_without_records_has_none(db):
    user = db.query(User).filter(User.email == USERS["student_noperf"]["email"]).one()
    assert user.performance is None and user.fees is None


def test_schedule_instructor_relationship(db):
    schedule = db.query(Schedule).filter(Schedule.subject == SCHEDULE["subject"]).one()
    assert isinstance(schedule.instructor, Instructor)
    assert schedule.instructor.email == INSTRUCTOR["email"]


def test_user_email_is_unique(db):
    db.add(User(name="Dup", email=USERS["admin"]["email"], role="admin", hashed_password="x"))
    with pytest.raises(IntegrityError):
        db.flush()
    db.rollback()


def test_instructor_email_is_unique(db):
    db.add(Instructor(name="Dup", email=INSTRUCTOR["email"]))
    with pytest.raises(IntegrityError):
        db.flush()
    db.rollback()


def test_hashed_password_server_default(db):
    user = User(name="No Hash", email="nohash@test.uniinsight.edu", role="student")
    db.add(user)
    db.flush()
    db.refresh(user)
    assert user.hashed_password == "hashed_pw_placeholder"
    db.rollback()
