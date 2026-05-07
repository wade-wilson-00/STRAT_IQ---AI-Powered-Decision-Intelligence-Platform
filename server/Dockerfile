FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY server/app ./app
COPY ml-services/app/models ./ml-services/app/models
COPY ml-services/app/ml ./ml-services/app/ml
COPY knowledge_base ./knowledge_base

ENV PROJECT_ROOT=/app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
