from fastapi import APIRouter, Depends, HTTPException, status

from app.auth import create_token, get_current_user
from app.database import verify_password, users_db
from app.model import LoginRequest

router = APIRouter()


@router.post("/login")
def login(body: LoginRequest):
    user = users_db.get(body.username)
    if not user or not verify_password(body.password, user.password):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_token(user.username, user.is_admin)
    return {"access_token": token, "is_admin": user.is_admin}


@router.get("/user/me")
def get_me(user: dict = Depends(get_current_user)):
    return user