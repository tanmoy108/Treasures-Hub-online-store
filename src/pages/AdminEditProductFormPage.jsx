import React from 'react'
import AdminProductEditForm from '../features/admin/component/AdminProductEditForm'
import Navbar from '../features/navbar/Navbar'
import CartList from '../features/cartList/CartList'

const AdminEditProductFormPage = () => {
    return (
        <>
            <Navbar>
                <AdminProductEditForm />
            </Navbar>
            <CartList />
        </>
    )
}

export default AdminEditProductFormPage