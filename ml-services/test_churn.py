from app.ml.simulate_churn_data import generate_churn_data
import pandas as pd

df = generate_churn_data()
print("Dataset Shape:", df.shape)
print("Churn Rate:", f"{df['churn'].mean():.2%}")

print("\n--- Churn by Engagement Score ---")
low_eng = df[df["engagement_score"] < 0.3]["churn"].mean()
high_eng = df[df["engagement_score"] > 0.7]["churn"].mean()
print(f"Low Engagement Churn Rate: {low_eng:.2%}")
print(f"High Engagement Churn Rate: {high_eng:.2%}")

print("\n--- Churn by NPS Category ---")
detractors = df[df["nps_score"] <= 6]["churn"].mean()
passives = df[(df["nps_score"] > 6) & (df["nps_score"] < 9)]["churn"].mean()
promoters = df[df["nps_score"] >= 9]["churn"].mean()
print(f"Detractors (0-6) Churn Rate: {detractors:.2%}")
print(f"Passives (7-8) Churn Rate: {passives:.2%}")
print(f"Promoters (9-10) Churn Rate: {promoters:.2%}")

print("\n--- Interaction Effect ---")
bad_combo = df[(df["nps_score"] <= 6) & (df["engagement_score"] < 0.3)]["churn"].mean()
print(f"Low NPS + Low Engagement Churn Rate: {bad_combo:.2%}")
