import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { useWatchlist } from "../context/WatchlistContext";
import { useNavigate } from "react-router-dom";




const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  
  const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
  const navigate = useNavigate();
  

const isInWatchlist = movie && watchlist.find((m) => m.id === movie.id);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=7caa63e17ea72cb80a63ba5095148efd&language=en-US`
        );
        setMovie(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    getMovie();
  }, [id]);

  if (!movie) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="bg-black text-white min-h-screen">
        <Navbar/>
      {/* Banner */}
      <div
        className="relative w-full h-[70vh] md:h-[80vh] flex flex-col justify-end"
        style={{
          backgroundImage: movie.backdrop_path
            ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
            : "url(/fallback-image.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

        {/* Movie info */}
        <div className="relative z-10 p-8 md:p-16 max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{movie.title}</h1>
          {movie.tagline && (
            <p className="text-gray-300 italic mb-4">{movie.tagline}</p>
          )}
          <p className="text-lg md:text-xl mb-6 line-clamp-4">{movie.overview}</p>

          <div className="flex flex-wrap gap-4">
            <button
  className="bg-white text-black font-semibold px-8 py-3 rounded hover:bg-gray-200 transition"
  onClick={() => navigate(`/play/${movie.id}`)}
>
  Play
</button>

            <button
  className={`px-6 py-3 rounded font-semibold transition ${
    isInWatchlist ? "bg-green-600 hover:bg-green-700" : "bg-gray-700 hover:bg-gray-600 text-white"
  }`}
  onClick={() => {
    if (!isInWatchlist) addToWatchlist(movie);
    else removeFromWatchlist(movie.id);
  }}
>
  {isInWatchlist ? "✓ Added" : "+ My List"}
</button>
          </div>
        </div>
      </div>

      {/* Movie details */}
      <div className="p-8 md:p-16 flex flex-col md:flex-row md:space-x-12 max-w-5xl mx-auto">
        {/* Poster */}
        <div className="flex-shrink-0 mb-6 md:mb-0">
          <img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/fallback-image.jpg"
            }
            alt={movie.title}
            className="w-60 md:w-80 rounded-lg shadow-lg"
          />
        </div>

        {/* Info */}
        <div className="flex-1 space-y-4">
          <p>
            <span className="font-semibold">Rating:</span> {movie.vote_average} / 10
          </p>
          <p>
            <span className="font-semibold">Release Date:</span> {movie.release_date}
          </p>
          {movie.genres && (
            <p>
              <span className="font-semibold">Genres:</span>{" "}
              {movie.genres.map((g) => g.name).join(", ")}
            </p>
          )}
          <p>
            <span className="font-semibold">Runtime:</span> {movie.runtime} min
          </p>
          <p>
            <span className="font-semibold">Language:</span> {movie.original_language.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
