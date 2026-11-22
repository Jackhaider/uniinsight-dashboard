import os
from pathlib import Path
from pydantic_settings import BaseSettings

# Resolve paths from this file's location, not the terminal's working directory.
# config.py -> core -> app -> python_ai (BACKEND_DIR) -> repo root (PROJECT_ROOT)
BACKEND_DIR = Path(__file__).resolve().parents[2]
PROJECT_ROOT = BACKEND_DIR.parent

# Local development database. Production (Render) always sets DATABASE_URL,
# so this default is only used when DATABASE_URL is not provided.
DEFAULT_SQLITE_PATH = PROJECT_ROOT / "uniinsight.db"
ENV_FILE_PATH = BACKEND_DIR / ".env"

class Settings(BaseSettings):
    PROJECT_NAME: str = "UniInsight Dashboard API"
    VERSION: str = "2.0.0"
    API_V1_STR: str = "/api/v1"
    
    # SECURITY
    SECRET_KEY: str = os.getenv("SECRET_KEY", "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7")
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8 # 8 days
    REFRESH_TOKEN_EXPIRE_DAYS: int = 7
    
    # DATABASE
    DATABASE_URL: str = os.getenv("DATABASE_URL", f"sqlite:///{DEFAULT_SQLITE_PATH.as_posix()}")
    
    # GEMINI
    GEMINI_API_KEY: str | None = os.getenv("GEMINI_API_KEY")

    class Config:
        case_sensitive = True
        env_file = str(ENV_FILE_PATH)
        extra = "ignore"

settings = Settings()
