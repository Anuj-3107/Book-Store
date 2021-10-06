import React from 'react';
import {BrowserRouter, Route, Link} from 'react-router-dom';
import ProductScreen from './screens/ProductScreen';
import HomeScreen from './screens/HomeScreen';
import SigninScreen from './screens/SigninScreen';
import WishListScreen from './screens/WishListScreen';
import {useDispatch, useSelector } from 'react-redux';
import { signout } from './Actions/userActions';
import RegisterScreen from './screens/registerScreen';
import ProfileScreen from './screens/ProfileScreen';
import ProductUploadScreen from './screens/ProductUploadScreen';
import SellerDetail from './screens/SellerDetail';

import PrivateRoute from './components/PrivateRoute';

function App() {
  const wishList = useSelector((state) => state.wishList);
  const { wishListItems } = wishList;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  const openMenu = () =>{
    document.querySelector(".sidemenu").classList.add('open');
  }
  const closeMenu = () =>{
    document.querySelector(".sidemenu").classList.remove('open');
  }
  return (
  <BrowserRouter>
    <div className="grid-container">
              <header className="row">
                <div>
                  <button onClick={openMenu} className="ham-button">
                    &#9776;
                  </button>
              
                  <Link className="brand" to="/">
                    Books Store
                  </Link>
                </div>
                <div className="wishList-button">
                 <Link to="/wishlist">Wishlist
                 {wishListItems.length > 0 && (
                <span className="badge">{wishListItems.length}</span>
              )}
                 </Link>
                 {userInfo ? (
              <div className="dropdown">
              <Link to="#">
                {userInfo.name} <i className="fa fa-caret-down"></i>{' '}
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="#signout" onClick={signoutHandler}>
                    Sign Out
                  </Link>
                </li>
                <li>
                    <Link to="/profile">User Profile</Link>
                  </li>
              </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
                </div>
              </header>

              <aside className = "sidemenu">
                <div className="sideMenuUp">
                 <ul>
                 <li> Book store </li>
                
                 </ul>
                </div>
                
                <div className="middle">
                <button className = "sidemenuCloseButton" onClick = {closeMenu}>X</button>
                  <ul>
                    <li className="asideItem">
                      <Link to="/productUpload" >Sell</Link>
                    </li>
                    <li className="asideItem">
                      <Link to="/signin"  >profile</Link>
                    </li>
                    <li className="asideItem">
                      <Link to="/signin"  >contact us</Link>
                    </li>
                    <li className="asideItem">
                      <Link to="/signin"  >help</Link>
                    </li>

                    <li className="asideItem">
                      <Link to="/" >About Us</Link>
                    </li>
                    <li className="asideItem">
                      <Link to="/" >log out</Link>
                    </li>
                    </ul>
                    </div>
                    <div className="sideMenuDown">
                    </div>
              </aside>
  

              <main>
                <Route path="/wishList/:id?" component={WishListScreen}></Route>
                <Route path="/signin" component={SigninScreen}></Route>
                <Route path="/" component={HomeScreen} exact={true} ></Route>
                <Route path="/product/:id" component={ProductScreen}></Route>
                <Route path="/register" component={RegisterScreen}></Route>
                <Route path="/productUpload" component={ProductUploadScreen}></Route>
                <Route path="/sellersDetail/:id" component={SellerDetail}></Route>
                <PrivateRoute path="/profile" component={ProfileScreen} ></PrivateRoute>
                
              </main>
              <footer className="row center">-All right reserved-</footer>
            </div>
  </BrowserRouter>
            
  );
}

export default App;
