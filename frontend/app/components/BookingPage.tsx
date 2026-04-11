"use client";

import { useEffect, useState } from "react";
import { getBookings, createBooking, updateBooking, deleteBooking } from "../api";

interface Booking {
  id: number;
  username: string;
  time_slot: string;
}

interface Props {
  token: string;
  isAdmin: boolean;
}

export default function BookingPage({ token, isAdmin }: Props) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [timeSlot, setTimeSlot] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [editSlot, setEditSlot] = useState("");

  const loadBookings = async () => {
    const data = await getBookings(token);
    setBookings(data);
  };

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings(token);
      setBookings(data);
    };
    fetchBookings();
  }, [token]);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!timeSlot) return;
    await createBooking(token, timeSlot);
    setTimeSlot("");
    loadBookings();
  };

  const handleUpdate = async (id: number) => {
    if (!editSlot) return;
    await updateBooking(token, id, editSlot);
    setEditId(null);
    setEditSlot("");
    loadBookings();
  };

  const handleDelete = async (id: number) => {
    await deleteBooking(token, id);
    loadBookings();
  };

  return (
    <div>
      <h2>Bookings {isAdmin && "(Admin View)"}</h2>

      <form onSubmit={handleCreate}>
        <input
          placeholder="e.g. 10am-11am"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
        />
        <button type="submit">Book</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            {isAdmin && <th>User</th>}
            <th>Time Slot</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((b) => (
            <tr key={b.id}>
              <td>{b.id}</td>
              {isAdmin && <td>{b.username}</td>}
              <td>
                {editId === b.id ? (
                  <input value={editSlot} onChange={(e) => setEditSlot(e.target.value)} />
                ) : (
                  b.time_slot
                )}
              </td>
              <td>
                {editId === b.id ? (
                  <>
                    <button onClick={() => handleUpdate(b.id)}>Save</button>
                    <button onClick={() => setEditId(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => { setEditId(b.id); setEditSlot(b.time_slot); }}>Edit</button>
                    <button onClick={() => handleDelete(b.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {bookings.length === 0 && <p>No bookings yet.</p>}
    </div>
  );
}
