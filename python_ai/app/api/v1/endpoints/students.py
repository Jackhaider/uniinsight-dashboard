from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import Any, List

from app.api import deps
from app.models.user import User
from app.models.student import StudentPerformance

router = APIRouter()

@router.get("/leaderboard")
def get_leaderboard(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_active_user)
) -> Any:
    """
    Get the top institutional leaders based on midterm_marks and assignments.
    """
    performances = db.query(StudentPerformance).join(User).all()
    
    # Calculate a composite score for ranking
    scored_students = []
    for p in performances:
        score = int((p.midterm_marks or 0) * 0.6 + (p.assignments or 0) * 0.4 * 10)
        scored_students.append({
            "id": p.user.id,
            "name": p.user.full_name,
            "score": score,
            "attendance": p.attendance
        })
    
    # Sort descending by score
    scored_students.sort(key=lambda x: x["score"], reverse=True)
    
    # Assign ranks
    for i, student in enumerate(scored_students):
        student["rank"] = i + 1
        student["is_current_user"] = (student["id"] == current_user.id)
    
    return {
        "leaderboard": scored_students,
        "current_user_rank": next((s for s in scored_students if s["is_current_user"]), None)
    }

@router.get("/me/dashboard")
def get_my_dashboard(
    db: Session = Depends(deps.get_db),
    current_user: User = Depends(deps.get_current_student)
) -> Any:
    """
    Get the dashboard stats for the current student.
    """
    performance = db.query(StudentPerformance).filter(StudentPerformance.user_id == current_user.id).first()
    
    if not performance:
        raise HTTPException(status_code=404, detail="Performance records not found")
        
    all_performances = db.query(StudentPerformance).all()
    scored_students = []
    for p in all_performances:
        score = int((p.midterm_marks or 0) * 0.6 + (p.assignments or 0) * 0.4 * 10)
        scored_students.append({"id": p.user_id, "score": score})
        
    scored_students.sort(key=lambda x: x["score"], reverse=True)
    my_rank = next((i + 1 for i, s in enumerate(scored_students) if s["id"] == current_user.id), 0)
    my_score = next((s["score"] for s in scored_students if s["id"] == current_user.id), 0)
        
    return {
        "attendance": performance.attendance,
        "assignments": performance.assignments,
        "midterm_marks": performance.midterm_marks,
        "participation": performance.participation,
        "risk_category": performance.risk_category,
        "score": my_score,
        "rank": my_rank,
        "total_students": len(scored_students)
    }
