import { useEffect, useState } from "react"
import {getAuthenticationHeaders} from "../utils/fetching"

const useProducts = () => {
    //Logica de los productos
    const [products, setProducts] = useState([])
    const [products_loading_state, setProductsLoading] = useState(true)
    const [products_error_state, setProductsError] = useState(null)

    const obtenerProductos = async () => {
        const response = await fetch(`${import.meta.env.VITE_URL_API}/api/products`, {
            method: 'GET',
            headers: getAuthenticationHeaders()
        })
        const data = await response.json()
        console.log(data)
        if (!data.ok) {
            //Seteamos el error para manejarlo despues
            setProductsError(data.message)
            setProductsLoading(false)
            return
        }
        else {
            setProducts(data.data.products)
            setProductsLoading(false)
        }
    }
    useEffect(
        () => {
            obtenerProductos()
        },
        []
    )

    return {
        products,
        products_loading_state,
        products_error_state
    }
}

export default useProducts