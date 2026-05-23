import os
import pandas as pd
from model import EngineAI
from data_gen import generate_synthetic_data

BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
DATA_PATH = os.path.join(BASE_DIR, "student_data.csv")

if not os.path.exists(DATA_PATH):
    print("Generating synthetic data for models...")
    df = generate_synthetic_data(num_samples=500, out_path=DATA_PATH)
else:
    print("Loading synthetic data...")
    df = pd.read_csv(DATA_PATH)

ml_model = EngineAI()
ml_model.fit(df)

global_df = df
