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
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <CategoryPage category={MovieCategory.POPULAR} />,
      },
      {
        path: "/now-playing",
        element: <CategoryPage category={MovieCategory.NOW_PLAYING} />,
      },
      {
        path: "/top-rated",
        element: <CategoryPage category={MovieCategory.TOP_RATED} />,
      },
      {
        path: "/upcoming",
        element: <CategoryPage category={MovieCategory.UPCOMING} />,
      },
    ],
  },
]);

const navigationItems = [
  { route: "/", name: "Popular" },
  { route: "/now-playing", name: "Now Playing" },
  { route: "/top-rated", name: "Top Rated" },
  { route: "/upcoming", name: "Upcoming" },
];

// Leaked intentionally

function useMovieData(category, page) {
  const API_KEY =
    "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGNhNTNlYzgwNzZkNzJlMjUwZTY5NzE3MzZjYTU4NiIsIm5iZiI6MTczMjkwMDcwMi45NDQ2Nzk1LCJzdWIiOiI2NzQ5ZjVmZmIzZDNlYjkzM2JhMjY0MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VBF0u3Eh52wZV0NQRFRjMawa-JtLumxMUNP9JPsr2C8";

  const buildUrl = (cat) => {
    const BASE_URL = `https://api.themoviedb.org/3/movie/${cat}?language=en-US&page=1?include_adult=false`;
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
    setLoading(true)
    fetch(buildUrl(category), opt)
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
  let { loading, movieData } = useMovieData(category);

  return (
    <>
      <div className=""></div>
      {loading && <LoadingCircle />}
      {!loading && movieData && (
        <div>
          <MovieList movieData={movieData} />
          <p>PAGINATION</p>
        </div>
      )}
    </>
  );
}

function Root() {
  return (
    <>
      <div className="mb-6 px-4 transition-all max-w-5xl mx-auto">
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
