import React, { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../Actions/productActions';

export default function HomeScreen() {
 const productList =useSelector(state =>state.productList);
 const dispatch =useDispatch();
 const {loading,error,products}=productList;
  useEffect(()=>{
   dispatch(listProducts());
  },[]);
  return (
    loading?"Loading...":error?"<h2>error occur<h2>":
    <div>
      <div className="row center">
        {products.map((product) =>
        <div key={product._id} className="card">
        <Link to={`/product/${product._id}`}>
          <img className="medium" src={product.image} alt={product.name} />
        </Link>
        <div className="card-body">
          <Link to={`/product/${product._id}`}>
            <h2>{product.name}</h2>
            <h2>{product.publisher}</h2>
          </Link>
          <div className="price">Rs {product.price}</div>
        </div>
      </div>
        )}
      </div>
    </div>
  );
}