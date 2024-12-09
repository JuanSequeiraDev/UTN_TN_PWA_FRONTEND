import { useEffect, useState } from "react"
import { getAuthenticationHeaders } from "../utils/fetching"

const useProductDetail = (product_id) => {
    const [product_detail_state, setProductDetail] = useState([])
    const [product_detail_loading_state, setProductDetailLoading] = useState(true)
    const [product_detail_error_state, setProductDetailError] = useState(null)

    const getProductDetail = async () => {
        const response = await fetch(`http://localhost:3000/api/products/${product_id}`, {
            method: 'GET',
            headers: getAuthenticationHeaders()
        })
        const data = await response.json()
        if (!data.ok) {
            setProductDetailError(data.message)
            setProductDetailLoading(false)
            return
        }
        else {
            setProductDetail(data.data.productoBuscado)
            
        }
        setProductDetailLoading(false)
    }

    useEffect(
        ()=>{
            getProductDetail(product_id)
        },
        []
    )

    return{
        product_detail_state,
        product_detail_loading_state,
        product_detail_error_state
    }
}

export default useProductDetail