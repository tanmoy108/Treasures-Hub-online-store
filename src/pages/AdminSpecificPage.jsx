import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminSpecificProduct from '../features/admin/component/AdminSpecificProduct'

const AdminSpecificPage = () => {
    return (
        <>
            <Navbar>
                <AdminSpecificProduct />
            </Navbar>
        </>
    )
}

export default AdminSpecificPage