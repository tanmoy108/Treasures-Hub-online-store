import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductList from '../features/productList/component/ProductList'
import ProductListFilter from '../features/productList/ProductListFilter'
import CartList from '../features/cartList/CartList'

const Home = () => {
  return (
    <>
    <Navbar>
        <ProductListFilter/>
    </Navbar>
    <CartList/>
    </>
  )
}

export default Home