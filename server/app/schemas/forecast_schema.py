from pydantic import BaseModel, Field

# Request Schema
class Revenue(BaseModel):
    mrr: float = Field(..., gt=0, description="Monthly Recurring Revenue must be positive")
    active_users: int = Field(..., ge=0)
    cac: float = Field(..., ge=0, description="Customer Acquisition Cost")
    churn_rate: float = Field(..., ge=0, le=1, description="Churn rate as a decimal between 0 and 1")
    marketing_spend: float = Field(..., ge=0)
    burn_rate: float = Field(..., ge=0)

    model_config = {
        "json_schema_extra": {
            "example": {
                "mrr": 50000.0,
                "active_users": 1200,
                "cac": 150.0,
                "churn_rate": 0.05,
                "marketing_spend": 10000.0,
                "burn_rate": 25000.0
            }
        }
    }

# Response Schema
class Revenue_Response(BaseModel):
    predicted_mrr: float
    status: str
