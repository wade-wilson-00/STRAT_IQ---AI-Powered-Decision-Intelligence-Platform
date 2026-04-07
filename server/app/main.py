from fastapi import FastAPI
from app.api import revenue
from app.api import churn

app = FastAPI()
app.include_router(
    revenue.router, prefix="/api/v1"
)

app.include_router(
    churn.router, prefix="/api/v1"
)
