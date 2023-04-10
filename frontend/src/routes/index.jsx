import Login from '../pages/sign/'
import Dashboard from '../components/dashboard/'
import { Navigate } from 'react-router-dom'
import React from 'react'
import Main from '../pages/main'
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
        path: 'dashboard',
        element: <Dashboard />
      },
      {
        path: 'About',
        element: <Dashboard />
      },
    ]
  },
  {
    path: '/',
    element: <Navigate to='/login' />
  }
]
