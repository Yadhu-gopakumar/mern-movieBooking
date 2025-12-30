import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MyBookings from "./pages/MyBookings";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold">🎬 MovieBook</h1>

        <div className="flex gap-6">
          <Link
            to="/"
            className="hover:text-yellow-400 transition-colors"
          >
            Home
          </Link>
          <Link
            to="/bookings"
            className="hover:text-yellow-400 transition-colors"
          >
            My Bookings
          </Link>
          <Link
            to="/login"
            className="bg-yellow-400 text-black px-4 py-1 rounded hover:bg-yellow-500 transition"
          >
            Login
          </Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="min-h-screen bg-gray-100 p-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/bookings" element={<MyBookings />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
