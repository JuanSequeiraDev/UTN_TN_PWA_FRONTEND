import React from 'react'
import useForm from '../Hooks/useForm'
import { Link } from 'react-router-dom'
import Form from '../Components/Form'


const ForgotPasswordScreen = () => {
    const initial_state_form= {
        email: ''
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
        }
    ]

    const handleForgotPassword = async (form_state) => {

        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/auth/forgot-password`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: form_state.email
                })
            })

        const data = await responseHTTP.json()
        console.log(data)
    }

    return (
        <div>
            <h1>Restablecer contraseña</h1>
            <p>Al reestablecer tu contraseña se enviara un correo electronico para enviarte las instrucciones de reestablecimiento de contraseña</p>

            <Form form_fields={form_fields} action={handleForgotPassword} initial_state_form={initial_state_form} >
                <button type='submit'>Restablecer</button>
                <br />
                <Link to='/login'>Iniciar sesion</Link>
            </Form>

            {/* <form onSubmit={handleForgotPassword}>
                <div>
                    <label htmlFor="">Ingresa tu email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='Ingresa tu email'
                        onChange={handleChange}
                        value={formState.email}
                    />
                </div>
 */}
                {/* <button type='submit'>Restablecer</button>
                <br />
                <Link to='/login'>Iniciar sesion</Link> */}
            {/* </form> */}
        </div>
    )
}

export default ForgotPasswordScreen
