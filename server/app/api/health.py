import logging
from datetime import datetime, timezone

from fastapi import APIRouter

from app.api.revenue import revenue_model
from app.api.churn import churn_model

logger = logging.getLogger(__name__)

router = APIRouter()


@router.get("/health")
def health_check():
    revenue_ok = revenue_model is not None
    churn_ok = churn_model is not None

    status = "healthy" if (revenue_ok and churn_ok) else "degraded"

    logger.info("Health check: status=%s, revenue=%s, churn=%s", status, revenue_ok, churn_ok)

    return {
        "status": status,
        "timestamp": datetime.now(timezone.utc).isoformat(),
        "models": {
            "revenue": {"loaded": revenue_ok},
            "churn": {"loaded": churn_ok},
        },
    }


@router.get("/models")
def model_info():
    info = {}

    if revenue_model is not None:
        info["revenue"] = {
            "type": type(revenue_model).__name__,
            "loaded": True,
        }
    else:
        info["revenue"] = {"loaded": False}

    if churn_model is not None:
        info["churn"] = {
            "type": type(churn_model).__name__,
            "loaded": True,
        }
    else:
        info["churn"] = {"loaded": False}

    return info
