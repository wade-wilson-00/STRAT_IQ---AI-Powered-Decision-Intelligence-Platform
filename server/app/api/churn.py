import os
import sys
import logging

import joblib
import pandas as pd
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException

from app.schemas.churn_schema import ChurnClassifier, ChurnResponse

load_dotenv()

PROJECT_ROOT = os.getenv("PROJECT_ROOT", ".")
sys.path.append(os.path.join(PROJECT_ROOT, os.getenv("ML_MODULES_PATH", "")))

logger = logging.getLogger(__name__)
 
churn_model = None

try:
    model_path = os.path.join(PROJECT_ROOT, os.getenv("CHURN_MODEL_PATH", ""))
    churn_model = joblib.load(model_path)
    logger.info("Churn model loaded successfully from %s", model_path)
except Exception as e:
    logger.error("Failed to load churn model: %s", e)

router = APIRouter()

@router.post("/predict/churn", response_model=ChurnResponse)
def predict_churn(data: ChurnClassifier):
    if churn_model is None:
        logger.error("Churn prediction requested but model is not loaded")
        raise HTTPException(
            status_code=503,
            detail="Churn model is currently unavailable. Please try again later.",
        )

    try:
        df = pd.DataFrame([data.model_dump()])

        churn_prediction = churn_model.predict(df)
        churn_probability = churn_model.predict_proba(df)

        prediction = int(churn_prediction[0])
        probability = float(churn_probability[0][1])

        logger.info(
            "Churn prediction successful: prediction=%d, probability=%.4f",
            prediction, probability,
        )
        return ChurnResponse(
            churn_prediction=prediction,
            churn_probability=probability,
            status="Success",
        )

    except Exception as e:
        logger.error("Churn prediction failed: %s", e, exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}",
        )