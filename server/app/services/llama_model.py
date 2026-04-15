import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

class MetaModel:
    def __init__(self):
        self.client = InferenceClient(
            api_key=os.getenv("HUGGING_FACE_API_KEY")
        )
    
    def llm_brain(self, role:str, content:str):
        self.completion =  self.client.chat.completions.create(
            model= os.getenv("META_LLAMA_MODEL"),
            messages=[
                {
                "role": str(role),
                "content":str(content)
                }
            ],
        )

        assistant_text = self.completion.choices[0].message.content
        return assistant_text

if __name__ == "__main__":

    model = MetaModel()
    model.llm_brain(
        role="user", 
        content="Explain me about MRR in SaaS?"
    )