import React from 'react'
import Navbar from '../features/navbar/Navbar'
import CartList from '../features/cartList/CartList'
import AdminProductListFilter from '../features/admin/component/AdminProductFilter'

const AdminHome = () => {

  return (
    <>
      <Navbar>
        <AdminProductListFilter />
      </Navbar>
      <CartList />
    </>
  )
}

export default AdminHome