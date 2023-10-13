import React from 'react'
import Navbar from '../features/navbar/Navbar'
import CartList from '../features/cartList/CartList'
import AdminProductListFilter from '../features/admin/component/AdminProductFilter'
import Footer from './Footer'

const AdminHome = () => {

  return (
    <>
      <Navbar>
        <AdminProductListFilter />
      </Navbar>
      <CartList />
      <Footer/>
    </>
  )
}

export default AdminHome