import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Home from "./pages/home/home"
import Search from "./pages/search/search"
import Details from "./pages/details/details"
import Navbar from './components/navbar.jsx'
import { Outlet } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />
      },
      {
        path: "/search",
        element: <Search />,
      },
      {
        path: "/details",
        element: <Details />
      }
    ]
  },
])

const navigationItems = [
  {
    route: "/popular",
    name: "Popular"
  },
  {
    route: "/now-playing",
    name: "Now Playing"
  },
  {
    route: "/top-rated",
    name: "Top Rated"
  },
  {
    route: "/upcomming",
    name: "Upcomming"
  },
]

function Root() {
  return (
    <>
      <Navbar navigationItems={navigationItems} />
      <Outlet />
    </>
  )
}

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
