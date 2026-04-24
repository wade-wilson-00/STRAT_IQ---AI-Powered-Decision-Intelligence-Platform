import { createClient } from "./supabase";
export interface ForecastInput {
  mrr: number;
  active_users: number;
  cac: number;
  churn_rate: number;
  marketing_spend: number;
  burn_rate: number;
}

export interface ForecastResult {
  predicted_mrr: number;
  status: string;
  ai_insight: string;
}

export interface ChurnInput {
  engagement_score: number;
  nps_score: number;
  product_adoption_rate: number;
  payment_failures: number;
  support_tickets_last_30d: number;
  customer_age_months: number;
  cac_payback_months:number;
  active_users_ratio:number;
  contract_length_months:number;
  churn_risk_flag:number;
}

export interface ChurnResult {
  churn_prediction: number;
  churn_probability:number;
  status:string;
  ai_insight: string;
}

const API_BASE_URL = process.env.FAST_API_URL || 'http://localhost:8000/api/v1';

export async function getAuthHeaders(){
  const supabase = createClient();
  const {data : {session}} = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User is not Authenticated, Please log in.");
  }

  return {
    "Content-Type":"application/json",
    "Authorization": `Bearer ${session.access_token}`
  };
}

export async function postForecast(input: ForecastInput): Promise<ForecastResult> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_BASE_URL}/predict/revenue`, {
    method: "POST",
    headers,
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Failed to Predict Forecast: ${response.statusText}`);
  }
  return await response.json();
}

export async function postChurn(input: ChurnInput): Promise<ChurnResult> {
  const headers = await getAuthHeaders();

  const response = await fetch(`${API_BASE_URL}/predict/churn`, {
    method: "POST",
    headers,
    body: JSON.stringify(input),
  });

  if (!response.ok) {
    throw new Error(`Failed to Predict Churn: ${response.statusText}`);
  }
  return await response.json();
}
