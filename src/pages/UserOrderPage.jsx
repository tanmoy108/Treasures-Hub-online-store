import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrder from '../features/user/components/UserOrder'
import CartList from '../features/cartList/CartList'

const UserOrderPage = () => {
  return (
    <>
    <Navbar>
        <UserOrder/>
    </Navbar>
    <CartList />
    </>
  )
}

export default UserOrderPage