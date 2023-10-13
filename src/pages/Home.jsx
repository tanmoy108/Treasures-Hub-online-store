import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductListFilter from '../features/productList/component/ProductFilter'
import CartList from '../features/cartList/CartList'
import Footer from './Footer'

const Home = () => {

  return (
    <>
      <Navbar>
        <ProductListFilter />
      </Navbar>
      <CartList />
      <Footer/>
    </>
  )
}

export default Home