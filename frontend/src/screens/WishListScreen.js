import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToWishList, removeFromWishList } from '../Actions/wishListActions';
export default function WishListScreen(props) {
    const productId = props.match.params.id;
    const wishList = useSelector((state) => state.wishList);
    const { wishListItems } = wishList;
    const dispatch = useDispatch();
    useEffect(() => {
      if (productId) {
        dispatch(addToWishList(productId));
      }
    }, [dispatch, productId]);
    const removeFromWishListHandler = (id) => {
        // delete action
        dispatch(removeFromWishList(id));
      };
      return (
        <div className="row top">
          <div className="col-2">
            <h1>YOUR WISHLIST</h1>
            {wishListItems.length === 0 ? (
              <div>
                WishList is empty. <Link to="/">Go Shopping</Link>
              </div>
            ) : (
              <ul className="ul-list">
                {wishListItems.map((item) => (
                  <li key={item.product}>
                    <div className="row">
                      <div>
                      <Link to={`/product/${item.product}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="small"
                        ></img>
                        </Link>
                      </div>
                      <div className="min-30">
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </div>
                      <div className="wishList-button">
                        <button
                          type="button" className="primary"
                          onClick={() => removeFromWishListHandler(item.product)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      );
    }