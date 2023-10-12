import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminSpecificProduct from '../features/admin/component/AdminSpecificProduct'
import CartList from '../features/cartList/CartList'

const AdminSpecificPage = () => {
    return (
        <>
            <Navbar>
                <AdminSpecificProduct />
            </Navbar>
            <CartList />
        </>
    )
}

export default AdminSpecificPage