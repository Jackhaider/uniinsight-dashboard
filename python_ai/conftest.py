# Manual scripts, not tests. test_login.py calls a running server at import
# time and check_db.py seeds the default (real) database, so never collect them,
# even when pytest is pointed at this folder explicitly (e.g. `pytest python_ai`).
collect_ignore = ["test_login.py", "check_db.py", "seed_db.py"]
