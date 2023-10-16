import React from 'react'
import Navbar from '../features/navbar/Navbar'
import SpecificProduct from '../features/productList/component/SpecificProduct'

const SpecificPage = () => {
    return (
        <>
            <Navbar>
                <SpecificProduct />
            </Navbar>
        </>
    )
}

export default SpecificPage