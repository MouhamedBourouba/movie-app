import { RouterProvider } from "react-router-dom";
import { createBrowserRouter } from "react-router-dom";
import Navbar from "./components/navbar.jsx";
import { Outlet } from "react-router-dom";
import Popular from "./pages/Popular.jsx";
import NowPlaying from "./pages/NowPlaying.jsx";
import TopRated from "./pages/TopRated.jsx";
import Upcoming from "./pages/Upcoming.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Popular />,
      },
      {
        path: "/now-playing",
        element: <NowPlaying />,
      },
      {
        path: "/top-rated",
        element: <TopRated />,
      },
      {
        path: "/upcoming",
        element: <Upcoming />,
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

function Root() {
  return (
    <>
      <div className="flex flex-col">
        <Navbar navigationItems={navigationItems} />
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
