import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchMovies } from "../api/tmdb";
import { Link } from "react-router-dom";

const Home = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);

  useEffect(() => {
    const getMovies = async () => {
      setTrending(await fetchMovies("popular"));
      setTopRated(await fetchMovies("top_rated"));
    };
    getMovies();
  }, []);

  return (
    <div className="bg-black text-white">
      <Navbar />

      {/* Banner */}
      {trending[0] && (
        <div
          className="relative h-[80vh] flex flex-col justify-end p-12"
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${trending[0].backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

          <div className="relative z-10 max-w-2xl">
            <h1 className="text-6xl font-bold mb-4">{trending[0].title}</h1>
            <p className="text-lg mb-4 line-clamp-3">{trending[0].overview}</p>
            <div className="flex space-x-4">
              <button className="bg-white text-black font-semibold px-8 py-3 rounded hover:bg-gray-200 transition">
                Play
              </button>
              <button className="bg-gray-700 text-white font-semibold px-6 py-3 rounded hover:bg-gray-600 transition">
                + My List
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Movie Rows */}
      <div className="p-8 space-y-12">
        {/* Trending Now */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Trending Now</h2>
          <div className="flex space-x-8 overflow-x-scroll scrollbar-hide px-4 sm:px-8 snap-x snap-mandatory">
            {trending.map((movie) => (
              <Link
                key={movie.id}
                to={`/watch/${movie.id}`}
                className="snap-start flex-shrink-0"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-60 h-96 object-cover rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Top Rated */}
        <div>
          <h2 className="text-3xl font-bold mb-6">Top Rated</h2>
          <div className="flex space-x-8 overflow-x-scroll scrollbar-hide px-4 sm:px-8 snap-x snap-mandatory">
            {topRated.map((movie) => (
              <Link
                key={movie.id}
                to={`/watch/${movie.id}`}
                className="snap-start flex-shrink-0"
              >
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="w-60 h-96 object-cover rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
