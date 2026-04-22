import os
import sys
import logging
import joblib
import pandas as pd
import asyncio
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException
from app.services.llm_layer import LLM_Analyst
from app.api.auth import token_dependency
from app.schemas.churn_schema import ChurnClassifier, ChurnResponse
from app.database.crud import save_churn_prediction

load_dotenv()

PROJECT_ROOT = os.getenv("PROJECT_ROOT", ".")
sys.path.append(os.path.join(PROJECT_ROOT, os.getenv("ML_MODULES_PATH", "")))

logger = logging.getLogger(__name__)
churn_model = None

llm_analyst = LLM_Analyst()

try:
    model_path = os.path.join(PROJECT_ROOT, os.getenv("CHURN_MODEL_PATH", ""))
    churn_model = joblib.load(model_path)
    logger.info("Churn model loaded successfully from %s", model_path)
except Exception as e:
    logger.error("Failed to load churn model: %s", e)

router = APIRouter()

@router.post("/predict/churn", response_model=ChurnResponse)
async def predict_churn(data: ChurnClassifier, user_id: token_dependency):
    if churn_model is None:
        logger.error("Churn prediction requested but model is not loaded")
        raise HTTPException(
            status_code=503,
            detail="Churn model is currently unavailable. Please try again later.",
        )

    try:
        df = pd.DataFrame([data.model_dump()])

        churn_prediction = await asyncio.to_thread(churn_model.predict, df)
        churn_probability = await asyncio.to_thread(churn_model.predict_proba, df)

        prediction = int(churn_prediction[0])
        probability = float(churn_probability[0][1])
        status = "Success"
        
        try:
            ai_insight = await llm_analyst.get_churn_insight(
                prediction, probability, status
            )
        except Exception as e:
            ai_insight = f"Model Unavailable {str(e)}"
            

        logger.info(
            "Churn prediction successful: prediction=%d, probability=%.4f",
            prediction, probability,
        )
        await save_churn_prediction(
            user_id, data, churn_prediction, churn_probability, status
        )
        return ChurnResponse(
            churn_prediction=prediction,
            churn_probability=round(probability * 100, 2),
            status="Success",
            ai_insight=ai_insight
        )

    except Exception as e:
        logger.error("Churn prediction failed: %s", e, exc_info=True)
        raise HTTPException(
            status_code=500,
            detail=f"Prediction failed: {str(e)}",
        )