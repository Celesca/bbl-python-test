from fastapi import APIRouter, Depends, HTTPException, status

from app.auth import get_current_user
from app.database import bookings_db
from app.model import BookingModel, BookingRequest

router = APIRouter()

# Create bookings
@router.post("/bookings")
def create_booking(body: BookingRequest, user: dict = Depends(get_current_user)):
    booking = BookingModel(
        id=len(bookings_db) + 1,
        username=user["username"],
        time_slot=body.time_slot,
    )
    bookings_db.append(booking)
    return booking

# get list for all (if admin)
@router.get("/bookings")
def get_bookings(user: dict = Depends(get_current_user)):
    if user["is_admin"]:
        return bookings_db
    return [b for b in bookings_db if b.username == user["username"]]


@router.put("/bookings/{booking_id}")
def update_booking(booking_id: int, body: BookingRequest, user: dict = Depends(get_current_user)):
    for b in bookings_db:
        if b.id == booking_id:
            if not user["is_admin"] and b.username != user["username"]:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")
            b.time_slot = body.time_slot
            return b
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")


@router.delete("/bookings/{booking_id}")
def delete_booking(booking_id: int, user: dict = Depends(get_current_user)):
    for i, b in enumerate(bookings_db):
        if b.id == booking_id:
            if not user["is_admin"] and b.username != user["username"]:
                raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not allowed")
            bookings_db.pop(i)
            return {"detail": "Deleted"}
    raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Booking not found")
