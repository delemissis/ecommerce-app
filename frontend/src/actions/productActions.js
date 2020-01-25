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
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
  PRODUCT_CATEGORY_LIST_REQUEST,
  PRODUCT_CATEGORY_LIST_SUCCESS,
  PRODUCT_CATEGORY_LIST_FAIL,
  PRODUCT_REVIEW_SAVE_REQUEST,
  PRODUCT_REVIEW_SAVE_SUCCESS,
  PRODUCT_REVIEW_SAVE_FAIL,
} from '../constants/productConstants';
import { getErrorMessage } from '../util';

const listProductCategories = () => async (dispatch) => {
  dispatch({ type: PRODUCT_CATEGORY_LIST_REQUEST, loading: true });
  try {
    const result = await axios.get('/api/products/categories');
    dispatch({ type: PRODUCT_CATEGORY_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: PRODUCT_CATEGORY_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

const listProducts = (category = '', searchKeyword = '', sortOrder = '') => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST, payload: { category, searchKeyword, sortOrder } });
  try {
    const result = await axios(`/api/products?category=${category}&search=${searchKeyword}&sort=${sortOrder}`);
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

const saveProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_SAVE_REQUEST, payload: product });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    if (product._id) {
      const { data: savedProduct } = await axios.put(`/api/products/${product._id}`, product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: savedProduct });
    } else {
      const { data: savedProduct } = await axios.post('/api/products', product, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: PRODUCT_SAVE_SUCCESS, payload: savedProduct });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_SAVE_FAIL, payload: getErrorMessage(error) });
  }
};

const saveProductReview = (productId, review) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_REVIEW_SAVE_REQUEST, payload: review });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: savedReview } = await axios.post(`/api/products/${productId}/reviews`, review, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PRODUCT_REVIEW_SAVE_SUCCESS, payload: savedReview });
  } catch (error) {
    dispatch({ type: PRODUCT_REVIEW_SAVE_FAIL, payload: getErrorMessage(error) });
  }
};

const deleteProduct = (product) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DELETE_REQUEST, payload: product });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: deletedProduct } = await axios.delete(`/api/products/${product._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: PRODUCT_DELETE_SUCCESS, payload: deletedProduct });
  } catch (error) {
    dispatch({ type: PRODUCT_DELETE_FAIL, payload: getErrorMessage(error) });
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

export {
  listProducts, detailsProduct, saveProduct, saveProductReview, deleteProduct, listProductCategories,
};
