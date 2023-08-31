import React,{useEffect, useRef} from 'react';
import {Link} from 'react-router-dom';
import { AiOutlineMinus,AiOutlinePlus,AiOutlineLeft,AiOutlineShopping } from 'react-icons/ai';
import {TiDeleteOutline} from 'react-icons/ti';
import { useStateContext } from '../context/StateContext';
const Cart = ({Cartdetails}) => {
  
 
  const cartRef = useRef();
  const {setShowCart,toggleCartItemQuanitity,onRemove,clickhandel} = useStateContext()
  
  
  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <button 
        type='button'
        className='cart-heading'
        onClick={()=>setShowCart(false)}>
          <AiOutlineLeft/>
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({Cartdetails.totalQty})</span>
        </button>
        {Cartdetails.items.length <1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150}/>
            
              <button type='button' onClick={()=>setShowCart(false)} className='btn'>
                Continue Shopping
              </button>
            
          </div>
        )} 
  
      <div className='product-container'>

      {Cartdetails.items.length>=1 && Cartdetails.items.map((cartItem)=>{
          return (<div className='product' key={cartItem?.productId._id}>
          
            <img src={'http://localhost:8080/'+cartItem?.productId.imgUrl[0]}
            className='cart-product-image' />
            <div className='item-desc'>
              <div className='flex top'>
                <h5>{cartItem?.productId.name}</h5>
                <h4>{cartItem?.productId.price}</h4>
              </div>
              <div className='flex bottom'>
                <div>
                  <p className='quantity-desc'>
                  <span className='minus' onClick={()=>{clickhandel();toggleCartItemQuanitity(cartItem._id,'dec');}}><AiOutlineMinus/></span>
                <span className='num' onClick="">{cartItem.quantity}</span>
                <span className='plus' onClick={()=>{toggleCartItemQuanitity(cartItem._id,'inc');clickhandel()}}><AiOutlinePlus/></span>
                  </p>
                </div>
                <button 
                type='button'
                className='remove-item'
                onClick={()=>{onRemove(cartItem?.productId._id);clickhandel()}}>
                  <TiDeleteOutline/>
                </button>
              </div>
            </div>
          </div>)
      })}
      </div>
      {Cartdetails.items.length >=1 && (
        <div className='cart-bottom'>
        <div className='total'>
          <h3>Subtotal:</h3>
          <h3>${Cartdetails.totalPrice}</h3>
        </div>
        <div className='btn-container'>
          <button type='button' className='btn' onClick=''>
            Pay With Stripe
          </button>
        </div>
        </div>
      )}
      </div>
    </div>
  )
  
}

export default Cart