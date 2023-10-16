import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminProductListFilter from '../features/admin/component/AdminProductFilter'
import Footer from './Footer'

const AdminHome = () => {

  return (
    <>
      <Navbar>
        <AdminProductListFilter />
      </Navbar>
      <Footer/>
    </>
  )
}

export default AdminHome