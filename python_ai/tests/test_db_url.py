"""DATABASE_URL normalization: PostgreSQL URLs must use psycopg2.

All URLs here are fake (host "db.invalid"). create_engine() loads the driver
but never connects, so no test touches a real database.
"""
from pathlib import Path

import pytest
from sqlalchemy import create_engine
from sqlalchemy.engine import make_url

from app.db.session import normalize_database_url
from tests.test_config import run_python

FAKE_REST = "user:p%40ss%3Aw0rd@ep-fake-123.db.invalid:5432/appdb?sslmode=require&channel_binding=require"


@pytest.mark.parametrize("scheme", ["postgres", "postgresql", "postgresql+psycopg", "postgresql+psycopg2"])
def test_postgres_urls_pinned_to_psycopg2(scheme):
    raw = f"{scheme}://{FAKE_REST}"
    url = make_url(normalize_database_url(raw))
    expected = make_url(f"postgresql://{FAKE_REST}")
    assert url.drivername == "postgresql+psycopg2"
    # Everything except the driver is preserved, including the decoded password.
    assert (url.username, url.password, url.host, url.port, url.database) == (
        expected.username, expected.password, expected.host, expected.port, expected.database)
    assert url.password == "p@ss:w0rd"
    assert dict(url.query) == {"sslmode": "require", "channel_binding": "require"}


@pytest.mark.parametrize("raw", [
    "sqlite:///C:/some/dir/uniinsight.db",
    "sqlite:///./uniinsight.db",
    "sqlite://",
    f"postgresql+asyncpg://{FAKE_REST}",
])
def test_other_urls_unchanged(raw):
    assert normalize_database_url(raw) == raw


@pytest.mark.parametrize("scheme", ["postgresql", "postgresql+psycopg"])
def test_engine_initialises_with_psycopg2_without_connecting(scheme):
    engine = create_engine(normalize_database_url(f"{scheme}://{FAKE_REST}"), pool_pre_ping=True)
    try:
        assert engine.dialect.driver == "psycopg2"
    finally:
        engine.dispose()


@pytest.mark.subprocess
def test_app_session_import_uses_psycopg2_for_psycopg3_style_url():
    """Reproduces the Render failure: importing app.db.session with a
    postgresql+psycopg:// DATABASE_URL must not try to import psycopg (v3)."""
    code = (
        "import app.db.session as s, sys; "
        "assert 'psycopg' not in sys.modules, 'psycopg v3 was imported'; "
        "print(s.engine.dialect.driver)"
    )
    backend_dir = Path(__file__).resolve().parents[1]
    out = run_python(code, cwd=backend_dir, database_url=f"postgresql+psycopg://{FAKE_REST}")
    assert out == "psycopg2"
