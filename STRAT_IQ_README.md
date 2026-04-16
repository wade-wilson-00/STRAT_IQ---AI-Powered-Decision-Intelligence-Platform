# 🎯 STRAT_IQ - AI-Powered Decision Intelligence Platform

![Status](https://img.shields.io/badge/Status-In%20Progress%20(70%25)-blue?style=flat-square)
![Python](https://img.shields.io/badge/Python-3.10%2B-blue?style=flat-square&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.104.1-green?style=flat-square)
![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)
![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)

**AI-powered decision intelligence platform for B2B SaaS companies**, with a motive of combining predictive machine learning with large language models to deliver actionable business with LLM and RAG driven insights, revenue forecasting, and customer churn prediction in real-time.

**[GitHub Repository](https://github.com/wade-wilson-00/STRAT_IQ---AI-Powered-Decision-Intelligence-Platform)** | **[Live Demo](#) (Coming Soon)**

---

## 📋 Overview

STRAT_IQ is a full-stack ML + AI platform that helps SaaS founders and CFOs make data-driven decisions. It integrates:

- **Predictive ML Models**: Revenue forecasting and customer churn prediction (75% accuracy)
- **Dual-Intelligence LLM Layer**: Gemini 1.5 Flash for instant prediction analysis + Meta Llama 3.1 with RAG for strategic insights
- **Production-Grade Backend**: FastAPI with JWT/OAuth, multi-tenant architecture
- **Modern Frontend**: Next.js 15 + TypeScript with real-time dashboards
- **Scalable Infrastructure**: Docker, AWS, Supabase

**Use Cases:**
- 📊 Predicts which customers are likely to churn (with explainability)
- 📈 Forecast next quarter's revenue with scenario planning
- 💡 Get AI-powered strategic recommendations grounded in SaaS best practices
- 🔍 Understand which factors drive churn and revenue growth

---

## 🏗️ Project Status

```
Phase 1-3: ML Models & Training           ✅ COMPLETE (50%)
Phase 4:   FastAPI Backend API            ✅ COMPLETE (10%)
Phase 5-6: Dual-Intelligence LLM Layer    ✅ COMPLETE (10%)
Phase 7:   Frontend Integration & Polish  ⏳ NEXT (10%)
Phase 8:   Cloud Deployment - AWS, Docker ⏳ IN PROGRESS (10%)
────────────────────────────────────────────────────────────
TOTAL COMPLETION:                         80% ✅
```

## 🎯 Key Features

### **1. Churn Prediction Engine**
- **Input**: 10 Customer health signals (engagement, NPS, payment failures, etc.)
- **Output**: Churn probability score + risk drivers explanation
- **Accuracy**: 75.5% (validation), 74.9% ROC-AUC
- **Model**: Random Forest (tuned for interpretability)

```json
{
  "churn_probability": 0.82,
  "risk_level": "HIGH",
  "top_drivers": [
    {"factor": "payment_failures", "impact": 0.35},
    {"factor": "low_engagement", "impact": 0.25},
    {"factor": "support_tickets_spike", "impact": 0.20}
  ],
  "ai_insight": "⚠️ Payment failures are critical signal. Immediate action needed."
}
```

### **2. Revenue Forecasting**
- **Method**: Component-based forecasting (new sales, churn, expansion)
- **Horizon**: Upcoming month forward projections
- **Scenarios**: Conservative, Base, Aggressive case planning
- **Inputs**: Current MRR, growth rate, churn, expansion metrics, etc

```json
{
  "predicted_mrr": 150000,
  "arr_projected": 1800000,
  "growth_percentage": 35.5,
  "ai_insight": "Growth trajectory is healthy. Focus expansion efforts..."
}
```

### **3. Dual-Intelligence LLM Layer** 🧠
- **Persona A**: Direct Analyst (Gemini 1.5 Flash)
  - Fast, immediate post-prediction insights
  - 2 to 4 -sentence actionable recommendations
  - Fast response time
  
- **Persona B**: Advisor (Meta Llama 3.1 + RAG Pipeline)
  - Strategic recommendations grounded in SaaS playbooks
  - Knowledge base: Industry benchmarks, retention strategies
  - Interactive chat for flexible questioning

### **4. RAG Knowledge Base**
- SaaS playbooks (churn reduction, revenue expansion)
- Industry benchmarks (healthy metrics by stage)
- Strategic frameworks for business decisions
- Vector DB: ChromaDB (local, fast, zero-config)

---

## 🔧 Tech Stack

### **Backend**
```
FastAPI 0.104.1          - REST API framework (async, high-performance)
Python 3.10+             - Core language
Scikit-learn 1.3         - ML model training & evaluation
Joblib                   - Model serialization
google-generativeai      - Gemini API integration
langchain & chromadb     - RAG orchestration
huggingface-hub          - Llama 3.1 model access
Pydantic 2.5             - Data validation
JWT / OAuth              - Authentication & authorization
```

### **Frontend**
```
Next.js 15               - React framework (SSR, API routes)
TypeScript               - Type safety
Tailwind CSS 4           - Styling
shadcn/ui                - Component library
Zustand                  - State management
TanStack Query v5        - Data fetching & caching
Recharts                 - Data visualization
```

### **Database & Infrastructure**
```
Supabase                 - PostgreSQL + Auth + Real-time
ChromaDB                 - Vector database (RAG)
AWS S3                   - File storage
Docker                   - Containerization
```

### **Deployment**
```
Vercel                   - Frontend hosting
Railway / Render         - Backend hosting
AWS ECR & ECS            - Docker container management
```

---

## 📁 Project Structure

```
STRAT_IQ/
├── client/                     # Next.js 15 Frontend (Dashboard & AI Interface)
│   ├── app/                    # App Router (Pages & Layouts)
│   ├── components/             # Reusable UI components
│   └── public/                 # Static assets & Icons
│
├── server/app/                 # FastAPI Backend (Core Service)
│   ├── main.py                 # Application entry point
│   ├── api/                    # API Endpoints (Controllers)
│   │   ├── auth.py             # JWT & OAuth Authentication
│   │   ├── churn.py            # Churn prediction routes
│   │   ├── revenue.py          # Revenue forecasting routes
│   │   └── rag.py              # Gemini & Llama 3.1 RAG endpoints
│   ├── database/               # Data Access Layer
│   │   ├── crud.py             # SQLAlchemy/Supabase operations
│   │   └── models.py           # Database schemas (PostgreSQL)
│   ├── services/               # Business Logic Layer
│   │   ├── rag_service.py      # LangChain & ChromaDB orchestration
│   │   ├── llm_layer.py        # Gemini 3 Flash & Llama integration
│   │   └── auth_service.py     # Identity management logic
│   └── schemas/                # Pydantic models (Request/Response Validation)
│
├── ml-services/app/            # ML Engineering & Research
│   ├── ml/                     # Training & Simulation scripts
│   │   ├── train_churn.py      # Random Forest training logic
│   │   ├── train_revenue.py    # Revenue forecasting models
│   │   ├── evaluate.py         # Model performance metrics
│   │   └── simulate_data.py    # Synthetic dataset generation
│   ├── models/                 # Serialized Model Artifacts
│   │   ├── Churn_Classifier.pkl
│   │   └── revenue_model_v1.pkl
│   ├── schemas/                # ML-specific data validation
│   └── notebooks/              # Jupyter notebooks for EDA & Prototyping
│
├── knowledge_base/             # Vector Store Context (RAG Documents)
├── documentation/              # Technical specs & System Design
├── data/                       # Local raw/processed data storage
├── requirements.txt            # Python dependencies
└── .env.example                # Template for API keys (Gemini, Supabase, etc.)
```

---

## 🚀 Quick Start

### **Prerequisites**
```bash
# Backend
- Python 3.10+
- pip or poetry

# Frontend
- Node.js 18+
- npm or yarn

# APIs
- Gemini API key (get free at ai.google.dev)
- HuggingFace API token (free at huggingface.co)
```

### **1. Clone Repository**
```bash
git clone https://github.com/wade-wilson-00/STRAT_IQ---AI-Powered-Decision-Intelligence-Platform.git
cd STRAT_IQ
```

### **2. Backend Setup**

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys:
# GEMINI_API_KEY=your_key_here
# HUGGINGFACE_API_KEY=your_token_here

# Run API server
python -m uvicorn app.main:app --reload --port 8000
```

### **3. Frontend Setup**

```bash
cd frontend

# Install dependencies
npm install

# Create .env.local
cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000
EOF

# Run development server
npm run dev
```

**Frontend will be available at:** http://localhost:3000

---

## 📊 API Endpoints

### **Churn Prediction**
```bash
POST /predict/churn
Content-Type: application/json

{
  "engagement_score": 0.65,
  "nps_score": 7,
  "product_adoption_rate": 0.75,
  "payment_failures": 2,
  "support_tickets_last_30d": 3,
  "customer_age_months": 18,
  "cac_payback_months": 8,
  "active_users_ratio": 0.6,
  "contract_length_months": 12,
  "churn_risk_flag": 0
}

Response:
{
  "churn_probability": 0.42,
  "risk_level": "MEDIUM",
  "top_drivers": [...],
  "ai_insight": "..."
}
```

### **Revenue Forecasting**
```bash
POST /predict/revenue
Content-Type: application/json

{
  "current_mrr": 100000,
  "mrr_growth_rate": 0.08,
  "churn_rate": 0.03,
  "expansion_rate": 0.025,
  "months": 6
}

Response:
{
  "predicted_mrr": 135000,
  "arr_projected": 1620000,
  "growth_percentage": 35.0,
  "confidence_level": "HIGH"
}
```

### **AI Analysis**
```bash
POST /ai/analyze/churn
POST /ai/ask
GET  /ai/recommendations
(STILL IN PROGRESS)
```
---

## 🤖 ML Model Details

### **Churn Classifier: Random Forest**

**Why Random Forest?**
- Interpretability (feature importance)
- Fast inference (good for real-time)
- Handles mixed feature types well
- Robustness to outliers

**Features Used:**
| Feature | Type | Range | Interpretation |
|---------|------|-------|-----------------|
| engagement_score | Float | 0-1 | Product activity level |
| nps_score | Integer | 0-10 | Customer satisfaction |
| product_adoption_rate | Float | 0-1 | Feature breadth usage |
| payment_failures | Integer | 0-10 | Billing friction |
| support_tickets_last_30d | Integer | 0-50 | Recent friction signals |
| customer_age_months | Integer | 1-60 | Account tenure |
| cac_payback_months | Float | 3-24 | Customer economics |
| active_users_ratio | Float | 0-1 | Org-wide adoption |
| contract_length_months | Integer | 1-36 | Commitment level |
| churn_risk_flag | Binary | 0-1 | Rules-based signal |

**Performance Metrics:**
```
Accuracy:  75%
Recall:    74.55%
```

**Training Data:**
- 8000 synthetic SaaS customer records
- Balanced class distribution
- Feature engineering: 5 derived features
- Train/test split: 80/20

### **Revenue Forecasting: Component-Based**

**Method:**
```
Projected MRR = Current MRR 
              + New Sales MRR 
              - Churn MRR 
              + Expansion MRR 
              - Contraction MRR
```

**Assumptions Tracked:**
- Monthly new customer acquisition growth
- Churn rate evolution (by cohort)
- Expansion velocity (upsells, seats)
- Seasonal patterns (Q4 boost, Q1 dip)

---

## 🧠 LLM Integration

### **Persona A: Gemini 3 Flash Preview (Direct Analyst)**
- **Purpose**: Instant, lightweight analysis
- **Cost**: Free tier (sub-pennies at scale)
- **Output**: 2-sentence, bulleted insights
- **Failure Mode**: Graceful fallback (prediction still works)

### **Persona B: Llama 3.1 + RAG (Strategic Advisor)**
- **Method**: Retrieval-Augmented Generation
- **Knowledge Base**: ChromaDB with 50+ SaaS playbooks
- **Capabilities**: 
  - Natural language questioning
  - Strategic recommendation generation
  - Context-aware answers grounded in domain knowledge
- **Cost**: Free (HuggingFace Inference API)

---
---
## Currently in Progress...
## 🔐 Security

- **Authentication**: JWT tokens + OAuth 2.0
- **Authorization**: Role-based access control (RBAC)
- **Data Isolation**: Multi-tenant database isolation
- **API Security**: CORS, rate limiting, input validation
- **Secrets Management**: Environment variables + AWS Secrets Manager
- **Data Encryption**: HTTPS in transit, encrypted at rest (Supabase)

---

## 📊 Performance Benchmarks

```
Churn Prediction Latency:   ~150ms (model + LLM)
Revenue Forecast Latency:   ~200ms (component calculation + LLM)
AI Insight Generation:      ~300-500ms (Gemini API)
RAG Query Response:         ~4-5s (vector search + Llama inference)

Throughput (single instance):
- 1,000 predictions/minute
- 100 concurrent requests
- Sub-1s p99 latency under normal load
```

---

## 🐛 Debugging & Development

### **Development Mode**
```bash
# Backend
cd backend && python -m uvicorn app.main:app --reload

# Frontend
cd frontend && npm run dev
```

### **Testing**
```bash
# Run tests
pytest backend/tests/

# Test specific module
pytest backend/tests/services/test_churn_service.py -v
```

### **Logs & Monitoring**
```bash
# Backend logs (FastAPI)
tail -f backend/logs/app.log

# Check model predictions
python -c "from app.services import ChurnPredictionService; ..."
```

---

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** - see [LICENSE](LICENSE) file.

---

## 👤 Author

**Aman Gujamagadi**
- 🔗 [GitHub](https://github.com/wade-wilson-00)
- 💼 [LinkedIn](https://www.linkedin.com/in/aman-gujamagadi-144770318/)
- 📧 [Email](mailto:amxxn10@gmail.com)

---

## 🙏 Acknowledgments

- **Scikit-learn** - ML algorithms & evaluation
- **FastAPI** - Web framework
- **Next.js** - React framework
- **Google Gemini** - LLM API
- **Meta Llama** - Open-source model
- **LangChain** - RAG orchestration
- **ChromaDB** - Vector database

---

## 📞 Support
- **Email**: amxxn10@gmail.com
---

**Last Updated:** April 17, 2026 | **Status:** 80% Complete | **Next Phase:** Frontend Integration, Database and Schema setup, Authentication and Deployment

---

## 🚀 Quick Links

| Link | Description |
|------|-------------|
| [GitHub Repo](https://github.com/wade-wilson-00/STRAT_IQ---AI-Powered-Decision-Intelligence-Platform) | Main repository |
| [API Docs](http://localhost:8000/docs) | Swagger UI (after running backend) |
| [Live Demo](#) | Coming soon |

---

**Made by Aman Gujamagadi**
