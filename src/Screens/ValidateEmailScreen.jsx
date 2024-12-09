import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



const ValidateEmailScreen = () => {
    const {validation_token} = useParams()

    const [validation_email_response_state, setValidationEmailResponseState] = useState({
        is_loading: true,
        response: null,
        is_error: false
    })

    const navigate = useNavigate()

    const validateMailToken = async (validation_token) =>{
        try{
            const response = await fetch(`${import.meta.env.VITE_URL_API}/api/auth/verify-email/${validation_token}`)
            const result = await response.json()
            setValidationEmailResponseState(
                (prevState) => {
                    return {...prevState, is_loading: false, response: result /* Setear error con la response */}
                }
            )
            if(result.status = 200){
                navigate('/')
            }
        }
        catch(error){
            console.error(error)
        }
    }
    
    useEffect(
        () =>{
            validateMailToken(validation_token)
        },
        []
    )
    return (
        <div>
            {
                validation_email_response_state
                && <h2>Cargando...</h2>
            }
        </div>
    )
}

export default ValidateEmailScreen