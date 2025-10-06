import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";

const Watch = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null); // YouTube key

  useEffect(() => {
    const getMovie = async () => {
      try {
        // Fetch movie details
        const resMovie = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=7caa63e17ea72cb80a63ba5095148efd&language=en-US`
        );
        setMovie(resMovie.data);

        // Fetch videos
        const resVideos = await axios.get(
  `https://api.themoviedb.org/3/movie/${id}/videos?api_key=7caa63e17ea72cb80a63ba5095148efd&language=en-US`
);


        // Find first YouTube trailer
        const trailer = resVideos.data.results.find(
          (vid) => (vid.type === "Trailer" || vid.type === "Teaser") && vid.site === "YouTube"
        );

        if (trailer) setTrailerKey(trailer.key);
      } catch (err) {
        console.error(err);
      }
    };

    getMovie();
  }, [id]);

  if (!movie) return <div className="text-white p-8">Loading...</div>;

  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Navbar />

      <div className="flex justify-center items-center p-8">
        <div className="w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-white mb-4">{movie.title}</h1>

          {trailerKey ? (
            <div className="relative" style={{ paddingTop: "56.25%" }}>
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&controls=1`}
                title={movie.title}
                className="absolute top-0 left-0 w-full h-full rounded"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            <p className="text-white">Trailer not available.</p>
          )}

          <p className="text-white mt-4">{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default Watch;
