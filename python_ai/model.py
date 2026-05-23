import pandas as pd
import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.ensemble import RandomForestClassifier
from sklearn.cluster import KMeans
import os
import joblib

class EngineAI:
    def __init__(self):
        self.regression_model = LinearRegression()
        self.classification_model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.clustering_model = KMeans(n_clusters=3, random_state=42)
        
        self.is_trained = False
        
    def fit(self, df):
        if df.empty:
            print("Empty dataframe provided for training.")
            return

        # Features: attendance, assignment_completion, midterm_marks, participation
        X = df[['attendance', 'assignment_completion', 'midterm_marks', 'participation']]
        
        # Targets
        y_perf = df['performance_score']
        y_cat = df['category']
        
        # Train Regression
        self.regression_model.fit(X, y_perf)
        
        # Train Classification
        self.classification_model.fit(X, y_cat)
        
        # Train Clustering
        self.clustering_model.fit(X)
        
        self.is_trained = True
        print("Scikit-Learn Models Trained Successfully.")

    def predict_performance(self, features):
        """ Returns predicted performance score (0-100) and simple trend. """
        if not self.is_trained:
            return None
        
        score_pred = self.regression_model.predict([features])[0]
        score_pred = max(0, min(100, score_pred))  # Clamp between 0 and 100
        
        return round(score_pred, 2)
        
    def classify_risk(self, features):
        """ Returns category classification. """
        if not self.is_trained:
            return None
            
        category = self.classification_model.predict([features])[0]
        return category
        
    def cluster_student(self, features):
        """ Returns cluster assignment (0, 1, 2). """
        if not self.is_trained:
            return None
            
        cluster_id = self.clustering_model.predict([features])[0]
        
        # Provide human-readable archetypes based on cluster means
        # For simplicity, we just dynamically map based on cluster id if we don't know the exact order.
        desc = {
            0: "Cluster 0: Independent Learner",
            1: "Cluster 1: Highly Engaged",
            2: "Cluster 2: Needs Support" 
        }
        return {"id": int(cluster_id), "description": desc.get(int(cluster_id), f"Cluster {int(cluster_id)}")}

    def generate_insights(self, features):
        """ Rule-based engine explaining the predictions. """
        attendance, assignments, marks, participation = features
        insights = []
        
        if attendance < 75:
            insights.append("Low attendance is a primary indicator of performance decline.")
        if assignments < 60:
            insights.append("Missing assignments strongly suggest a rising risk level.")
        if participation < 5:
            insights.append("Low class participation might indicate disengagement or lack of understanding.")
        if marks > 85 and assignments > 85:
            insights.append("Strong coursework translates to excellent overall performance predictability.")
            
        if not insights:
            insights.append("Student metrics look stable. Keep monitoring for any sudden drops.")
            
        return insights
