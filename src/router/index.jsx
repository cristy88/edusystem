import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import PaperCreate from "../pages/paper/paperCreate/PaperCreate"
import PaperManage from "../pages/paper/paperManage/PaperManage"

export const routes = [
  {
    path: '/',
    element: <Home></Home>
  },
  {
    path: '/login',
    element: <Login></Login>
  },
  {
    path: '/paper/paperCreate',
    element: <PaperCreate></PaperCreate>
  },
  {
    path: '/paper/paperManage',
    element: <PaperManage></PaperManage>
  },
]