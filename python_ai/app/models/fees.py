from sqlalchemy import Column, Integer, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.db.base import Base

class FeeLedger(Base):
    __tablename__ = "fee_ledgers"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    total_tuition = Column(Float)
    paid_amount = Column(Float)
    due_amount = Column(Float)

    user = relationship("User", back_populates="fees")
