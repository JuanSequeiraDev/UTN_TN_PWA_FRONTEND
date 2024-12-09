import React, { useContext } from 'react'
import Form from '../Components/Form'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import { getAuthenticationHeaders } from '../utils/fetching'

const CreateProductScreen = () => {

    const initial_state_form = {
        title: '',
        price: '',
        stock: '',
        description: '',
        category: ''
    }

    const form_fields = [
        {
            label_text: 'Ingresa un titulo',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'title',
                id: 'title',
                placeholder: 'Tv Brand',
                type: 'title'
            }
        },
        {
            label_text: 'Ingresa el Precio',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'price',
                id: 'price',
                type: 'price'
            }
        },
        {
            label_text: 'Ingresa el stock',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'stock',
                id: 'stock',
                type: 'stock'
            }
        },
        {
            label_text: 'Ingresa la categoria',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'category',
                id: 'category',
                type: 'category',
                placeholder: 'Tecnologia'
            }
        },
        {
            label_text: 'Ingresa la descripcion',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'description',
                id: 'description',
                type: 'description'
            }
        },
        {
            label_text: 'Ingresa una imagen',
            field_container_props: {
                className: 'row_field'
            },
            field_component: 'INPUT',
            field_data_props: {
                name: 'image_base64',
                id: 'image',
                type: 'file'
            }
        }
    ]

    const navigate = useNavigate()

    const handleCreateProduct = async (form_state) => {
        const responseHTTP = await fetch(`${import.meta.env.VITE_URL_API}/api/products`,
            {
                method: 'POST',
                headers: getAuthenticationHeaders(),
                body: JSON.stringify(form_state)
            })

        const data = await responseHTTP.json()
        console.log(data)
        if (!data.ok) {
            //ToDo: Manejo de errores
        }
        else {
            //Como indica el nombre almacenamiento de sesion en mi navegador
            //Nos guardamos el token de acceso en el sessionStorage para uso futuro
            navigate('/home')
        }
        
    }




    return (
        <div>
            <Form form_fields={form_fields} initial_state_form={initial_state_form} action={handleCreateProduct}>
                <br />
                <button type='submit'>Crear</button>
                <br />
                <Link to={'/home'}>Volver atras</Link>
            </Form>
        </div>
    )
}

export default CreateProductScreen
