import sys
import os

# Add python_ai to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import verify_password, get_password_hash
from seed_db import seed_database

print("Checking database...")
seed_database()

db = SessionLocal()
users = db.query(User).all()
print(f"Total users: {len(users)}")
for u in users:
    is_valid = verify_password("password", u.hashed_password)
    print(f"User: {u.email}, Role: {u.role}, Password check for 'password': {is_valid}, hash: {u.hashed_password}")
db.close()
