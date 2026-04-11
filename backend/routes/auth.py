from fastapi import APIRouter, HTTPException, status
from pydantic import BaseModel

from auth import create_token
from database import pwd_context, users_db

router = APIRouter()


class LoginRequest(BaseModel):
    username: str
    password: str


@router.post("/login")
def login(body: LoginRequest):
    user = users_db.get(body.username)
    if not user or not pwd_context.verify(body.password, user["password"]):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")

    token = create_token(user["username"], user["is_admin"])
    return {"access_token": token, "is_admin": user["is_admin"]}
