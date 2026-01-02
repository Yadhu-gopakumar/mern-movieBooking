import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();

  // ⏱ Auto redirect after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/bookings");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white max-w-md w-full rounded-2xl shadow-xl p-8 text-center animate-fade-in">
        
        {/* Success Icon */}
        <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-green-100 mb-6">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-extrabold text-gray-900">
          Booking Confirmed!
        </h1>

        {/* Subtitle */}
        <p className="text-gray-500 mt-2">
          Your tickets have been booked successfully.
        </p>

        {/* Info Card */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4 text-sm text-gray-600 space-y-1">
          <p>🎟 Seats reserved successfully</p>
          <p>💳 Payment status: <span className="font-semibold text-green-600">Paid</span></p>
          <p>📩 Confirmation will be available in bookings</p>
        </div>

        {/* Redirect message */}
        <p className="mt-6 text-xs text-gray-400">
          Redirecting to <span className="font-semibold">My Bookings</span> in 3 seconds…
        </p>

        {/* Manual action */}
        <button
          onClick={() => navigate("/bookings")}
          className="mt-6 w-full bg-[#F84464] hover:bg-[#e63a5a] text-white py-3 rounded-lg font-bold transition-colors"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
};

export default BookingSuccess;
