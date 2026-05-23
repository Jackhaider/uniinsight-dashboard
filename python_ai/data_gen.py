import pandas as pd
import numpy as np
import os

def generate_synthetic_data(num_samples=500, out_path="student_data.csv"):
    np.random.seed(42)
    
    # 1. Generate core features with some correlations
    attendance = np.random.uniform(40, 100, num_samples)
    
    # Assignment completion usually correlates with attendance
    assignment_completion = attendance * 0.9 + np.random.normal(0, 5, num_samples)
    assignment_completion = np.clip(assignment_completion, 20, 100)
    
    # Midterm marks correlate with attendance and assignments
    midterm_marks = (attendance * 0.4 + assignment_completion * 0.6) + np.random.normal(0, 8, num_samples)
    midterm_marks = np.clip(midterm_marks, 20, 100)
    
    # Participation is somewhat independent but generally higher for active students
    participation = (attendance / 10) * 0.8 + np.random.uniform(1, 3, num_samples)
    participation = np.clip(participation, 1, 10)
    
    # 2. Calculate final performance score (Target for Regression)
    # Weighted formula + random noise
    performance_score = (
        attendance * 0.2 + 
        assignment_completion * 0.3 + 
        midterm_marks * 0.4 + 
        participation * 1.0
    ) + np.random.normal(0, 3, num_samples)
    
    performance_score = np.clip(performance_score, 0, 100)
    
    # 3. Derive Category (Target for Classification)
    def categorize(score):
        if score > 75: return "Good"
        if score > 50: return "Average"
        return "At Risk"
    
    categories = [categorize(s) for s in performance_score]
    
    # 4. Create DataFrame
    df = pd.DataFrame({
        'attendance': attendance,
        'assignment_completion': assignment_completion,
        'midterm_marks': midterm_marks,
        'participation': participation,
        'performance_score': performance_score,
        'category': categories
    })
    
    # Save to CSV
    df.to_csv(out_path, index=False)
    print(f"Dataset generated successfully at {out_path} with {num_samples} samples.")
    return df

if __name__ == "__main__":
    # Ensure directory exists
    os.makedirs(os.path.dirname(os.path.abspath(__file__)), exist_ok=True)
    generate_synthetic_data()
