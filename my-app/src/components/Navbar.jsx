import {React,useState,useEffect} from 'react';
import { AiOutlineShopping } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import {Cart} from '.'
import { useStateContext } from '../context/StateContext';
const Navbar = () => {
  const {showCart,setShowCart,totalQuantity,buttonClicked, setButtonClicked} = useStateContext();
  const [cartItems,setCartItems]=useState([]);
  const [qty,setqty]=useState();
  console.log(buttonClicked)
  const fetchCart =()=>{
    fetch('http://localhost:8080/cart')
  .then(res=>res.json())
  .then(cartItems=>
      {
      setCartItems(cartItems.cart)
      setqty(cartItems.cart.totalQty);
      console.log(cartItems)
  });
}
useEffect(()=>{
  fetchCart()
},[buttonClicked])


  return (
    <div className='navbar-container'>
      <p className='logo'>
      </p>
      <button type='button' className='cart-icon' onClick={()=>{
        setShowCart(true);
      }}>
        <AiOutlineShopping/>
        <span className='cart-item-qty'>{qty}</span>
      </button>
      {showCart && <Cart Cartdetails={cartItems}/>}
    </div>
  )
}

export default Navbar