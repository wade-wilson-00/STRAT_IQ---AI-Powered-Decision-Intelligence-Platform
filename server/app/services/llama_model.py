import os
from dotenv import load_dotenv
from huggingface_hub import InferenceClient

load_dotenv()

client = InferenceClient(
    api_key=os.getenv("HUGGING_FACE_API_KEY"),
)

completion = client.chat.completions.create(
    model= os.getenv("META_LLAMA_MODEL"),
    messages=[
        {
            "role": "user",
            "content": "Tell about yourself?"
        }
    ],
)

print(client.chat_completion([0].message))