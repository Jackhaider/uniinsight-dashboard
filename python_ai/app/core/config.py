import os
from pydantic_settings import BaseSettings

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
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./uniinsight.db")
    
    # GEMINI
    GEMINI_API_KEY: str | None = os.getenv("GEMINI_API_KEY")

    class Config:
        case_sensitive = True
        env_file = ".env"
        extra = "ignore"

settings = Settings()
