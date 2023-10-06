import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductListFilter from '../features/productList/component/ProductFilter'
import CartList from '../features/cartList/CartList'

const Home = () => {

  return (
    <>
      <Navbar>
        <ProductListFilter />
      </Navbar>
      <CartList />
    </>
  )
}

export default Home