from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer

from app.database import users_db

# https://fastapi.tiangolo.com/tutorial/security/get-current-user/

# ใช้คอนเซ้ปต์ Depends เพื่อดึงข้อมูลผู้ใช้จาก token ใน header ของ request
# https://fastapi.tiangolo.com/how-to/authentication-error-status-code/?h=httpauthorizationcredentials

SECRET_KEY = "super-secret-key"
ALGORITHM = "HS256"

security = HTTPBearer()


def create_token(username: str, is_admin: bool) -> str:
    payload = {
        "sub": username,
        "is_admin": is_admin,
        "exp": datetime.now(timezone.utc) + timedelta(hours=1),
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
    except jwt.PyJWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token")

    username = payload.get("sub")
    if username not in users_db:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return {"username": username, "is_admin": payload.get("is_admin", False)}
