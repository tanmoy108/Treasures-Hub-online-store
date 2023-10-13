import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminOrderList from '../features/admin/component/AdminOrderList'
import CartList from '../features/cartList/CartList'

const AdminOrderListPage = () => {
  return (
    <>
      <Navbar>
        <AdminOrderList />
      </Navbar>
      <CartList />
    </>
  )
}

export default AdminOrderListPage