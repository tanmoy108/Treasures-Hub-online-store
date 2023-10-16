import React from 'react'
import AdminProductEditForm from '../features/admin/component/AdminProductEditForm'
import Navbar from '../features/navbar/Navbar'

const AdminEditProductFormPage = () => {
    return (
        <>
            <Navbar>
                <AdminProductEditForm />
            </Navbar>
        </>
    )
}

export default AdminEditProductFormPage