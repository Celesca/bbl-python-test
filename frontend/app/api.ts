import axios from "axios";

// Use axios for API calls easily

const api = axios.create({
  baseURL: "http://localhost:8000",
});

export async function login(username: string, password: string) {
  const res = await api.post("/login", { username, password });
  return res.data;
}

export async function getMe(token: string) {
  const res = await api.get("/user/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function getBookings(token: string) {
  const res = await api.get("/bookings", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function createBooking(token: string, timeSlot: string) {
  const res = await api.post("/bookings", { time_slot: timeSlot }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function updateBooking(token: string, id: number, timeSlot: string) {
  const res = await api.put(`/bookings/${id}`, { time_slot: timeSlot }, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}

export async function deleteBooking(token: string, id: number) {
  const res = await api.delete(`/bookings/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
}
