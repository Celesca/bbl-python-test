import hashlib


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def verify_password(password: str, hashed: str) -> bool:
    return hash_password(password) == hashed


from app.model import UserModel, BookingModel

users_db: dict[str, UserModel] = {
    "admin": UserModel(username="admin", password=hash_password("admin123"), is_admin=True),
    "user1": UserModel(username="user1", password=hash_password("password1"), is_admin=False),
    "user2": UserModel(username="user2", password=hash_password("password2"), is_admin=False),
}

bookings_db: list[BookingModel] = []
