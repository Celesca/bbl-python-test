from pydantic import BaseModel


class LoginRequest(BaseModel):
    username: str
    password: str


class BookingRequest(BaseModel):
    time_slot: str


class UserModel(BaseModel):
    username: str
    password: str
    is_admin: bool = False


class BookingModel(BaseModel):
    id: int
    username: str
    time_slot: str
