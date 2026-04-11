"use client";

import { useState } from "react";
import LoginPage from "./components/LoginPage";
import BookingPage from "./components/BookingPage";

export default function Home() {
  const [token, setToken] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = (t: string, admin: boolean) => {
    setToken(t);
    setIsAdmin(admin);
  };

  const handleLogout = () => {
    setToken(null);
    setIsAdmin(false);
  };

  return (
    <div>
      <nav>
        <span><b>BBL Booking</b></span>
        {token && <button onClick={handleLogout}>Logout</button>}
      </nav>
      <hr />
      {token ? (
        <BookingPage token={token} isAdmin={isAdmin} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </div>
  );
}
