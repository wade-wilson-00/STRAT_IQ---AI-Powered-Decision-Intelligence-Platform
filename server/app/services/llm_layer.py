import os
from google import genai
from dotenv import load_dotenv

load_dotenv()

class LLM_Analyst:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = os.getenv("GEMINI_MODEL")
    
    def get_revenue_insight(self, predicted_mrr:float, status:str):

        prompt =  f"""You are a concise SaaS data analyst.
        Analyze the forecast below and return exactly 2 bullet points.
        - Predicted_MRR: {predicted_mrr:,.0f}
        - Status: {status}
        Rules:
        - Each bullet must include one clear risk or opportunity and one practical next action.
        - Keep each bullet under 22 words.
        - Do not add headings, intro text, or extra lines.
        Format exactly:
        • Insight 1
        • Insight 2"""

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
            )
            return response.text
        except Exception as e:
            return f"• Unable to generate insight\n• System error: {str(e)[:50]}"
    
    def get_churn_insight(self, churn_prediction:int, churn_probability:float, status:str):
        
        prompt = f"""You are a concise SaaS retention analyst.
        Analyze the churn result below and return exactly 2 bullet points.
        - Churn_Probability: {churn_probability * 100:.2f}%
        - Churn_Prediction: {churn_prediction}
        - Status: {status}
        Rules:
        - Mention immediate risk level and one tactical retention action per bullet.
        - Keep each bullet under 22 words.
        - Do not add headings, intro text, or extra lines.
        Format exactly:
        • Insight 1
        • Insight 2"""

        try:
            response = self.client.models.generate_content(
                model=self.model,
                contents=prompt,
            )
            return response.text
        except Exception as e:
            return f"• Unable to generate insight\n• System error: {str(e)[:50]}"

