import os
import logging
from google import genai
from dotenv import load_dotenv

logger = logging.getLogger(__name__)

load_dotenv()

class LLM_Analyst:
    def __init__(self):
        self.client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
        self.model = os.getenv("GEMINI_MODEL")
    
    async def get_revenue_insight(self, predicted_mrr:float, status:str):

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
            logger.info("[LLM] Calling Gemini for revenue insight, model=%s", self.model)
            response = await self.client.aio.models.generate_content(
                model=self.model,
                contents=prompt,
            )
            logger.info("[LLM] Revenue insight generated successfully")
            return response.text
        except Exception as e:
            logger.error("[LLM] Revenue insight failed: %s", e, exc_info=True)
            return f"• Unable to generate insight\n• System error: {str(e)[:80]}"
    
    async def get_churn_insight(self, prediction:int, probability:float, status:str):
        
        prompt = f"""You are a concise SaaS retention analyst.
        Analyze the churn result below and return exactly 2 bullet points.
        - Churn_Probability: {probability * 100:.2f}%
        - Churn_Prediction: {prediction}
        - Status: {status}
        Rules:
        - Mention immediate risk level and one tactical retention action per bullet.
        - Keep each bullet under 22 words.
        - Do not add headings, intro text, or extra lines.
        Format exactly:
        • Insight 1
        • Insight 2"""

        try:
            logger.info("[LLM] Calling Gemini for churn insight, model=%s", self.model)
            response = await self.client.aio.models.generate_content(
                model=self.model,
                contents=prompt,
            )
            logger.info("[LLM] Churn insight generated successfully")
            return response.text
        except Exception as e:
            logger.error("[LLM] Churn insight failed: %s", e, exc_info=True)
            return f"• Unable to generate insight\n• System error: {str(e)[:80]}"

