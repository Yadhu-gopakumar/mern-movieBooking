import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SeatSelection = () => {
  const { showId } = useParams();
  const navigate = useNavigate();

  const [seatMap, setSeatMap] = useState({});
  const [selectedSeats, setSelectedSeats] = useState([]);
  const token = localStorage.getItem("token");

  /* ================= FETCH SEATS ================= */
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/shows/${showId}/seats`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const grouped = {};
        res.data.forEach((seat) => {
          const row = seat.seatNumber[0]; // A1 → A
          if (!grouped[row]) grouped[row] = [];
          grouped[row].push(seat);
        });
        setSeatMap(grouped);
      })
      .catch((err) => console.error(err));
  }, [showId, token]);

  /* ================= TOGGLE SEAT ================= */
  const toggleSeat = (seat) => {
    if (seat.isBooked || seat.isLocked) return;

    setSelectedSeats((prev) =>
      prev.includes(seat.seatNumber)
        ? prev.filter((s) => s !== seat.seatNumber)
        : [...prev, seat.seatNumber]
    );
  };

  /* ================= TOTAL PRICE ================= */
  const totalPrice = Object.values(seatMap)
    .flat()
    .filter((seat) => selectedSeats.includes(seat.seatNumber))
    .reduce((sum, seat) => sum + seat.price, 0);

  /* ================= PROCEED ================= */
  const handleProceed = async () => {
    if (selectedSeats.length === 0) return;

    try {
      // 1️⃣ Lock seats
      await axios.post(
        "http://localhost:3000/api/seats/lock",
        {
          showId,
          seats: selectedSeats,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 2️⃣ Create booking
      await axios.post(
        "http://localhost:3000/api/bookings",
        {
          showId,
          seats: selectedSeats,
          totalAmount: totalPrice,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // 3️⃣ Redirect
      navigate("/booking-success");
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      {/* HEADER */}
      <div className="bg-[#1F2533] text-white p-4 sticky top-0 shadow">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="bg-gray-700 px-3 py-1 rounded"
          >
            ←
          </button>
          <h1 className="font-bold text-lg">Select Seats</h1>
        </div>
      </div>

      {/* SCREEN */}
      <div className="flex flex-col items-center mt-10 mb-16">
        <div className="w-[500px] h-1 bg-blue-400 rounded"></div>
        <p className="text-xs mt-2 tracking-widest uppercase text-gray-400">
          Screen
        </p>
      </div>

      {/* SEATS */}
      <div className="flex flex-col gap-8 items-center">
        {Object.entries(seatMap).map(([row, seats]) => (
          <div key={row} className="space-y-3">
            <p className="text-xs font-bold text-gray-400 uppercase">
              Row {row}
            </p>

            <div className="flex items-center gap-3">
              <span className="text-xs w-4">{row}</span>

              <div className="flex gap-2">
                {seats.map((seat) => {
                  const isSelected = selectedSeats.includes(seat.seatNumber);

                  return (
                    <button
                      key={seat.seatNumber}
                      disabled={seat.isBooked || seat.isLocked}
                      onClick={() => toggleSeat(seat)}
                      className={`
                        w-7 h-7 text-xs rounded border transition
                        ${
                          seat.isBooked
                            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                            : seat.isLocked
                            ? "bg-yellow-200 text-yellow-800 cursor-not-allowed"
                            : isSelected
                            ? "bg-green-500 text-white"
                            : "border-green-500 text-green-600 hover:bg-green-500 hover:text-white"
                        }
                      `}
                    >
                      {seat.seatNumber.slice(1)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow">
          <div className="max-w-4xl mx-auto flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-400">
                {selectedSeats.length} Seats
              </p>
              <p className="text-xl font-bold">₹{totalPrice}</p>
            </div>

            <button
              onClick={handleProceed}
              className="bg-[#F84464] text-white px-10 py-3 rounded-lg font-bold"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
