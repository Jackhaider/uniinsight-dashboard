from fastapi import APIRouter
from app.api.v1.endpoints import auth, users, ml, rag, students

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(users.router, prefix="/users", tags=["users"])
api_router.include_router(ml.router, prefix="/ml", tags=["machine-learning"])
api_router.include_router(rag.router, prefix="/rag", tags=["rag"])
api_router.include_router(students.router, prefix="/students", tags=["students"])
