import logging
import uuid
from app.database.supabase_client import supabase


async def save_revenue_prediction(user_id, data, predicted_mrr, ai_insight, status):
    try:
        row = {
            **data.model_dump(),
            "id": str(uuid.uuid4()),
            "user_id": user_id,
            "predicted_mrr": predicted_mrr,
            "ai_insight": ai_insight,
            "status": status
        }
        supabase.table("revenue_predictions").insert(row).execute()
    except Exception as e:
        logging.error("Failed to save revenue prediction: %s", e)

async def save_churn_prediction(user_id, data, churn_prediction, churn_probability, ai_insight, status):
    try:
        dumped = data.model_dump()
        row = {
            **dumped,
            "id": str(uuid.uuid4()),
            # Scale 0-1 float fields back to integer for the smallint DB columns
            "engagement_score": int(dumped.get("engagement_score", 0) * 100),
            "product_adoption_rate": int(dumped.get("product_adoption_rate", 0) * 100),
            "active_users_ratio": int(dumped.get("active_users_ratio", 0) * 100),
            "user_id": user_id,
            "churn_prediction": churn_prediction,
            "churn_probability": churn_probability,
            "ai_insight": ai_insight,
            "status": status
        }
        supabase.table("churn_predictions").insert(row).execute()
    except Exception as e:
        logging.error("Failed to save churn prediction: %s", e)

