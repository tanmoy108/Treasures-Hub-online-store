import React from 'react'
import Navbar from '../features/navbar/Navbar'
import AdminOrderList from '../features/admin/component/AdminOrderList'
const AdminOrderListPage = () => {
  return (
    <>
      <Navbar>
        <AdminOrderList />
      </Navbar>
    </>
  )
}

export default AdminOrderListPage