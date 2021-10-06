import { PRODUCT_DETAILS_FAIL,
   PRODUCT_DETAILS_REQUEST,
   PRODUCT_DETAILS_SUCCESS,
   PRODUCT_LIST_FAIL,
   PRODUCT_LIST_REQUEST,
   PRODUCT_LIST_SUCCESS, 
   PRODUCT_UPLOAD_FAIL,
  PRODUCT_UPLOAD_REQUEST,
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
 
export const createProduct = ({name,image,price,publisher,description,sellerName,phNumber,pinCode}) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_UPLOAD_REQUEST});
  try {
    const { data } = await Axios.post('/api/products/createProducts', {name,image,price,publisher,description,sellerName,phNumber,pinCode});
    dispatch({ type: PRODUCT_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_UPLOAD_FAIL, error: message });
  }
};

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
