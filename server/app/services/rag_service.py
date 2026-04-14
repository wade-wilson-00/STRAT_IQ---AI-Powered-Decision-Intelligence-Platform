import os
import numpy as np
from dotenv import load_dotenv
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from collections import Counter

load_dotenv()

class RAG_Service:
    def __init__(self):
        self.embeddings = GoogleGenerativeAIEmbeddings(model="gemini-embedding-2-preview")

        self.text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=600, 
            chunk_overlap=120
        )

        self.vectorstore = Chroma(
            collection_name="stratiq_knowledge_base",
            embedding_function = self.embeddings,
            persist_directory=os.getenv("CHROMA_PERSIST_DIRECTORY_PATH"),
        )
    
    def load_data(self):
        #Loading Text Documents
        try:
            self.text_loader = DirectoryLoader(
                path=os.getenv("KNOWLEDGE_BASE_PATH"),
                glob="**/*.txt",
                loader_cls=TextLoader
            )
            self.load_txt_data = self.text_loader.load()
            print(f"Loaded Documents:{len(self.load_txt_data)}")

        except Exception as e:
            return f"Error in Loading Text Files {str(e)}"
    
    def chunking_data(self):

        #Verifying Loaded Docs
        if self.load_txt_data:
            print("Data is Loaded")
        else:
            self.load_data()
        
        #Splitting Documents
        self.chunked_docs = self.text_splitter.split_documents(
            self.load_txt_data
        )

        for i, chunk in enumerate(self.chunked_docs):
            source_file = chunk.metadata.get("source","unknown")

            chunk.metadata["chunk_index"] = i
            chunk.metadata["chunk_id"] = f"{source_file} #{i}"
            chunk.metadata["chunk_chars"] = len(chunk.page_content)

        #Basic Counts
        docs_loaded = len(self.load_txt_data)
        chunks_created = len(self.chunked_docs)

        #Character Stats
        lengths = [len(c.page_content) for c in self.chunked_docs]
        avg_chars = sum(lengths) / chunks_created if chunks_created > 0 else 0
        min_chars = min(lengths) if lengths else 0
        max_chars = max(lengths) if lengths else 0

        #Source & Content Integrity
        sources = [c.metadata.get("source") for c in self.chunked_docs]
        unique_sources = set(s for s in sources if s)
        chunks_per_source = Counter(s for s in sources if s).most_common(3)
        missing_source_count = sum(1 for c in self.chunked_docs if "source" not in c.metadata)
        empty_chunks_count = sum(1 for c in self.chunked_docs if not c.page_content.strip())

        #The Print Summary
        print("--- Chunking Summary ---")
        print(f"Docs Loaded: {docs_loaded} | Chunks Created: {chunks_created}")
        print(f"Avg Chars: {avg_chars:.0f} | Min/Max: {min_chars}/{max_chars}")
        print(f"Unique Sources: {len(unique_sources)} | Missing Sources: {missing_source_count}")
        print(f"Empty Chunks: {empty_chunks_count}")
        print(f"Top Sources: {chunks_per_source}")

        if chunks_created > 0:
            print(f"\n--- First Chunk ---\nMeta: {self.chunked_docs[0].metadata}")
            print(f"Text: {self.chunked_docs[0].page_content[:200]}...")
    
            print(f"\n--- Last Chunk ---\nMeta: {self.chunked_docs[-1].metadata}")
            print(f"Text: {self.chunked_docs[-1].page_content[:200]}...") 
        
    def vector_store(self):
        chunk_length = len(self.chunked_docs)

        if chunk_length > 0:
            print("Chunked Data Exists")
        else:
            self.load_data()
            self.chunking_data()
        
        ids = [doc.metadata["chunk_id"] for doc in self.chunked_docs]

        self.stored_docs = self.vectorstore.add_documents(
            documents= self.chunked_docs,
            ids = ids
        )
        
        chunks_to_store = len(self.chunked_docs)
        print("Chunks to Store : ",chunks_to_store)

        unique_ids = len(set(ids))
        print(f"Unique Ids - {unique_ids}")

        stored_count = len(self.stored_docs)
        print(f"Stored Count of Chunks in DB: {stored_count}")
