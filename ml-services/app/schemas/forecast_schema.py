from pydantic import BaseModel

#Request Schema
class Revenue(BaseModel):
    mrr:float
    active_users:int 
    cac:float
    churn_rate:float
    marketing_spend:float
    burn_rate:float

#Response Schema
class Revenue_Response(BaseModel):
    predicted_mrr:float
    status:str