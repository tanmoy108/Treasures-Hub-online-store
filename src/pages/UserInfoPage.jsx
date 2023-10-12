import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserProfile from '../features/user/components/UserProfile'
import CartList from '../features/cartList/CartList'

const UserInfoPage = () => {
  return (
    <>
    <Navbar>
        <UserProfile/>
    </Navbar>
    <CartList />
    </>
  )
}

export default UserInfoPage