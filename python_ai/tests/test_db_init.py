"""Database initialisation: table creation, startup seeding and test isolation."""
import sqlite3
from pathlib import Path

import pandas as pd
import pytest
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker

import seed_db
import app.db.session as app_session
from app.db.base import Base
from app.models import FeeLedger, Instructor, Schedule, StudentPerformance, User
from tests.conftest import PROTECTED_DBS, TEMPLATE_DB, TEST_TMP_DIR
from tests.seed_data import USERS

BACKEND_DIR = Path(__file__).resolve().parents[1]


@pytest.fixture
def empty_engine(tmp_path):
    engine = create_engine(f"sqlite:///{(tmp_path / 'empty.db').as_posix()}")
    yield engine
    engine.dispose()


def test_app_engine_points_at_temporary_test_database():
    path = Path(app_session.engine.url.database).resolve()
    assert path == TEMPLATE_DB.resolve()
    assert TEST_TMP_DIR.resolve() in path.parents
    assert all(path != p.resolve() for p in PROTECTED_DBS)


def test_seed_module_shares_the_app_engine():
    assert seed_db.engine is app_session.engine


def test_create_all_builds_every_table(empty_engine):
    Base.metadata.create_all(bind=empty_engine)
    assert set(inspect(empty_engine).get_table_names()) == set(Base.metadata.tables)


def test_startup_seed_skipped_for_already_seeded_database():
    """app.main ran seed_database() at import; the template must be untouched by it."""
    conn = sqlite3.connect(f"file:{TEMPLATE_DB.as_posix()}?mode=ro", uri=True)
    try:
        assert conn.execute("select count(*) from users").fetchone()[0] == len(USERS)
    finally:
        conn.close()


def test_seed_database_on_empty_database_and_is_idempotent(empty_engine, monkeypatch):
    Base.metadata.create_all(bind=empty_engine)
    Session = sessionmaker(bind=empty_engine)
    monkeypatch.setattr(seed_db, "SessionLocal", Session)
    # Real bcrypt for 500+ users takes minutes; hashing is covered by test_auth.
    monkeypatch.setattr(seed_db, "get_password_hash", lambda p: f"test-hash:{p}")

    n_students = len(pd.read_csv(BACKEND_DIR / "student_data.csv"))
    seed_db.seed_database()

    def counts():
        with Session() as s:
            return {
                "users": s.query(User).count(),
                "students": s.query(User).filter(User.role == "student").count(),
                "teachers": s.query(User).filter(User.role == "teacher").count(),
                "admins": s.query(User).filter(User.role == "admin").count(),
                "parents": s.query(User).filter(User.role == "parent").count(),
                "performance": s.query(StudentPerformance).count(),
                "fees": s.query(FeeLedger).count(),
                "instructors": s.query(Instructor).count(),
                "schedules": s.query(Schedule).count(),
            }

    first = counts()
    assert first == {
        "users": n_students + 5, "students": n_students, "teachers": 3, "admins": 1, "parents": 1,
        "performance": n_students, "fees": n_students, "instructors": 3, "schedules": 5,
    }
    with Session() as s:
        student = s.query(User).filter(User.email == "student1@uniinsight.edu").one()
        assert student.performance is not None and student.fees is not None

    seed_db.seed_database()  # second run must be a no-op
    assert counts() == first
