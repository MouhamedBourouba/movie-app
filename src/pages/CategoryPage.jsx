import { useState, useEffect } from "react";
import MovieList from "../components/MovieList";
import LoadingCircle from "../components/LoadingCircle";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";
import { API_KEY } from "../Constants";
import { useSearchParams } from "react-router-dom";

const MovieCategory = Object.freeze({
  POPULAR: "popular",
  NOW_PLAYING: "now_playing",
  TOP_RATED: "top_rated",
  UPCOMING: "upcoming",
});

function useMovieData(category, page) {
  const buildUrl = (cat, page) => {
    const BASE_URL = `https://api.themoviedb.org/3/movie/${cat}?language=en-US&page=${page}&include_adult=false`;
    return BASE_URL;
  };

  const opt = {
    method: "get",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      accept: "application/json",
    },
  };

  let [loading, setLoading] = useState(true);
  let [movieData, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(buildUrl(category, page), opt)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .finally(() => setLoading(false));
  }, [category, page]);

  return { loading, movieData };
}

const navigationItems = [
  { route: "/movie-app/", name: "Popular" },
  { route: "/movie-app/now-playing", name: "Now Playing" },
  { route: "/movie-app/top-rated", name: "Top Rated" },
  { route: "/movie-app/upcoming", name: "Upcoming" },
];

function CategoryPage({ category }) {
  let [searchParams] = useSearchParams();
  let page = Number(searchParams.get("page"));
  if (page === 0) {
    page = 1;
  }
  let { loading, movieData } = useMovieData(category, page);
  let navigator = useNavigate();

  return (
    <>
      <div className="mx-auto mb-6 max-w-6xl px-4 transition-all">
        <Navbar navigationItems={navigationItems} />
        <div className="h-2"></div>
        {loading && <LoadingCircle />}
        {!loading && movieData && (
          <div>
            <MovieList
              movieData={movieData}
              onClick={(movie) => navigator(`/movie-app/movie/${movie.id}`)}
            />
            <div className="mt-4 flex w-max flex-row justify-center gap-2">
              {page !== 1 && (
                <button
                  className="rounded-xl bg-red-500 px-4 py-1 text-white"
                  onClick={() => {
                    navigator(`/movie-app?page=${page - 1}`);
                    window.scrollTo(0, 0);
                  }}
                >
                  {page - 1}
                </button>
              )}
              <button className="rounded-xl border border-red-500 bg-white px-4 py-1 text-red-500">
                {page}
              </button>
              <button
                className="rounded-xl bg-red-500 px-4 py-1 text-white"
                onClick={() => {
                  navigator(`/movie-app?page=${page + 1}`);
                  window.scrollTo(0, 0);
                }}
              >
                {page + 1}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default CategoryPage;
export { MovieCategory };
