from sqlalchemy import Column, Integer, String
from app.db.base import Base

class Instructor(Base):
    __tablename__ = "instructors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True)
    office = Column(String)
    subject_expertise = Column(String)
