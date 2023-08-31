import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState,useEffect } from 'react';
import { Product,FooterBanner,HeroBanner } from '.'

function Home() {
    const [products,setProducts] = useState([]);
    const fetchProducts =()=>{
      fetch('http://localhost:8080/products')
      .then(res=>res.json())
      .then(prods => {
        let product=prods.products
        
        setProducts(product)
    
      })
    }
    useEffect(()=>{
      fetchProducts()
      
    },[])
  console.log(products)
    return (
        <>
        <HeroBanner/>
          <div className='products-heading'>
          <h2>Best Selling Products</h2>
          <p>Speakers of many variactions</p>
          </div>
          <div className='products-container'>
            {products.map((pro)=>{
              return <Product key ={pro._id} product={pro}/>
            })}
          </div>
          <FooterBanner/>
        </>
        
      )
}

export default Home;