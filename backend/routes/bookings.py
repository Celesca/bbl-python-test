from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel

from auth import get_current_user
from database import bookings_db

router = APIRouter()


class BookingRequest(BaseModel):
    time_slot: str


@router.post("/bookings")
def create_booking(body: BookingRequest, user: dict = Depends(get_current_user)):
    booking = {
        "id": len(bookings_db) + 1,
        "username": user["username"],
        "time_slot": body.time_slot,
    }
    bookings_db.append(booking)
    return booking


@router.get("/bookings")
def get_bookings(user: dict = Depends(get_current_user)):
    if user["is_admin"]:
        return bookings_db
    return [b for b in bookings_db if b["username"] == user["username"]]


@router.delete("/bookings/{booking_id}")
def delete_booking(booking_id: int, user: dict = Depends(get_current_user)):
    for i, b in enumerate(bookings_db):
        if b["id"] == booking_id:
            if not user["is_admin"] and b["username"] != user["username"]:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")
            bookings_db.pop(i)
            return {"detail": "Deleted"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
