import {
  BrowserRouter as Router,
  Routes,
  Route,
  useParams,
} from "react-router-dom";

import CategoryPage, { MovieCategory } from "./pages/CategoryPage.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { API_KEY } from "./Constants.js";

const BASE_URL = "https://api.themoviedb.org/3/movie";
function MoviePage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMovie() {
      try {
        setLoading(true);

        const opt = {
          method: "get",
          headers: {
            Authorization: `Bearer ${API_KEY}`,
            accept: "application/json",
          },
        };

        const response = await fetch(
          `${BASE_URL}/${movieId}?api_key=${API_KEY}&language=en-US`,
          opt
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setMovie(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovie();
  }, [movieId]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;
  if (!movie)
    return <p className="text-center text-gray-500">Movie not found.</p>;

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="text-2xl font-bold text-black">{movie.title}</h1>
      <p className="text-gray-500">{movie.release_date}</p>

      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="mt-4 rounded-xl shadow-lg"
      />

      <p className="mt-4 text-gray-700">{movie.overview}</p>

      <p className="mt-2 text-lg font-bold text-yellow-500">
        ⭐ {movie.vote_average ? movie.vote_average.toFixed(1) : "N/A"}
      </p>
    </div>
  );
}

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/movie-app">
            <Route
              index
              element={<CategoryPage category={MovieCategory.POPULAR} />}
            />
            <Route
              path="now-playing"
              element={<CategoryPage category={MovieCategory.NOW_PLAYING} />}
            />
            <Route
              path="top-rated"
              element={<CategoryPage category={MovieCategory.TOP_RATED} />}
            />
            <Route
              path="upcoming"
              element={<CategoryPage category={MovieCategory.UPCOMING} />}
            />
          </Route>
          <Route path="/movie-app/movie/:movieId" element={<MoviePage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
