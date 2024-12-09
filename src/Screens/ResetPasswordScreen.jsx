import React from 'react'
import useForm from '../Hooks/useForm'
import { Link, useParams } from 'react-router-dom'
import Form from '../Components/Form'
import { jwtDecode } from 'jwt-decode'
//npm i jwt-decode

const ResetPasswordScreen = () => {
    const { reset_token } = useParams()

    /* console.log(jwtDecode(reset_token)) */
    const RecoveryPasswordFunction = async (form_state) => {
        /* console.log(form_state.password) */
        
        const response = await fetch(`${import.meta.env.VITE_URL_API}/api/auth/reset-password/` + reset_token,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    password: form_state.password
                })
            }
        )

        const data = await response.json()
        /* console.log(data.code) */
    }

    const form_fields = [
        {
            label_text: 'Ingresa la nueva contraseña',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'password',
                id: 'password',
                placeholder: '',
                type: 'password'
            }
        }
    ]

    const initial_state_form = {
        password: ''
    }

    return (
        <div>
            <h1>Ingresa nueva contraseña</h1>
            <Form action={RecoveryPasswordFunction} form_fields={form_fields} initial_state_form={initial_state_form}>
                
                <button type='submit'>Restablecer</button>
                <br />
                <Link to='/login'>Iniciar sesion</Link>
            </Form>

        </div>
    )
}

export default ResetPasswordScreen