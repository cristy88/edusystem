/* eslint-disable react-refresh/only-export-components */
import { lazy } from 'react'
import Home from "../pages/home/Home"
import Login from "../pages/login/Login"
import { Navigate } from 'react-router-dom'
import Question from '../pages/home/question/Question'
import UserManage from '../pages/home/userManage/UserManage'

const AddQuestion = lazy(() => import('../pages/home/question/addQuestion/AddQuetion'))
const QuestionBank = lazy(() => import('../pages/home/question/questionBank/QuestionBank'))
const CreateSubject = lazy(() => import('../pages/home/question/createSubject/CreateSubject'))

const UserManaOptions = lazy(() => import('../pages/home/userManage/userManaOptions/UserManaOptions'))
const UserManageUser = lazy(() => import('../pages/home/userManage/userManageUser/UserManageUser'))
const UserManaPerson = lazy(() => import('../pages/home/userManage/userManagePerson/UserManagePerson'))

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
      }
    ]
  },
  {
    path: '/login',
    element: <Login></Login>
  }
]