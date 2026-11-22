"""Small, deterministic dataset for the test template database.

Leaderboard score formula (students.py): int(midterm * 0.6 + assignments * 0.4 * 10)
"""

PASSWORD = "test-password"

# key -> user fields
USERS = {
    "admin": {"name": "Test Admin", "email": "admin@test.uniinsight.edu", "role": "admin"},
    "teacher": {"name": "Test Teacher", "email": "teacher@test.uniinsight.edu", "role": "teacher"},
    "parent": {"name": "Test Parent", "email": "parent@test.uniinsight.edu", "role": "parent"},
    "student_a": {"name": "Student A", "email": "student.a@test.uniinsight.edu", "role": "student"},
    "student_b": {"name": "Student B", "email": "student.b@test.uniinsight.edu", "role": "student"},
    "student_c": {"name": "Student C", "email": "student.c@test.uniinsight.edu", "role": "student"},
    "student_d": {"name": "Student D", "email": "student.d@test.uniinsight.edu", "role": "student"},
    # A student with no performance or fee rows (dashboard -> 404).
    "student_noperf": {"name": "Student NoPerf", "email": "student.noperf@test.uniinsight.edu", "role": "student"},
}

# key -> performance fields; expected score in comments
PERFORMANCE = {
    "student_a": {"attendance": 95.0, "assignments": 9.0, "midterm_marks": 90.0, "participation": 8.0, "risk_category": "Excellent"},  # 90
    "student_b": {"attendance": 80.0, "assignments": 7.0, "midterm_marks": 80.0, "participation": 6.0, "risk_category": "Good"},       # 76
    "student_c": {"attendance": 55.0, "assignments": 5.0, "midterm_marks": 50.0, "participation": 3.0, "risk_category": "At Risk"},    # 50
    "student_d": {"attendance": 88.0, "assignments": 10.0, "midterm_marks": 70.0, "participation": 7.0, "risk_category": "Good"},      # 82
}

EXPECTED_SCORES = {"student_a": 90, "student_d": 82, "student_b": 76, "student_c": 50}
EXPECTED_ORDER = ["student_a", "student_d", "student_b", "student_c"]  # rank 1..4

FEE = {"total_tuition": 5000.0, "paid_amount": 3750.0, "due_amount": 1250.0}

INSTRUCTOR = {"name": "Dr. Test Instructor", "email": "instructor@test.uniinsight.edu", "office": "Room 1", "subject_expertise": "Testing"}
SCHEDULE = {"time_str": "09:00 AM - 10:00 AM", "subject": "Test Lecture", "venue": "Room 1", "target_role": "student"}

ALL_ROLES = ["admin", "teacher", "student", "parent"]
# role -> fixture user key used to act as that role
ROLE_USER = {"admin": "admin", "teacher": "teacher", "student": "student_a", "parent": "parent"}


def populate(session, password_hash: str) -> None:
    """Insert the dataset. Every user shares one precomputed bcrypt hash."""
    from app.models import FeeLedger, Instructor, Schedule, StudentPerformance, User

    users = {}
    for key, fields in USERS.items():
        users[key] = User(hashed_password=password_hash, **fields)
        session.add(users[key])
    session.flush()

    for key, fields in PERFORMANCE.items():
        session.add(StudentPerformance(user_id=users[key].id, **fields))
        session.add(FeeLedger(user_id=users[key].id, **FEE))

    instructor = Instructor(**INSTRUCTOR)
    session.add(instructor)
    session.flush()
    session.add(Schedule(instructor_id=instructor.id, **SCHEDULE))
    session.commit()
