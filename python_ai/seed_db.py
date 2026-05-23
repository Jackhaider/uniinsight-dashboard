import pandas as pd
from app.db.session import SessionLocal, engine
from app.db.base import Base
from app.models import User, StudentPerformance, Instructor, Schedule, FeeLedger
from app.core.security import get_password_hash
import os

# Create all tables (in case migrations haven't run)
Base.metadata.create_all(bind=engine)

def seed_database():
    db = SessionLocal()
    
    # Check if we already seeded
    if db.query(User).first():
        print("Database already seeded. Skipping.")
        db.close()
        return

    print("Seeding Users and Students...")
    
    # 1. Create Mock Admin & Teachers & Parents
    admin = User(name="Admin User", email="admin@uniinsight.edu", role="admin", hashed_password=get_password_hash("password"))
    parent = User(name="Parent User", email="parent@demo.edu", role="parent", hashed_password=get_password_hash("password"))
    
    db.add_all([admin, parent])
    db.commit()

    # 2. Instructors
    inst_java = Instructor(name="Prof. Sarah D'Souza", email="sarah.dsouza@uniinsight.edu", office="Room 304", subject_expertise="Java")
    inst_dbms = Instructor(name="Dr. Ramesh Kumar", email="ramesh.kumar@uniinsight.edu", office="Room 402", subject_expertise="DBMS")
    inst_ai = Instructor(name="Dr. Amit Verma", email="amit.verma@uniinsight.edu", office="Room 101", subject_expertise="AI")
    
    db.add_all([inst_java, inst_dbms, inst_ai])
    db.commit()

    # Create matching Teacher Users
    teacher1 = User(name=inst_java.name, email=inst_java.email, role="teacher", hashed_password=get_password_hash("password"))
    teacher2 = User(name=inst_dbms.name, email=inst_dbms.email, role="teacher", hashed_password=get_password_hash("password"))
    teacher3 = User(name=inst_ai.name, email=inst_ai.email, role="teacher", hashed_password=get_password_hash("password"))
    
    db.add_all([teacher1, teacher2, teacher3])
    db.commit()

    # 3. Load students from CSV
    csv_path = os.path.join(os.path.dirname(__file__), "student_data.csv")
    if os.path.exists(csv_path):
        df = pd.read_csv(csv_path)
        for idx, row in df.iterrows():
            # Create User
            user = User(
                name=f"Student {idx+1}",
                email=f"student{idx+1}@uniinsight.edu",
                role="student",
                hashed_password=get_password_hash("password")
            )
            db.add(user)
            db.commit()
            
            # Create Performance
            perf = StudentPerformance(
                user_id=user.id,
                attendance=row['attendance'],
                assignments=row['assignment_completion'],
                midterm_marks=row['midterm_marks'],
                participation=row['participation'],
                risk_category=row.get('category', 'Unknown')
            )
            db.add(perf)
            
            # Create FeeLedger
            fee = FeeLedger(
                user_id=user.id,
                total_tuition=5000.0,
                paid_amount=3750.0, # Just using default mock from previous codebase
                due_amount=1250.0
            )
            db.add(fee)
        db.commit()
        print(f"Seeded {len(df)} students from CSV.")

    # 4. Schedules
    schedules = [
        Schedule(time_str="09:00 AM - 10:30 AM", subject="DBMS Lecture", venue="Room 402", instructor_id=inst_dbms.id, target_role="student"),
        Schedule(time_str="11:00 AM - 12:30 PM", subject="Java Programming Lab", venue="Lab 3", instructor_id=inst_java.id, target_role="student"),
        Schedule(time_str="02:00 PM - 03:30 PM", subject="Artificial Intelligence", venue="Room 101", instructor_id=inst_ai.id, target_role="student"),
        Schedule(time_str="04:00 PM - 05:00 PM", subject="Parent-Teacher Association Briefing", venue="Online", target_role="parent"),
        Schedule(time_str="10:00 AM - 11:30 AM", subject="Academic Council Synergy Meeting", venue="Executive Suite", target_role="admin")
    ]
    db.add_all(schedules)
    db.commit()

    db.close()
    print("Database seeding completed.")

if __name__ == "__main__":
    seed_database()
