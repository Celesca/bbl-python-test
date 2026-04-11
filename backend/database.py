from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])

# in-memory user store (pre-seeded)
users_db = {
    "admin": {
        "username": "admin",
        "password": pwd_context.hash("admin123"),
        "is_admin": True,
    },
    "user1": {
        "username": "user1",
        "password": pwd_context.hash("password1"),
        "is_admin": False,
    },
    "user2": {
        "username": "user2",
        "password": pwd_context.hash("password2"),
        "is_admin": False,
    },
}

# in-memory bookings store: list of dicts
bookings_db = []
