import {React,useState,useEffect} from 'react'
import {useParams} from 'react-router-dom'
import { AiOutlineMinus,AiOutlinePlus,AiFillStar,AiOutlineStar } from "react-icons/ai";
import {Product} from '.'
import {useStateContext} from '../context/StateContext';
const ProductDetails = () => {

//Get the product by id
    const params = useParams();
    const prodid = params.prodid;
    const [product, setProduct] = useState([]);
    const [Allproducts, setallproducts] = useState([]);
    const [index,setimgUrl]= useState(0);
    const {minus,plus,qty,onAdd,buttonClicked, clickhandel} =useStateContext();
    useEffect(() => {
      fetch('http://localhost:8080/product/' + prodid)
        .then(res => res.json())
        .then(prod => {
          setProduct(prod.product);
          
        });
    },[prodid]);
  
    console.log(product);
//Get the array of imagesUrl 
    const imgarr = product.imgUrl;

//Get all the products
    const allproducts = () => {
        return fetch('http://localhost:8080/products')
          .then(res => res.json())
          .then(products => {
            setallproducts(products.products);
          });
      };  
    useEffect(()=>{
    allproducts()
    },[]);

    return (
      <div>
        <div className='product-detail-container'>
          <div>
            <div className='image-container'>
              <img src={'http://localhost:8080/'+imgarr?.[index]} alt={product.name}
              className='product-detail-image' />
            </div>
            <div className='small-images-container'>
            {imgarr?.map((item,i)=>
            (
                <img src={'http://localhost:8080/'+item}
                   className={i=== index ? 'small-image selected-image' : 'small-image'}
                   onMouseEnter={()=>setimgUrl(i)} 
                />
            ))}
            </div>
          </div>
          <div className='product-detail-desc'>
            <h1>{product.name}</h1>
            <div className='reviews'>
              <div>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiOutlineStar/>
              </div>
              <p>
                (20)
              </p>
            </div>
            <h4>Details:</h4>
            <p>{product.details}</p>
            <p className='price'>${product.price}</p>
            <div className='quantity'>
              <h3>Quantity:</h3>
              <p className='quantity-desc'>
                <span className='minus' onClick={minus}><AiOutlineMinus/></span>
                <span className='num' onClick="">{qty}</span>
                <span className='plus' onClick={plus}><AiOutlinePlus/></span>
              </p>
            </div>
            <div className='buttons'>
              <button type="button" className='add-to-cart' onClick={()=> {onAdd(product,qty);clickhandel()}}>Add to Cart</button>
              <button type="button" className='buy-now' onClick="">Buy Now</button>
            </div>
          </div>
        </div>
        <div className='maylike-products-wrapper'>
            <h2>You may also like</h2>
            <div className='marquee'>
                <div className='maylike-products-container track'>
                
                    {Allproducts.map((prod)=>{
                        return <Product key={prod._id} product={prod}/>
                    })}
                
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default ProductDetails;