from app.ml.simulate_churn_data import generate_churn_data

df = generate_churn_data()
print("Shape:", df.shape)
print("Columns:", list(df.columns))
print("Has churn_risk_flag:", "churn_risk_flag" in df.columns)
if "churn_risk_flag" in df.columns:
    print("Distribution:")
    print(df["churn_risk_flag"].value_counts().sort_index())
    low = df[df["engagement_score"] < 0.3]
    high = df[df["engagement_score"] > 0.8]
    mid = df[(df["engagement_score"] >= 0.3) & (df["engagement_score"] <= 0.8)]
    print("Low eng avg churn:", round(low["churn_risk_flag"].mean(), 2))
    print("High eng avg churn:", round(high["churn_risk_flag"].mean(), 2))
    print("Mid eng avg churn:", round(mid["churn_risk_flag"].mean(), 2))
else:
    print("ERROR: churn_risk_flag column missing!")
    print("Available columns:", list(df.columns))
