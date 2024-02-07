import React from 'react'
import Topbar from '../components/topbar/Topbar'
import Products from "../components/Products/Products";

const Product = () => {
  return (
    <>
      <Topbar />
      <Products product={true} />
    </>
  )
}

export default Product