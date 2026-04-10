from pydantic import BaseModel, Field

class ChurnClassifier(BaseModel):
    engagement_score: float = Field(..., ge=0, le=1)
    nps_score: int = Field(..., ge=0, le=10)
    product_adoption_rate: float = Field(..., ge=0, le=1)
    payment_failures: int = Field(..., ge=0, le=10)
    support_tickets_last_30d: int = Field(..., ge=0, le=50)
    customer_age_months: int = Field(..., ge=1)
    cac_payback_months: float = Field(..., ge=0)
    active_users_ratio: float = Field(..., ge=0, le=1)
    contract_length_months: int = Field(..., ge=1, le=60)
    churn_risk_flag: int = Field(..., ge=0, le=1)

    model_config = {
        "json_schema_extra": {
            "example": {
                "engagement_score": 0.85,
                "nps_score": 8,
                "product_adoption_rate": 0.6,
                "payment_failures": 0,
                "support_tickets_last_30d": 2,
                "customer_age_months": 12,
                "cac_payback_months": 6.5,
                "active_users_ratio": 0.9,
                "contract_length_months": 12,
                "churn_risk_flag": 0
            }
        }
    }

class ChurnResponse(BaseModel):
    churn_prediction: int
    churn_probability: float = Field(..., description="Churn probability in percentage (0-100)")
    status: str
    ai_insight:str
