import Login from '../pages/sign/'
import Dashboard from '../components/Dashboard'
import { Navigate } from 'react-router-dom'
import React from 'react'
import Main from '../pages/main'
import Quiz from '../components/Quiz'
import Question from '../components/Question'
export default [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/main',
    element: <Main />,
    children: [
      {
        path: '',
        element: < Navigate to= '/main/dashboard' />
      },
      {
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'quiz/:id/:quizName',
        element: <Quiz/>,
      },
      {
        path: 'question/:id',
        element: <Question/>,
      },
    ]
  },
  {
    path: '*',
    element: <h2>404 Page Not Found</h2>
  },
  {
    path: '/',
    element: <Navigate to='/login' />
  }
]
