from typing import List
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from app.services.ml_service import ml_model
from app.api import deps
from app.models.user import User

router = APIRouter()

class FeaturesRequest(BaseModel):
    features: List[float]

@router.post("/predict_performance")
def predict_performance(
    req: FeaturesRequest,
    current_user: User = Depends(deps.get_current_user)
):
    if len(req.features) != 4:
        raise HTTPException(status_code=400, detail="Features format must have [attendance, assignments, marks, participation].")
    score = ml_model.predict_performance(req.features)
    return {"predicted_score": score}

@router.post("/classify_risk")
def classify_risk(
    req: FeaturesRequest,
    current_user: User = Depends(deps.get_current_user)
):
    if len(req.features) != 4:
        raise HTTPException(status_code=400, detail="Features format must have length 4.")
    category = ml_model.classify_risk(req.features)
    insights = ml_model.generate_insights(req.features)
    return {"risk_category": category, "insights": insights}

@router.post("/cluster_student")
def cluster_student(
    req: FeaturesRequest,
    current_user: User = Depends(deps.get_current_user)
):
    if len(req.features) != 4:
        raise HTTPException(status_code=400, detail="Features must have length 4.")
    cluster = ml_model.cluster_student(req.features)
    return {"cluster": cluster}

@router.post("/predict_all")
def predict_all(
    req: FeaturesRequest,
    current_user: User = Depends(deps.get_current_user)
):
    if len(req.features) != 4:
        raise HTTPException(status_code=400, detail="Features must have length 4.")
    score = ml_model.predict_performance(req.features)
    category = ml_model.classify_risk(req.features)
    cluster = ml_model.cluster_student(req.features)
    insights = ml_model.generate_insights(req.features)
    return {
        "predicted_score": score,
        "risk_category": category,
        "cluster": cluster,
        "insights": insights
    }
