import logging
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

load_dotenv()

import os

from app.api import revenue, churn, health, rag

logging.basicConfig(
    level=logging.INFO,
    format="[%(asctime)s] [%(levelname)s] [%(name)s] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    logger.info("STRAT_IQ API starting up...")
    logger.info("PROJECT_ROOT = %s", os.getenv("PROJECT_ROOT", "."))
    logger.info("FRONTEND_ORIGIN = %s", os.getenv("FRONTEND_ORIGIN", "*"))
    yield
    logger.info("STRAT_IQ API shutting down...")


app = FastAPI(
    title="STRAT_IQ",
    description="AI-Powered Decision Intelligence Platform — Revenue Forecasting & Churn Prediction",
    version="0.1.0",
    lifespan=lifespan,
)

frontend_origin = os.getenv("FRONTEND_ORIGIN", "http://localhost:3001")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_origin],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error("Unhandled exception at %s: %s", request.url.path, exc, exc_info=True)
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred."},
    )

app.include_router(health.router, prefix="/api/v1")
app.include_router(revenue.router, prefix="/api/v1")
app.include_router(churn.router, prefix="/api/v1")
app.include_router(rag.router, prefix="/api/v1")

