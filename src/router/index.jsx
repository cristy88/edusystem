import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import Examination from "../pages/home/examination/Examination"
import { Navigate } from "react-router-dom"
import { lazy, Suspense } from "react"

const ExaminationCreate = lazy(() => import(/* webpackChunkName: "examination" */ '../pages/home/examination/create/Create'))
const ExaminationList = lazy(() => import(/* webpackChunkName: "examinationList" */ '../pages/home/examination/list/List'))
const ExaminationDetail = lazy(() => import(/* webpackChunkName: "examinationDetail" */ '../pages/home/examination/detail/Detail'))

export const routes = [
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/examination',
        element: <Examination></Examination>,
        children: [
          {
            path: '/examination',
            element: <Navigate to='/examination/create'></Navigate>
          },
          {
            path: '/examination/create',
            element: <Suspense fallback={<div>加载中...</div>}><ExaminationCreate></ExaminationCreate></Suspense>
          },
          {
            path: '/examination/list',
            element: <Suspense fallback={<div>加载中...</div>}><ExaminationList></ExaminationList></Suspense>
          },
          {
            path: '/examination/detail',
            element: <Suspense fallback={<div>加载中...</div>}><ExaminationDetail></ExaminationDetail></Suspense>
          }
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  }
]