/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense} from 'react'
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

const StudentGroup = lazy(()=> import('../pages/home/studentGroup/StudentGroup'))
const Group = lazy(() => import('../pages/home/studentGroup/group/Group'))
const Student = lazy(() => import('../pages/home/studentGroup/student/Student'))


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
            element: <Navigate to="/question/create-item" />
          },
          {
            path: '/question/create-item',
            element: <AddQuestion />
          },
          {
            path: '/question/item-bank',
            element: <QuestionBank />
          },
          {
            path: '/question/create-subject',
            element: <CreateSubject />
          }
        ]
      },
      {
        path: '/exam',
        element: <Examination />,
        children: [
          {
            path: '/exam',
            element: <Navigate to='/exam/create' />
          },
          {
            path: '/exam/create',
            element: <ExaminationCreate />
          },
          {
            path: '/exam/record',
            element: <ExaminationList />
          },
          {
            path: '/exam/invigilate',
            element: <ExaminationDetail />
          }
        ]
      },
      {
        path: '/manage-group',
        element: <StudentGroup></StudentGroup>,
        children: [
          {
            path: '/manage-group/group-list',
            element: <Group></Group>
          },
          {
            path: '/manage-group/group-students',
            element: <Student></Student>
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