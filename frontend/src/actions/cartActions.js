import Cookies from 'js-cookie';
import axios from 'axios';
import { CART_ADD_ITEM, CART_REMOVE_ITEM } from '../constants/cartConstants';

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

export { addToCart, removeFromCart };
