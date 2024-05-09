/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react'
import { Children } from "react"
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import { Navigate } from 'react-router-dom'
import Question from '../pages/home/question/Question'
import UserManage from '../pages/home/userManage/UserManage'
import Examination from "../pages/home/examination/Examination"
import PaperManage from '../pages/home/paper/PaperManage'

const AddQuestion = lazy(() => import('../pages/home/question/addQuestion/AddQuetion'))
const QuestionBank = lazy(() => import('../pages/home/question/questionBank/QuestionBank'))
const CreateSubject = lazy(() => import('../pages/home/question/createSubject/CreateSubject'))

const UserManaOptions = lazy(() => import('../pages/home/userManage/userManaOptions/UserManaOptions'))
const UserManageUser = lazy(() => import('../pages/home/userManage/userManageUser/UserManageUser'))
const UserManaPerson = lazy(() => import('../pages/home/userManage/userManagePerson/UserManagePerson'))


const ExaminationCreate = lazy(() => import(/* webpackChunkName: "examination" */ '../pages/home/examination/create/Create'))
const ExaminationList = lazy(() => import(/* webpackChunkName: "examinationList" */ '../pages/home/examination/list/List'))
const ExaminationDetail = lazy(() => import(/* webpackChunkName: "examinationDetail" */ '../pages/home/examination/detail/Detail'))

const PaperCreate = lazy(()=> import(/* webpackChunkName: "paperCreate" */ "../pages/home/paper/paperCreate/PaperCreate"))
const PaperLibrary = lazy(()=> import(/* webpackChunkName: "paperLibrary" */ '../pages/home/paper/paperLibrary/PaperLibrary'))


export const routes = [
  {
    path: '/',
    element: <Home></Home>,
    children: [
      {
        path: '/userManage',
        element: <UserManage />,
        children: [
          {
            path: '/userManage/manage-page',
            element: <UserManageUser />
          },
          {
            path: '/userManage/personal',
            element: <UserManaPerson />
          },
          {
            path: '/userManage/userOptions',
            element: <UserManaOptions />
          }
        ]
      },
      {
        path: '/question',
        element: <Question />,
        children: [
          {
            path: '/question',
            element: <Navigate to="/question/addquestion" />
          },
          {
            path: '/question/addquestion',
            element: <AddQuestion />
          },
          {
            path: '/question/questionbank',
            element: <QuestionBank />
          },
          {
            path: '/question/createsubject',
            element: <CreateSubject />
          }
        ]
      },
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
      },
      {
        path: '/paper',
        element: <PaperManage />,
        children: [
          {
            path: '/paper/paperCreate',
            element: <Suspense fallback={<div>加载中...</div>}><PaperCreate /></Suspense>
          },
          {
            path: '/paper/paperLibrary',
            element: <Suspense fallback={<div>加载中...</div>}><PaperLibrary /></Suspense>         
          },
        ]
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  },

]