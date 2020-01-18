import Cookies from 'js-cookie';
import axios from 'axios';
import {
  CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING, CART_SAVE_PAYMENT,
} from '../constants/cartConstants';

const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data: product } = await axios.get(`/api/products/${productId}`);
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      _id: product._id,
      image: product.image,
      name: product.name,
      price: product.price,
      countInStock: product.countInStock,
      qty,
    },
  });
  const { cart: { cartItems } } = getState();
  Cookies.set('cartItems', JSON.stringify(cartItems));
};

const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: productId,
  });
  const { cart: { cartItems } } = getState();
  Cookies.set('cartItems', JSON.stringify(cartItems));
};

const saveShipping = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING, payload: data });
};

const savePayment = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT, payload: data });
};

export {
  addToCart, removeFromCart, saveShipping, savePayment,
};
