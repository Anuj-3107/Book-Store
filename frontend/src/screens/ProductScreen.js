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
  const addTowishListHandler = () => {
    props.history.push(`/wishList/${productId}`);
  };


    return  <div>
     {loading ? "Loading..." : error ? "  Error occur  "  :
    <div>
        <div>
       <Link to="/" className="backToHome">Back To HomeScreen</Link>
       </div>
    <div className="products-body">
           <div><img src={product.image} alt={product.name}/></div>
           <div className="product-detail">
           <div>Book Name: <strong>{product.name}</strong></div>
           <div>Publisher: <strong>{product.publisher}</strong></div>
           <div>Price:<strong>{product.price}</strong></div>
           <Link to={`/sellersDetail/${product._id}`}><button  className="primary block">Seller's detail</button></Link>
                       
                        <button
                          onClick={addTowishListHandler}
                          className="primary block"
                        >
                          Add to wishList
                        </button>
                      
           </div>
    </div>
    </div>
}

    </div>
}
export default ProductScreen;