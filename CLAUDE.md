# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

STRAT_IQ is a SaaS analytics platform with revenue forecasting, churn prediction, and AI advisory features.

## Architecture

- **Frontend**: `client/react/` - React 19 + Vite + Tailwind CSS + Recharts
- **ML Services**: `ml-services/app/` - Python scikit-learn pipelines for revenue forecasting and churn prediction
- **Backend**: `server/` - Node.js/Express (placeholder structure)
- **Data**: `data/` - CSV datasets (startup_metrics, churn_dataset)
- **Notebooks**: `notebooks/` - EDA and model development notebooks

## Commands

### Frontend (client/react/)
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint check
npm run preview  # Preview build
```

### ML Services (ml-services/)
```bash
# Run churn data generation
python test_churn.py

# Train revenue model (from ml-services/app/ml/)
python train_revenue.py

# Train churn model (from ml-services/app/ml/)
python train_churn.py
```

## Code Organization

### Frontend Services (`client/react/src/services/api.js`)
- Axios client with auth interceptors
- Mock implementations for forecast, churn, simulation endpoints
- Ready for backend integration via env vars (`VITE_API_BASE_URL`)

### ML Pipelines
- **Revenue**: `feature_engineering.py` + `train_revenue.py` - LinearRegression with MRR lag features
- **Churn**: `churn_feature_engineering.py` + `train_churn.py` - Classification model
- **Simulation**: `simulate_dataset.py` - Scenario modeling

### API Schemas (`ml-services/app/schemas/`)
- `forecast_schema.py` - MRR predictions, growth metrics
- `churn_schema.py` - Churn probability, risk levels

## Environment

Frontend uses `.env.local` (copy from `.env.example`) for API configuration:
- `VITE_API_BASE_URL`
- `VITE_RAG_API_URL`, `VITE_STRATEGY_API_URL`, `VITE_ADVISOR_API_URL` (optional)
