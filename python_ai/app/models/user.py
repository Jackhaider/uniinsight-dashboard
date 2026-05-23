from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from app.db.base import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String, nullable=False, server_default="hashed_pw_placeholder")
    role = Column(String) # 'student', 'teacher', 'parent', 'admin'
    
    # Relationships
    performance = relationship("StudentPerformance", back_populates="user", uselist=False)
    fees = relationship("FeeLedger", back_populates="user", uselist=False)
