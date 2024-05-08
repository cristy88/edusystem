import { Children } from "react"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"

import Student from '../pages/student/Student'
import StudentGroup from '../pages/studentGroup/StudentGroup'

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
    path: '/studentGroup',
    element: <StudentGroup></StudentGroup>
  },
  {
    path: '/student',
    element: <Student></Student>
  }
]