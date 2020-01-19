import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_SAVE_REQUEST,
  PRODUCT_SAVE_SUCCESS,
  PRODUCT_SAVE_FAIL,
} from '../constants/productConstants';
import { getErrorMessage } from '../util';

const listProducts = (category) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST, payload: category });
  try {
    const result = await axios(`/api/products${category ? `?category=${category}` : ''}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_SAVE_REQUEST });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: savedProduct } = await axios.post('/api/products', product, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: savedProduct });
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: getErrorMessage(error) });
  }
};


const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const result = await axios(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: getErrorMessage(error) });
  }
};

export { listProducts, detailsProduct, saveProduct };
