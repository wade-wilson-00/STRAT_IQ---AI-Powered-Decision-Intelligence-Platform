import os
from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
from app.api.auth import token_dependency
from app.services.rag_service import RAG_Service
from app.schemas.chat_request import ChatRequest

router = APIRouter()
rag_service = RAG_Service()

@router.post("/chat_stream")
async def chat_stream(request: ChatRequest, user_id: token_dependency):
    try:
        return StreamingResponse(
            rag_service.generate_answer(request.query),
            media_type="text/event-stream"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Chat stream generation failed: {str(e)}"
        )
