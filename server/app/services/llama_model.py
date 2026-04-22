import os
from dotenv import load_dotenv
from huggingface_hub import AsyncInferenceClient

load_dotenv()

class MetaModel:
    def __init__(self):
        self.client = AsyncInferenceClient(
            api_key=os.getenv("HUGGING_FACE_API_KEY")
        )
    
    async def llm_brain(self, role:str, content:str):
        stream = await self.client.chat.completions.create(
            model=os.getenv("META_LLAMA_MODEL"),
            messages = [
                {
                "role": str(role),
                "content":str(content)
                }
            ],
            max_tokens=250,
            stream=True
        )
        async for chunk in stream:
            token = chunk.choices[0].delta.content
            if token:
                yield token

if __name__ == "__main__":

    model = MetaModel()
    model.llm_brain(
        role="user", 
        content="Explain me about MRR in SaaS?"
    )