from fastapi import HTTPException, status
from app.database.supabase_client import supabase

async def get_current_user(token: str) -> str:

    if token is None:
            raise HTTPException(
                status_code=403,
                detail="User Not Authenticated"
            )
    try:
        response = supabase.auth.get_user(token)
        return response.user.id

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid or Expired Token"
        )