import React , {createContext,useContext,useState,useEffect} from 'react';
const Context = createContext();
export const StateContext = ({children})=>{
const [showCart,setShowCart]=useState(false);
const [cartItems,setCartItems]=useState([]);
const [totalPrice,setTotalPrice]=useState(0);
const [totalQuantity,setTotalQuantity]=useState(0);
const [qty,setQty] = useState(1);
const [buttonClicked, setButtonClicked] = useState(false);


let foundProduct;
let index;
const onAdd = async (product,quantity)=>{
    await fetch('http://localhost:8080/addcart/'+product._id,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
    body:JSON.stringify({
        quantity:quantity
    })}).then(res=>res.json()).then(resData=>{
        
        console.log(resData.cart.items)
        
    })
    

      

    
    /*
    const checkProductInCart = cartItems.find((item)=>item._id === product._id);        
    setTotalPrice((prevTotalPrice)=>prevTotalPrice+(quantity*product.price));
    setTotalQuantity((prevTotalQty)=>prevTotalQty+quantity);
    if(checkProductInCart){

        const updatedCartItems = cartItems.map((carProduct)=>{
            if (carProduct._id === product._id){
                return {
                    ...carProduct,
                    quantity: carProduct.quantity+quantity
                }
            }
        })
        setCartItems(updatedCartItems);
    }
    else{
       product.quantity =  quantity;
       setCartItems([...cartItems,{...product}])
    }
    */
}
console.log(cartItems)


const onRemove = async(id)=>{
    await fetch('http://localhost:8080/delete/'+id,{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json'
        }  
    }).then(res=>res.json()).then(cartitem=>console.log(cartitem))
}



const toggleCartItemQuanitity =async (id,value)=>{
   await fetch('http://localhost:8080/update/'+id,{
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            value: value
          })  
    }).then(res=>res.json()).then(cartitem=>console.log(cartitem));
    /*
    foundProduct = cartItems.find((item)=> item._id === id);
    index = cartItems.findIndex((product)=>product._id === id);
    const filterCartItems = cartItems.filter((item)=>item._id !==id)
    if(value ==='inc'){
        
        let newCartItems = [...filterCartItems,{...foundProduct,quantity:foundProduct.quantity+1}]
        
        setCartItems(newCartItems)
        setTotalPrice((prevTotalPrice)=>prevTotalPrice+foundProduct.price)
        setTotalQuantity((prevTotalQty)=>prevTotalQty+1)
        
    }else if(value==='dec'){
        if(foundProduct.quantity >1){
        let newCartItems = [...filterCartItems,{...foundProduct,quantity:foundProduct.quantity-1}]
        
        setCartItems(newCartItems)
        setTotalPrice((prevTotalPrice)=>prevTotalPrice-foundProduct.price)
        setTotalQuantity((prevTotalQty)=>prevTotalQty-1)
        }
    }*/
}

const clickhandel=async()=>{
   await setButtonClicked(true);
    setButtonClicked(false);
}
const plus = ()=>{
    setQty((prevQty)=>prevQty+1);
}
const minus = ()=>{
    setQty((prevQty)=>{
        if(prevQty-1<=0){
            return 1; 
        }
        else{
            return prevQty-1;
        }
    })
}

return (
    <Context.Provider value={{
        showCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        buttonClicked, 
        clickhandel,
        setShowCart,
        plus,
        minus,
        onAdd,
        toggleCartItemQuanitity,
        onRemove
    }}>
    {children}
    </Context.Provider>
)
}
export const useStateContext = ()=>useContext(Context);