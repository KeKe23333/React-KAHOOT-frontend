import Login from '../pages/sign/'
import Dashboard from '../components/Dashboard'
import { Navigate } from 'react-router-dom'
import React from 'react'
import Main from '../pages/main'
import About from '../components/About'
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
        path: 'About/:id',
        element: <About/>
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
