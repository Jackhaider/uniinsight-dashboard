"""Configuration tests.

The DATABASE_URL default is baked in when config.py is first imported, and the
test process has DATABASE_URL forced to the test DB. So default-resolution
checks run in a fresh subprocess. Those subprocesses only import config/session
modules, which never open a database connection.
"""
import os
import subprocess
import sys
from pathlib import Path

import pytest

from app.core.config import DEFAULT_SQLITE_PATH, ENV_FILE_PATH, Settings

BACKEND_DIR = Path(__file__).resolve().parents[1]
PROJECT_ROOT = BACKEND_DIR.parent


def run_python(code: str, cwd: Path, database_url=None) -> str:
    env = {k: v for k, v in os.environ.items() if k != "DATABASE_URL"}
    env["PYTHONPATH"] = str(BACKEND_DIR)
    env["PYTHONDONTWRITEBYTECODE"] = "1"
    if database_url is not None:
        env["DATABASE_URL"] = database_url
    out = subprocess.run([sys.executable, "-c", code], cwd=cwd, env=env, capture_output=True, text=True, timeout=120)
    assert out.returncode == 0, out.stderr
    return out.stdout.strip().splitlines()[-1]


def _env_file_sets_database_url() -> bool:
    return ENV_FILE_PATH.exists() and "DATABASE_URL" in ENV_FILE_PATH.read_text(encoding="utf-8", errors="ignore")


def test_paths_anchor_to_config_file():
    assert DEFAULT_SQLITE_PATH == PROJECT_ROOT / "uniinsight.db"
    assert ENV_FILE_PATH == BACKEND_DIR / ".env"
    assert Settings.model_config["env_file"] == str(ENV_FILE_PATH)


@pytest.mark.subprocess
@pytest.mark.parametrize("where", ["project_root", "backend_dir", "outside"])
def test_default_sqlite_url_independent_of_cwd(where, tmp_path):
    if _env_file_sets_database_url():
        pytest.skip("python_ai/.env sets DATABASE_URL; default is not in effect")
    cwd = {"project_root": PROJECT_ROOT, "backend_dir": BACKEND_DIR, "outside": tmp_path}[where]
    url = run_python("from app.core.config import settings; print(settings.DATABASE_URL)", cwd)
    assert url == f"sqlite:///{DEFAULT_SQLITE_PATH.as_posix()}"
    assert not list(tmp_path.glob("*.db")), "importing config must not create a database"


@pytest.mark.subprocess
def test_database_url_env_overrides_default(tmp_path):
    target = f"sqlite:///{(tmp_path / 'override.db').as_posix()}"
    url = run_python("from app.core.config import settings; print(settings.DATABASE_URL)", tmp_path, target)
    assert url == target
    assert not (tmp_path / "override.db").exists()


@pytest.mark.subprocess
def test_postgres_scheme_rewritten_for_sqlalchemy(tmp_path):
    out = run_python(
        "from app.db.session import engine, db_url; print(engine.url.drivername, db_url)",
        tmp_path,
        "postgres://uniadmin:secret@db.example.invalid:5432/uniinsight",
    )
    assert out == "postgresql postgresql://uniadmin:secret@db.example.invalid:5432/uniinsight"


@pytest.mark.subprocess
def test_postgresql_scheme_left_unchanged(tmp_path):
    url = "postgresql://uniadmin:secret@db.example.invalid/uniinsight"
    assert run_python("from app.db.session import db_url; print(db_url)", tmp_path, url) == url


def test_env_file_values_are_loaded(tmp_path, monkeypatch):
    monkeypatch.delenv("GEMINI_API_KEY", raising=False)
    env_file = tmp_path / ".env"
    env_file.write_text("GEMINI_API_KEY=from-env-file\n", encoding="utf-8")
    assert Settings(_env_file=str(env_file)).GEMINI_API_KEY == "from-env-file"
