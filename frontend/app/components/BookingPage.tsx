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
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Bookings {isAdmin && "(Admin View)"}</h2>

      <form onSubmit={handleCreate} className="mb-8 flex gap-2">
        <input
          placeholder="e.g. 10am-11am"
          value={timeSlot}
          onChange={(e) => setTimeSlot(e.target.value)}
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
          Book
        </button>
      </form>

      <div className="overflow-x-auto shadow-md rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">ID</th>
              {isAdmin && <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">User</th>}
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Time Slot</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-900">{b.id}</td>
                {isAdmin && <td className="px-6 py-4 text-sm text-gray-900">{b.username}</td>}
                <td className="px-6 py-4 text-sm text-gray-900">
                  {editId === b.id ? (
                    <input 
                      value={editSlot} 
                      onChange={(e) => setEditSlot(e.target.value)}
                      className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  ) : (
                    b.time_slot
                  )}
                </td>
                <td className="px-6 py-4 text-sm flex gap-2">
                  {editId === b.id ? (
                    <>
                      <button onClick={() => handleUpdate(b.id)} className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs font-medium">
                        Save
                      </button>
                      <button onClick={() => setEditId(null)} className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500 text-xs font-medium">
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => { setEditId(b.id); setEditSlot(b.time_slot); }} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs font-medium">
                        Edit
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs font-medium">
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {bookings.length === 0 && <p className="text-center text-gray-500 py-8">No bookings yet.</p>}
    </div>
  );
}
