from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class Schedule(Base):
    __tablename__ = "schedules"

    id = Column(Integer, primary_key=True, index=True)
    time_str = Column(String)
    subject = Column(String)
    venue = Column(String, nullable=True)
    instructor_id = Column(Integer, ForeignKey("instructors.id"), nullable=True)
    target_role = Column(String)

    instructor = relationship("Instructor")
