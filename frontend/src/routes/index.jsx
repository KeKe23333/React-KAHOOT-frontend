import Login from '../pages/sign/'
import Dashboard from '../components/Dashboard'
import { Navigate } from 'react-router-dom'
import React from 'react'
import Main from '../pages/main'
import Quiz from '../components/Quiz'
import Question from '../components/Question'
import PlayerIn from '../pages/playerin'
import PlayerHome from '../pages/playerhome'
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
        path: 'quiz/:quizId/:quizName',
        element: <Quiz/>,
      },
      {
        path: 'question/:quizId/:questionId',
        element: <Question/>,
      },
    ]
  },
  {
    path: '/play/join/:sessionId',
    element: <PlayerIn />
  },
  {
    path: '/play/join/:sessionId/player/:playerId/name/:playerName',
    element: <PlayerHome />
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
