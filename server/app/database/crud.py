import logging
from app.database.supabase_client import supabase


async def save_revenue_prediction(user_id, data, predicted_mrr, ai_insight, status):
    try:
        data = {
            **data.model_dump(),
            "user_id": user_id,
            "predicted_mrr": predicted_mrr,
            "ai_insight": ai_insight,
            "status": status
        }
        supabase.table("revenue_predictions").insert(data).execute()
    except Exception as e:
        logging.error("Failed to Save :%s", e)

async def save_churn_prediction(user_id, data, churn_prediction, churn_probability, ai_insight, status):
    try:
        data = {
            **data.model_dump(),
            "user_id": user_id,
            "churn_prediction": churn_prediction,
            "churn_probability": churn_probability,
            "ai_insight": ai_insight,
            "status": status
        }
        supabase.table("churn_predictions").insert(data).execute()
    except Exception as e:
        logging.error("Failed to save Churn Predictions: %s", e)
