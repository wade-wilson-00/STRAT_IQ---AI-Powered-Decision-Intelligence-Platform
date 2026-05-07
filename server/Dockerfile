FROM python:3.11-slim

WORKDIR /app

# Copy and install dependencies (with retry/timeout for network stability)
COPY requirements.txt .
RUN pip install --no-cache-dir --retries 5 --timeout 120 -r requirements.txt

# Copy server source code
COPY server/app ./app

# Copy ML model files and modules (server loads these directly at startup)
COPY ml-services/app/models ./ml-services/app/models
COPY ml-services/app/ml ./ml-services/app/ml

# Set PROJECT_ROOT so model paths resolve correctly inside the Linux container
ENV PROJECT_ROOT=/app

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
