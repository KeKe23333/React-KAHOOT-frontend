import Login from '../pages/sign/'
import Dashboard from '../pages/dashboard'
import { Navigate } from 'react-router-dom'
import React from 'react'
export default [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/dashboard',
    element: <Dashboard />
  },
  {
    path: '/',
    element: <Navigate to='/dashboard' />
  }
]
