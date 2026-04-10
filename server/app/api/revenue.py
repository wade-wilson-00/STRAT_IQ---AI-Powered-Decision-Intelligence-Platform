import os
import sys
import logging
import joblib
import pandas as pd
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from app.services.llm_layer import LLM_Analyst 
from app.schemas.forecast_schema import Revenue, Revenue_Response

load_dotenv()

PROJECT_ROOT = os.getenv("PROJECT_ROOT", ".")
sys.path.append(os.path.join(PROJECT_ROOT, os.getenv("ML_MODULES_PATH", "")))

logger = logging.getLogger(__name__)
revenue_model = None
llm_analyst = LLM_Analyst()

try:
    model_path = os.path.join(PROJECT_ROOT, os.getenv("REVENUE_MODEL_PATH", ""))
    revenue_model = joblib.load(model_path)
    logger.info("Revenue model loaded successfully from %s", model_path)
except Exception as e:
    logger.error("Failed to load revenue model: %s", e)

router = APIRouter()

@router.post("/predict/revenue", response_model=Revenue_Response)
def predict_revenue(data: Revenue):
    if revenue_model is None:
        logger.error("Revenue prediction requested but model is not loaded")
        raise HTTPException(
            status_code=503,
            detail="Revenue model is currently unavailable. Please try again later.",
        )

    try:
        df = pd.DataFrame([data.model_dump()])
        prediction = revenue_model.predict(df)
        predicted_mrr = float(prediction[0])
        status = "Success"

        try:
            ai_insight = llm_analyst.get_revenue_insight(
                predicted_mrr, status
            )
        except Exception as e:
            ai_insight = f"Model Unavailable {str(e)}"

        logger.info("Revenue prediction successful: %.2f", predicted_mrr)
        return Revenue_Response(
            predicted_mrr=predicted_mrr,
            status=status,
            ai_insight=ai_insight,
        )

    except Exception as e:
        logger.error("Revenue prediction failed: %s", e, exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}",
        )
