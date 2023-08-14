import React from "react";
import './navbar.css';
import { useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import './cart.css';
import Navbar from "./navbar";
import { useDispatch } from 'react-redux';
import { remove } from "../store/cartsSlice";

function Cart() {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    const products=useSelector(state=>state.cart);
    console.log('productsssssss=>',products)
    const  handleRemove=(productID)=>{
        console.log('productttttttttttt',productID)
        dispatch(remove(productID))
     }
   return (
        <div>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
               <Navbar />
             </div>
             <div className="cartWrapper">{
                    products.map((product) => (
                       <div className='cartCard'>
                           <img src={product.image}/>
                           <div className="itemss">
                           <h3>{product.title}</h3>
                           <h3>{product.price}</h3>
                           <button className="btn1" onClick={()=>handleRemove(product.id)}>Remove</button>
                           <button className="btn1">Buy Now</button>
                           </div>
                       </div>
                    ))}
             </div>
        </div>
   );
}
export default Cart;


