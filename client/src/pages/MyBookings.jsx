import { useEffect, useState } from "react";
import axios from "axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/bookings/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Bookings API response:", res.data);
        setBookings(res.data);
      })
      .catch((err) => {
        console.error("Bookings API error:", err.response?.data || err.message);
      });
  }, [token]);
  

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>

      {bookings.length === 0 ? (
        <div className="text-center text-gray-500 py-20">
          No bookings found 🎬
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {bookings.map((b) => (
            <div
              key={b._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 space-y-4"
            >
              {/* Header */}
              <div className="flex justify-between items-start">
                <h2 className="text-xl font-bold text-black">
                  Booking #{b._id.slice(-6).toUpperCase()}
                </h2>

                <span
                  className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    b.paymentStatus === "paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  {b.paymentStatus === "paid" ? "Confirmed" : "Pending"}
                </span>
              </div>

              {/* Details */}
              <div className="text-gray-600 space-y-1">
                <p>🎥 {b.theater.name}</p>
                <p>📍 {b.theater.location}</p>
                <p>📅 {b.show.date}</p>
                <p>⏰ {b.show.time}</p>
                <p>💺 Seats: {b.seats.join(", ")}</p>
                <p className="font-semibold text-black">
                  💰 ₹{b.totalAmount}
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-3">
                <button className="flex-1 bg-yellow-400 text-black py-2 rounded-lg font-semibold hover:bg-yellow-500">
                  View Ticket
                </button>

                <button className="flex-1 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 text-red-500">
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyBookings;
