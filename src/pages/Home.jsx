import React from 'react'
import Navbar from '../features/navbar/Navbar'
import ProductListFilter from '../features/productList/component/ProductFilter'
import Footer from './Footer'

const Home = () => {

  return (
    <>
      <Navbar>
        <ProductListFilter />
      </Navbar>
      <Footer/>
    </>
  )
}

export default Home