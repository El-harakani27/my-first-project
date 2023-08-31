import {React,useState,useEffect} from 'react'
import { Link,BrowserRouter } from 'react-router-dom';
const Product = ({product}) => {
  
    const currentUrl = window.location.pathname + window.location.search;
    console.log(currentUrl)

  return (
    
    <div>
     <Link to={`/product/${product._id}`} >
      <div className='product-card'>
        <img 
          src={'http://localhost:8080/'+product.imgUrl[0]}
            className='product-image'
            width={255}
            height={255}
          />
          <p className='product-name'>{product.name}</p>
          <p className='product-price'>${product.price}</p>
      </div>
     </Link>
   
    </div>
  )

}

export default Product
