import Cookies from 'js-cookie';
import axios from 'axios';
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
} from '../constants/orderConstants';
import { CART_EMPTY_ITEMS } from '../constants/cartConstants';
import { getErrorMessage } from '../util';

const createOrder = (data) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: order } = await axios.post('/api/orders', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: order });
    dispatch({ type: CART_EMPTY_ITEMS });
    Cookies.remove('cartItems');
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: getErrorMessage(error) });
  }
};


export {
  createOrder,
};
