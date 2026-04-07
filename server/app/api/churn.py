from app.schemas.churn_schema import ChurnClassifier, ChurnResponse
import os
import joblib
import pandas as pd
from fastapi import APIRouter

router = APIRouter()

import sys
sys.path.append(r"c:\stratiq\ml-services\app\ml")

try:
    churn_model = joblib.load(r"C:\stratiq\ml-services\app\models\Churn_Classifier.pkl")
    print("Model loaded Successfully")

except Exception as e:
    print(f"Model Not Loaded: {e}")
    churn_model = None

@router.post("/predict/churn", response_model=ChurnResponse)
def predict_churn(data: ChurnClassifier):
    df = pd.DataFrame([data.model_dump()])

    churn_prediction = churn_model.predict(df)
    churn_probability = churn_model.predict_proba(df)
    
    prediction = churn_prediction[0]
    probability = churn_probability[0][1]

    return ChurnResponse(
        churn_prediction=prediction,
        churn_probability=probability,
        status="Success"
    )