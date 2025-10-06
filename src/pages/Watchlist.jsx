import Navbar from "../components/Navbar";
import { useWatchlist } from "../context/WatchlistContext";
import { Link } from "react-router-dom";

const Watchlist = () => {
  const { watchlist, removeFromWatchlist } = useWatchlist();

  if (!watchlist.length)
    return (
      <div className="bg-black text-white min-h-screen">
        <Navbar />
        <div className="p-8 text-center ">
          <h1 className="text-3xl font-bold mt-8">Your Watchlist is empty 😢</h1>
          <p className="mt-2 text-gray-400">Add movies from Home page to see them here.</p>
        </div>
      </div>
    );

  return (
    
    <div className="bg-black text-white min-h-screen">
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6 mt-10">My List</h1>

        {/* Horizontal scroll like Netflix */}
        <div className="flex space-x-6 overflow-x-scroll scrollbar-hide">
          {watchlist.map((movie) => (
            <div key={movie.id} className="relative group flex-shrink-0 w-48 md:w-60 lg:w-72">
              <Link to={`/watch/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-full h-72 md:h-96 object-cover rounded-lg shadow-lg transform transition duration-300 group-hover:scale-105"
                />
              </Link>

              {/* Remove button appears on hover */}
              <button
                onClick={() => removeFromWatchlist(movie.id)}
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 transition"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
