import React from 'react'
import Navbar from '../features/navbar/Navbar'
import CartList from '../features/cartList/CartList'

const CartPage = () => {
  return (
   <>
   <Navbar>
    <CartList/>
   </Navbar>
   </>
  )
}

export default CartPage