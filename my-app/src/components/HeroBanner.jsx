import React from 'react';
import { Link,BrowserRouter } from 'react-router-dom';
import { useState,useEffect } from 'react';
const HeroBanner = () => {
  const [banner,setbanner]= useState([]);
  const fetchbanner = ()=>{
    fetch('http://localhost:8080')
    .then(res=>res.json())
    .then(data=>{
      
      setbanner(data.banner[0]);
    
    })
  }
  useEffect(()=>{
    fetchbanner()
    console.log(banner)
  },'')
  
      return (
        
    <div className='hero-banner-container'>

        <div> 
        <p className = "beats-solo">{banner.smallText}</p>
        <h3>{banner.MidText}</h3>
        <img src={"http://localhost:8080/"+banner.imgUrl} alt="headphones"
            className='hero-banner-image'
        />
        <div>
    <div>
    
  <Link to="/home"><button type='button'>{banner.buttonText}</button></Link>

    
            <div className='desc'>
                <h5>Description</h5>
                <p>{banner.Desc}</p>
            </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default HeroBanner