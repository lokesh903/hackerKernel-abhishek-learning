import React, { useEffect, useState } from 'react';
import './home.css';
import Navbar from './navbar';
import {add} from '../store/cartsSlice';
import { fetchProduct  } from '../store/productSlice';
import { useDispatch, useSelector } from 'react-redux';
import { STATUSES } from '../store/productSlice';
function Home() {
  //  const [products, setProducts] = useState([]);
   const dispatch=useDispatch();
   const {data :products,status}=useSelector((state)=>state.product)
   useEffect(() => {

    const fetchProducts = async () => {
      dispatch(fetchProduct());
      };
     fetchProducts();
  }, []);

  const handleAdd = (product)=>{
      dispatch(add(product))
      alert('item add succefuully')
   }
   if(status===STATUSES.LOADING){
    return <h2>Loading.......</h2>;
   }
 return (
    <div>
      {/* Move the position style to the parent div */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0 }}>
        <Navbar />
      </div>
      <div className='body'>
        <div className='Heading'>
          <h1>Welcome to the Redux toolkit store</h1>
          <h2>Products</h2>
        </div>
        <div className='card-container'>
          {products.map((product) => (
            <div className='card' key={product.id}>
              <div className='image'>
                <img src={product.image} alt={product.title} />
              </div>
              <h3 className='description'>{product.title}</h3>
              <p className='price'>${product.price.toFixed(2)}</p>
              <button onClick={()=>handleAdd(product)} className='button'>Add to cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
