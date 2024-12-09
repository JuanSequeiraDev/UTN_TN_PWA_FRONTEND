import React, { useContext, useState } from 'react'
import useForm from '../Hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'
import Form from '../Components/Form'
import { AuthContext } from '../context/AuthContext'



const LoginScreen = () => {

    const {login} = useContext(AuthContext)

    const initial_state_form = {
        email: '',
        password: ''
    }

    const form_fields = [
        {
            label_text: 'Ingresa tu email',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'email',
                id: 'email',
                placeholder: 'example@gmail.com',
                type: 'email'
            }
        },
        {
            label_text: 'Ingresa tu contraseña',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'password',
                id: 'password',
                type: 'password'
            }
        }
    ]


    const [errorState, setErrorState] = useState({
        name: '',
        email: '',
        password: '',
        general: ''
    })

    const handleLogin = async (form_state) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/auth/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form_state)
            })

        const data = await responseHTTP.json()
        console.log(data)
        if (!data.ok) {
            //ToDo: Manejo de errores
        }
        

        //Como indica el nombre almacenamiento de sesion en mi navegador
        //Nos guardamos el token de acceso en el sessionStorage para uso futuro
        login(data.data.access_token)
    }




    return (
        <div>
            <h1>Inicia sesion</h1>
            <Form action={handleLogin} initial_state_form={initial_state_form} form_fields={form_fields} >
                <button type='submit'>Iniciar Sesion</button>
                <br />
                <span>No tienes cuenta? Registrate <Link to="/register">aqui</Link></span>
                <br />
                <Link to='/forgot-password'>Olvide mi contraseña</Link>
            </Form>
        </div>
    )
}

export default LoginScreen