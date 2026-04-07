from pydantic import BaseModel

class ChurnClassifier(BaseModel):
    engagement_score:float
    nps_score:int
    product_adoption_rate:float
    payment_failures:int
    support_tickets_last_30d:int
    customer_age_months:int
    cac_payback_months:float
    active_users_ratio:float
    contract_length_months:int
    churn_risk_flag:int

class ChurnResponse(BaseModel):
    churn_prediction:int
    churn_probability:float
    status:str
    
