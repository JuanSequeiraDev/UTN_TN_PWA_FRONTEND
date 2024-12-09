import React, { createContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

/* hook es una funcion que te permite usar una propiedad o metodo sin intanciar la clase. seria como un decorador en java */


//Es un component
export const AuthContext = createContext()

//Necesitamos crear el componente proveedor

export const AuthProvider = ({ children }) => { 
    //Si hay token en el sessionStorage entonces esta autentificado

    const [isAuthentifiedState, setIsAuthentifiedState] = useState(sessionStorage.getItem('acces_token'))
    
    const navigate = useNavigate()

    useEffect(
        () => {
            Boolean(sessionStorage.getItem('acces_token')) && setIsAuthentifiedState(sessionStorage.getItem('acces_token'))
        },
        []
    )

    const login = (auth_token) =>{
        sessionStorage.setItem('acces_token', auth_token)
        setIsAuthentifiedState(sessionStorage.getItem('acces_token'))
        navigate('/home')
    }
    return (
        <AuthContext.Provider
            value={
                {
                    isAuthentified: isAuthentifiedState,
                    login
                }
            }
        >
            {children}
        </AuthContext.Provider>
    )
}
