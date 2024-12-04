import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import { Outlet } from "react-router-dom";
import LoadingCircle from "./components/LoadingCircle.jsx";
import MovieList from "./components/MovieList.jsx";
import { useState, useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      //{
      //  path: "/",
      //  element: <Root title={"Popular"}/>,
      //},
      //{
      //  path: "/now-playing",
      //  element: <Root title={"Now Playing"}/>,
      //},
      //{
      //  path: "/top-rated",
      //  element: <Root title={"Top Rated"}/>,
      //},
      //{
      //  path: "/upcoming",
      //  element: <Root title={"Upcomming"}/>,
      //},
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
const API_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyZGNhNTNlYzgwNzZkNzJlMjUwZTY5NzE3MzZjYTU4NiIsIm5iZiI6MTczMjkwMDcwMi45NDQ2Nzk1LCJzdWIiOiI2NzQ5ZjVmZmIzZDNlYjkzM2JhMjY0MGEiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.VBF0u3Eh52wZV0NQRFRjMawa-JtLumxMUNP9JPsr2C8";
const POPULAR_URL =
  "https://api.themoviedb.org/3/discover/tv?include_adult=false&language=en-US&page=3&sort_by=popularity.desc";

function Root() {
  let [loading, setLoading] = useState(true);
  let [movieData, setData] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(POPULAR_URL, {
      method: "get",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        accept: "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setData(res);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="xl:px-35 mb-6 px-4 transition-all sm:px-16 md:px-24 2xl:px-52">
        <Navbar navigationItems={navigationItems} />
        {loading && <LoadingCircle />}
        {!loading && movieData && <MovieList movieData={movieData} />}
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
