from sqlalchemy import Column, Integer, Float, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class StudentPerformance(Base):
    __tablename__ = "student_performance"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    attendance = Column(Float)
    assignments = Column(Float)
    midterm_marks = Column(Float)
    participation = Column(Float)
    risk_category = Column(String)

    user = relationship("User", back_populates="performance")
