import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams(); // movieId
  const navigate = useNavigate();

  const [movie, setMovie] = useState(null);
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // 1️⃣ Fetch movie details
    axios
      .get(`http://localhost:3000/api/movies/${id}`)
      .then(res => setMovie(res.data.data))
      .catch(err => console.error(err));

    // 2️⃣ Fetch shows for this movie
    axios
      .get(`http://localhost:3000/api/shows/${id}`)
      .then(res => setShows(res.data.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!movie) return <p className="text-black">Loading movie…</p>;

  return (
    <div className="max-w-6xl mx-auto space-y-10 p-6">
      {/* Movie Header */}
      <div className="bg-white rounded-2xl shadow p-8">
        <h1 className="text-4xl font-bold text-green-950">{movie.title}</h1>
        <p className="text-gray-500 mt-1">
          {movie.genre} • {movie.language} • {movie.duration} mins
        </p>

        <p className="mt-4 text-gray-700 max-w-3xl">
          {movie.description}
        </p>
      </div>

      {/* Shows Section */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold text-black">
          Available Shows
        </h2>

        {shows.length === 0 && (
          <p className="text-gray-500">No shows available</p>
        )}

        {shows.map(show => (
          <div
            key={show._id}
            className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 rounded-xl shadow hover:shadow-lg transition"
          >
            <div className="space-y-1">
              <p className="text-lg font-semibold">
                {show.theaterId.name}
              </p>

              <p className="text-gray-500">
                {show.date} • {show.time}
              </p>

              <p className="text-sm text-gray-500">
                From ₹{show.basePrice}
              </p>
            </div>

            <button
              className="mt-4 md:mt-0 bg-yellow-400 px-6 py-2 rounded-lg font-bold hover:bg-yellow-500"
              onClick={() => navigate(`/show/${show._id}/seats`)}
            >
              Select Seats
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
