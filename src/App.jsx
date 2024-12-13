import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import LoadingCircle from "./components/LoadingCircle.jsx";
import MovieList from "./components/MovieList.jsx";
import { useState, useEffect } from "react";

const MovieCategory = Object.freeze({
  POPULAR: "popular",
  NOW_PLAYING: "now_playing",
  TOP_RATED: "top_rated",
  UPCOMING: "upcoming",
});

const router = createBrowserRouter([
  {
    path: "/movie-app/",
    element: <Root />,
    children: [
      {
        index: true,
        element: <CategoryPage category={MovieCategory.POPULAR} />,
      },
      {
        path: "now-playing",
        element: <CategoryPage category={MovieCategory.NOW_PLAYING} />,
      },
      {
        path: "top-rated",
        element: <CategoryPage category={MovieCategory.TOP_RATED} />,
      },
      {
        path: "upcoming",
        element: <CategoryPage category={MovieCategory.UPCOMING} />,
      },
    ],
  },
]);

const navigationItems = [
  { route: "/movie-app/", name: "Popular" },
  { route: "/movie-app/now-playing", name: "Now Playing" },
  { route: "/movie-app/top-rated", name: "Top Rated" },
  { route: "/movie-app/upcoming", name: "Upcoming" },
];

function useMovieData(category, page) {
  // Leaked intentionally
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGNhNTNlYzgwNzZkNzJlMjUwZTY5NzE3MzZjYTU4NiIsIm5iZiI6MTczMjkwMDcwMi45NDQ2Nzk1LCJzdWIiOiI2NzQ5ZjVmZmIzZDNlYjkzM2JhMjY0MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VBF0u3Eh52wZV0NQRFRjMawa-JtLumxMUNP9JPsr2C8";

  const buildUrl = (cat, page) => {
    const BASE_URL = `https://api.themoviedb.org/3/movie/${cat}?language=en-US&page=${page}?include_adult=false`;
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

function CategoryPage({ category }) {
  let [page, setPage] = useState(1);
  let { loading, movieData } = useMovieData(category, page);

  return (
    <>
      {loading && <LoadingCircle />}
      {!loading && movieData && (
        <div>
          <MovieList movieData={movieData} />
          <div className="mt-4 flex w-max flex-row justify-center gap-2">
            {page !== 1 && (
              <button
                className="rounded-xl bg-red-500 px-4 py-1 text-white"
                onClick={() => setPage(page - 1)}
              >
                {page - 1}
              </button>
            )}
            <button className="rounded-xl border border-red-500 bg-white px-4 py-1 text-red-500">
              {page}
            </button>
            <button
              className="rounded-xl bg-red-500 px-4 py-1 text-white"
              onClick={() => setPage(page + 1)}
            >
              {page + 1}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function Root() {
  return (
    <>
      <div className="mx-auto mb-6 max-w-6xl px-4 transition-all">
        <Navbar navigationItems={navigationItems} />
        <div className="h-2"></div>
        <Outlet />
      </div>
    </>
  );
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
