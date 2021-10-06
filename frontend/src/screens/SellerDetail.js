import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom'
import { detailsProduct } from '../Actions/productActions';
function ProductScreen(props){

    const dispatch = useDispatch();
  const productId = props.match.params.id;
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);


    return  <div>
     {loading ? "Loading..." : error ? "  Error occur  "  :
    <div>
        <div>
       <Link to="/" className="backToHome">Back To HomeScreen</Link>
       </div>
    <div className="products-body">
           <div className="product-detail">
           <div>Seller's Name: <strong>{product.sellerName}</strong></div>
           <div>Mobile Number: <strong>{product.phNumber}</strong></div>
           <div>Pin code: <strong>{product.pincode}</strong></div>
                      
           </div>
    </div>
    </div>
}

    </div>
}
export default ProductScreen;