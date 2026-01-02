import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Search = () => {
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search).get("q");
  const [shows, setShows] = useState([]);

  useEffect(() => {
    if (!query) return;

    axios
      .get(`http://localhost:3000/api/search-theaters?query=${query}`)
      .then(res => setShows(res.data.data))
      .catch(err => console.error(err));
  }, [query]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-black">
        Search results for:{" "}
        <span className="text-yellow-500">{query}</span>
      </h1>

      {shows.length === 0 && (
        <p className="text-gray-500">No results found</p>
      )}

      {shows.map(show => (
        <div
          key={show._id}
          className="bg-white p-5 rounded-xl shadow hover:shadow-lg transition flex justify-between items-center"
        >
          <div className="space-y-1">
            <p className="text-lg font-bold">
              {show.movieId.title}
            </p>
            <p className="text-sm text-gray-500">
              {show.theaterId.name} • {show.theaterId.location}
            </p>
            <p className="text-sm text-gray-500">
              {show.date} • {show.time} • ₹{show.price}
            </p>
          </div>

          <button
            onClick={() => navigate(`/show/${show._id}/seats`)}
            className="bg-yellow-400 px-5 py-2 rounded-lg font-semibold hover:bg-yellow-500"
          >
            Book
          </button>
        </div>
      ))}
    </div>
  );
};

export default Search;
