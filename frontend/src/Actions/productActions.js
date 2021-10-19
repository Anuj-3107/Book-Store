import { PRODUCT_DETAILS_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS, 
   PRODUCT_UPLOAD_FAIL,
  PRODUCT_UPLOAD_REQUEST,
   PRODUCT_UPLOAD_RESET,
   PRODUCT_UPLOAD_SUCCESS } from "../constants/productConstants"
import Axios from 'axios';
export const listProducts=()=>async(dispatch)=>{

    dispatch({type:PRODUCT_LIST_REQUEST});
    try {
        const {data} =await Axios.get('/api/products');
        dispatch({type:PRODUCT_LIST_SUCCESS,payload:data});

    } catch (error) {
        dispatch({type:PRODUCT_LIST_FAIL,payload:error.message});
    }
}
 
export const detailsProduct = (productId) => async (dispatch) => {
    dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
    try {
      const { data } = await Axios.get(`/api/products/${productId}`);
      dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: PRODUCT_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const uploadProduct = (product) => async (dispatch, getState) => {
    dispatch({ type: PRODUCT_UPLOAD_REQUEST});
    const {userSignin: {userInfo} } = getState();
    const email= userInfo.email;
    product.append('sellerEmail', email);
    try {
      const { data } = await Axios.post('/api/products/uploadProducts', product,
      {
        'content-type':'multipart/form-data',
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: PRODUCT_UPLOAD_SUCCESS, payload: data.product });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: PRODUCT_UPLOAD_FAIL, payload: message });
    }
  };
  