import React from "react";
import './navbar.css';
import { useNavigate } from "react-router";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
function Navbar() {
    const naviget =useNavigate();
    const items=useSelector((state)=>state.cart);
    console.log('itessssssssss',items)


    const handlesubmit =() =>{
        naviget('/cart')
    }
    const handlehome =()=>{
      naviget('/')
    }
   return (
        <div className="navbar">
            <div style={{ display: "flex" }}>
                <h2 style={{ margin: 20 }}   onClick={handlehome}>Home</h2>
                <h2 style={{ margin: 20 }}   onClick={handlesubmit}> Your cart</h2>
                <h2 style={{ margin: 20 }}  >CART ITEMS:{items.length}</h2>
            </div>
        <h2>logOut</h2>
          </div>
    );
}
export default Navbar;
