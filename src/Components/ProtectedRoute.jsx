import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
    const {isAuthentified} = useContext(AuthContext)
    console.log(isAuthentified)
    return (
        isAuthentified
        ? <Outlet/> //Similar al next() de react-router-dom
        : <Navigate to={'/login'}/> //Similar a un redirect
    )
}

export default ProtectedRoute