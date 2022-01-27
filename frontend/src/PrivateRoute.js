import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = ({ element: Element, ...rest }) => {

  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem('userInfo')

  return isLoggedIn ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoute