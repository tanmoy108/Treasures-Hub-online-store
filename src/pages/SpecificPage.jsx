import React from 'react'
import Navbar from '../features/navbar/Navbar'
import SpecificProduct from '../features/productList/component/SpecificProduct'
import CartList from '../features/cartList/CartList'

const SpecificPage = () => {
    return (
        <>
            <Navbar>
                <SpecificProduct />
            </Navbar>
            <CartList />
        </>
    )
}

export default SpecificPage