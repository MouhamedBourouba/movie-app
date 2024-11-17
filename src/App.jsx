import { RouterProvider } from 'react-router-dom'
import { createBrowserRouter } from 'react-router-dom'
import Home from "./pages/home/home"
import Search from "./pages/search/search"
import Details from "./pages/details/details"
import Navbar from './components/navbar/navbar'
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
    route: "/",
    name: "Movies"
  },
  {
    route: "/search",
    name: "Search"
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
