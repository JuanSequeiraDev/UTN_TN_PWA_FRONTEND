import React, { useContext, useEffect, useState } from 'react'
import useProducts from '../Hooks/useProducts'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

//Ni componentes hooks pueden ser async
const HomeScreen = () => {
    const { products, products_error_state, products_loading_state } = useProducts()
    
    const {isAuthentified} = useContext(AuthContext)
    //USO DE ENVIROMENT     console.log(import.meta.env)
    
    return (
        <div>
            <h1>Bienvendo al home </h1>
            {/* 
            Ver si el usuario tiene rol de admin y si tiene rol de admin mostrar el boton de crear producto, este boton te llevara a /product/new y nos mostrara un formularia para crear el producto
            */}
            <div>
                {
                    products_loading_state
                        ? <span>Cargando</span>
                        : (
                            products_error_state
                                ? <span>{products_error_state}</span>
                                : <div>
                                    {
                                        products.map(
                                            (product) => {
                                                return(
                                                    <div key={product._id}>
                                                        <h2 >
                                                            {product.title}
                                                        </h2>
                                                        <img src={product.image_base64} alt="" style={{width:'50px'}} />
                                                        <span>Precio ${product.price}</span>
                                                        <Link to={`/product/${product._id}`}>Ver detalle</Link>
                                                    </div>
                                                )
                                            }
                                        )
                                    }
                                    <br />
                                    <Link to={'/admin/createProduct'}>Crea un producto</Link>
                                </div>
                        )
                }
            </div>
        </div>
    )
}

export default HomeScreen