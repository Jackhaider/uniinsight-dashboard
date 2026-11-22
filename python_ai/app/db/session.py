from sqlalchemy import create_engine
from sqlalchemy.engine import make_url
from sqlalchemy.orm import sessionmaker
from app.core.config import settings

# PostgreSQL URL forms that must be served by psycopg2, the only PostgreSQL
# driver in requirements.txt. A plain "postgresql://" is pinned explicitly too,
# because SQLAlchemy 2.1+ maps it to psycopg (v3), which is not installed.
_PSYCOPG2_DRIVERNAMES = {"postgresql", "postgresql+psycopg"}


def normalize_database_url(raw_url: str) -> str:
    """Return the URL with PostgreSQL forms pinned to the psycopg2 driver.

    Handles "postgres://" (Heroku/Render style, rejected by SQLAlchemy 1.4+),
    plain "postgresql://", and "postgresql+psycopg://" (offered by some hosts,
    e.g. Neon). Credentials, host and query options such as sslmode are kept.
    Any other URL (SQLite, other drivers) is returned unchanged.
    """
    if raw_url.startswith("postgres://"):
        raw_url = "postgresql://" + raw_url[len("postgres://"):]
    url = make_url(raw_url)
    if url.drivername not in _PSYCOPG2_DRIVERNAMES:
        return raw_url
    return url.set(drivername="postgresql+psycopg2").render_as_string(hide_password=False)


db_url = normalize_database_url(settings.DATABASE_URL)

engine = create_engine(
    db_url,
    pool_pre_ping=True,
    connect_args={"check_same_thread": False} if db_url.startswith("sqlite") else {}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
