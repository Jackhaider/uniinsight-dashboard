from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.v1.api import api_router
from app.db.base import Base
from app.db.session import engine

# Seed database with initial users and data
# This script internally creates all tables safely by importing models first.
try:
    from seed_db import seed_database
    seed_database()
except Exception as e:
    import traceback
    print(f"Skipping seeding due to error:\n{traceback.format_exc()}")
app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Scalable FastAPI Backend for UniInsight with Enterprise Auth"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {"message": "Welcome to UniInsight Dashboard API"}
