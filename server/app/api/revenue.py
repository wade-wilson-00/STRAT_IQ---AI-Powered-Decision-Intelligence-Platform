import joblib
from fastapi import APIRouter
import pandas as pd
import os
import sys
from app.schemas.forecast_schema import Revenue, Revenue_Response

router = APIRouter()

sys.path.append(r"c:\stratiq\ml-services\app\ml")

try:
    revenue_model = joblib.load(r"c:\stratiq\ml-services\app\models\revenue_model_v1.pkl")
    print("Model Loaded Successfully")
except Exception as e:
    print(f"Model Not loaded: {e}")
    revenue_model = None

@router.post("/predict/revenue",response_model=Revenue_Response)
def predict_revenue(data: Revenue):
    df = pd.DataFrame([data.model_dump()])
    prediction = revenue_model.predict(df)
    predicted_mrr = prediction[0]
    return Revenue_Response(
        predicted_mrr = predicted_mrr,
        status="Success"
    )

