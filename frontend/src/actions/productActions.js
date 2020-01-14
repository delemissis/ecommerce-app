import axios from 'axios';
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
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


const detailsProduct = (productId) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAILS_REQUEST });
    const result = await axios(`/api/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAILS_FAIL, payload: getErrorMessage(error) });
  }
};

export { listProducts, detailsProduct };
