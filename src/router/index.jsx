import Home from "../pages/home/Home"
import Login from "../pages/login/Login"

export const routes = [
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: '/login',
    element: <Login></Login>
  }
]