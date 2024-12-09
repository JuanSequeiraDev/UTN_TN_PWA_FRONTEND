import React from 'react'
import useProductDetail from '../Hooks/useProductDetail'
import { useParams } from 'react-router-dom'

const ProductDetailScreen = () => {
    const { product_id } = useParams()
    const { product_detail_state, product_detail_loading_state, product_detail_error_state } = useProductDetail(product_id)
    return (
        <div>
            {
                product_detail_loading_state
                    ? <span>Loading</span>
                    : <div>{/* Crear Componente */}
                        <h1>{product_detail_state.title}</h1>
                    </div>
            }
        </div>
    )
}

export default ProductDetailScreen