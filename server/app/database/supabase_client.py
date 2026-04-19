from supabase import create_client
from dotenv import load_env
import os

load_env()

url = os.getenv("SUPABASE_URL")
service_key = os.getenv("SUPABASE_SERVICE_ROLE_KEY")

supabase = create_client(url, service_key)