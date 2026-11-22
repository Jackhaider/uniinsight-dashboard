"""Shared fixtures for the backend test suite.

Safety model
------------
* DATABASE_URL is forced to a throwaway SQLite file in a temp folder *before*
  any ``app`` module is imported, because ``app.db.session`` creates its engine
  at import time and ``app.main`` runs ``seed_database()`` at import time.
* The run aborts if the app engine ever points at a real project database.
* Both real databases are SHA-256 hashed before and after the run; any change
  fails the session.

Isolation model
---------------
* A small template database (``tests/seed_data.py``) is built once per run.
  Because it already has users, ``app.main``'s startup seeding skips it.
* Every test that touches the database gets its own fresh copy of the
  template, and the app's ``get_db`` dependency is overridden to use it.
"""
import hashlib
import os
import shutil
import tempfile
from pathlib import Path

import pytest

BACKEND_DIR = Path(__file__).resolve().parents[1]
PROJECT_ROOT = BACKEND_DIR.parent
PROTECTED_DBS = [PROJECT_ROOT / "uniinsight.db", BACKEND_DIR / "uniinsight.db"]


def _sha256(path: Path):
    return hashlib.sha256(path.read_bytes()).hexdigest() if path.exists() else None


_PROTECTED_HASHES_BEFORE = {p: _sha256(p) for p in PROTECTED_DBS}

TEST_TMP_DIR = Path(tempfile.mkdtemp(prefix="uniinsight-tests-"))
TEMPLATE_DB = TEST_TMP_DIR / "template.db"

# Must happen before importing anything from `app`. Overrides any DATABASE_URL
# already in the environment (e.g. a PostgreSQL URL) so tests can't reach it.
os.environ["DATABASE_URL"] = f"sqlite:///{TEMPLATE_DB.as_posix()}"

from sqlalchemy import create_engine  # noqa: E402
from sqlalchemy.orm import sessionmaker  # noqa: E402

from app.core.security import create_access_token, get_password_hash  # noqa: E402
from app.db.base import Base  # noqa: E402
from app.db import session as app_session  # noqa: E402
import app.models  # noqa: E402,F401
from app.models import User  # noqa: E402

from tests import seed_data  # noqa: E402

_engine_path = Path(app_session.engine.url.database).resolve()
if app_session.engine.url.drivername != "sqlite" or _engine_path != TEMPLATE_DB.resolve():
    pytest.exit(f"Refusing to run: app engine points at {app_session.engine.url!r}, not the test DB.", returncode=3)
if any(_engine_path == p.resolve() for p in PROTECTED_DBS):
    pytest.exit(f"Refusing to run: app engine points at a real project database ({_engine_path}).", returncode=3)

# Build the template database (one bcrypt hash shared by every fixture user).
Base.metadata.create_all(bind=app_session.engine)
with app_session.SessionLocal() as _s:
    seed_data.populate(_s, get_password_hash(seed_data.PASSWORD))
    USER_IDS = {key: _s.query(User).filter(User.email == f["email"]).one().id for key, f in seed_data.USERS.items()}

# Importing app.main runs startup seeding; it must find the template already seeded.
from app.main import app  # noqa: E402
from app.api import deps  # noqa: E402

app_session.engine.dispose()  # release the template file before tests copy it


# --------------------------------------------------------------------------- #
# Session-level safety
# --------------------------------------------------------------------------- #
def _changed_protected_dbs():
    return [str(p) for p in PROTECTED_DBS if _sha256(p) != _PROTECTED_HASHES_BEFORE[p]]


@pytest.fixture(scope="session", autouse=True)
def protect_real_databases():
    yield
    changed = _changed_protected_dbs()
    assert not changed, f"Real project database(s) were modified during the test run: {changed}"


def pytest_sessionfinish(session, exitstatus):
    if _changed_protected_dbs():
        session.exitstatus = 1
    shutil.rmtree(TEST_TMP_DIR, ignore_errors=True)


# --------------------------------------------------------------------------- #
# Per-test database
# --------------------------------------------------------------------------- #
@pytest.fixture
def db_path(tmp_path) -> Path:
    """Path to this test's private copy of the template database."""
    path = tmp_path / "test.db"
    shutil.copyfile(TEMPLATE_DB, path)
    return path


@pytest.fixture
def db_url(db_path) -> str:
    return f"sqlite:///{db_path.as_posix()}"


@pytest.fixture
def db_engine(db_url):
    engine = create_engine(db_url, connect_args={"check_same_thread": False})
    yield engine
    engine.dispose()


@pytest.fixture
def session_factory(db_engine):
    return sessionmaker(autocommit=False, autoflush=False, bind=db_engine)


@pytest.fixture
def db(session_factory):
    """ORM session on this test's database copy."""
    session = session_factory()
    yield session
    session.close()


@pytest.fixture
def client(session_factory):
    """TestClient whose get_db dependency uses this test's database copy."""
    from fastapi.testclient import TestClient

    def override_get_db():
        session = session_factory()
        try:
            yield session
        finally:
            session.close()

    app.dependency_overrides[deps.get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.pop(deps.get_db, None)


# --------------------------------------------------------------------------- #
# Auth helpers
# --------------------------------------------------------------------------- #
@pytest.fixture
def user_ids():
    return dict(USER_IDS)


@pytest.fixture
def auth_headers():
    """auth_headers("student_a") -> {"Authorization": "Bearer <access token>"}"""

    def _headers(user_key: str) -> dict:
        return {"Authorization": f"Bearer {create_access_token(USER_IDS[user_key])}"}

    return _headers


@pytest.fixture
def role_headers(auth_headers):
    """role_headers("teacher") -> headers for the fixture user acting as that role."""
    return lambda role: auth_headers(seed_data.ROLE_USER[role])
