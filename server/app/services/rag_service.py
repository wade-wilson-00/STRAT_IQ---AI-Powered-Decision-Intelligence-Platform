import os
import numpy as np
import pandas as pd
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma

load_dotenv()

class RAG_Service:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=100, 
            chunk_overlap=0
        )

        self.vectorstore = Chroma(
            collection_name="example_collection",
            embedding_function = self.embeddings,
            persist_directory=".knowledge_base/chroma_langchain_db",
        )
    
    def load_data(self):

        self.text_loader = TextLoader(
            file_path ="./knowledge_base",
            encoding ="utf-8"
        )

        
