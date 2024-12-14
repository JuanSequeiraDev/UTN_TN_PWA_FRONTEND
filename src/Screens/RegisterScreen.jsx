import React from 'react'
import { useState } from 'react'
import useForm from '../Hooks/useForm'
import { Link, useNavigate } from 'react-router-dom'

const RegisterScreen = () => {

    const navigate = useNavigate

    //Cuando invoco a useForm se crea otro estado de formulario y me devuelve dicho estado y una funcion para asociar a cada input y que modifique mi estado de formulario
    const { formState, handleChange } = useForm({
        email: '',
        password: '',
        name: ''
    })

const [errorState, setErrorState] = useState({
    name: '',
    email: '',
    password: '',
    general:''
})

    const handleRegister = async (event) => {
        event.preventDefault()
        console.log('formulario registro enviado')
        /* Obtener un objeto con todos los datos del form, ejemplo {name: '', email: '', password: ''} */

        //CORS = CROSS ORIGIN RESOURCE SHARING
        //Que hace fetch?
        //Nos permite hacer consultas HTTP
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/auth/register`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formState)
            })

        const data = await responseHTTP.json()

        console.log(data)

        //ToDo: Crear un hook para error y validaciones mas automatizadas
        if(!data.ok){
            
            for(let field_name in data.data.registerState){
                if(field_name === 'hayErrores'){ continue; }
                if(data.data.registerState[field_name].errors.length >= 1){
                    data.data.registerState[field_name].errors.forEach(error => {
                        setErrorState((prevState)=> {
                            return {...prevState, [field_name]: error.message}
                        })
                    });
                }
                
            }
        }
        else{
            navigate('/login')
        }
/*         console.log(errorState) */
        

        //Tomar el error que venga del back y setear en caso de ser necesario errores
        
    }

    return (
        <div>
            <h1>Registrate en discord</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label htmlFor="">Ingresa tu nombre:</label>
                    <input
                        type="text"
                        name='name'
                        id='name'
                        placeholder='Cosme Fulanito'
                        onChange={handleChange}
                        value={formState.name}
                    />
                    {
                        
                        errorState.name && <><br/> <span style={{color: 'red'}}>{errorState.name}</span> </>
                    }
                </div>
                <br/>
                <div>
                    <label htmlFor="">Ingresa tu email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder='email@gmail.com'
                        onChange={handleChange}
                        value={formState.email}
                    />
                    {
                        errorState.email && <> <br /><span style={{color: 'red'}}>{errorState.email}</span> </>
                    }
                </div>
                <br/>
                <div>
                    <label htmlFor="">Ingresa tu password</label>
                    <input
                        type="password"
                        name='password'
                        id='password'
                        placeholder='admin123'
                        onChange={handleChange}
                        value={formState.password}
                    />
                    {
                        errorState.password && <> <br /><span style={{color: 'red'}}>{errorState.password}</span></>
                    }
                </div>
                <br/>
                <button type='submit'>Registrarse</button>
                <br />
                <Link to='/forgot-password'>Olvide mi contraseña</Link>
                <br />
                <Link to='/login'>Iniciar sesion</Link>
            </form>
        </div>
    )
}

export default RegisterScreen