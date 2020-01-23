import axios from 'axios';
import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
  ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
  ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_FAIL,
  ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL,
} from '../constants/orderConstants';
import { getErrorMessage } from '../util';

const createOrder = (data) => async (dispatch, getState) => {
  dispatch({ type: ORDER_CREATE_REQUEST });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: { data: order } } = await axios.post('/api/orders', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_CREATE_SUCCESS, payload: order });
  } catch (error) {
    dispatch({ type: ORDER_CREATE_FAIL, payload: getErrorMessage(error) });
  }
};

const updateOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_UPDATE_REQUEST, payload: order });
  try {
    const { userSignin: { userInfo: { token } } } = getState();

    const { data: updatedOrder } = await axios.put(`/api/orders/${order._id}`, order, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_UPDATE_SUCCESS, payload: updatedOrder });
  } catch (error) {
    dispatch({ type: ORDER_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
};

const payOrder = (order, paymentResult) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: paymentResult });
  try {
    const { userSignin: { userInfo: { token } } } = getState();

    const { data: paidOrder } = await axios.put(`/api/orders/${order._id}/pay`, paymentResult, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: paidOrder });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: getErrorMessage(error) });
  }
};

const deliverOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_PAY_REQUEST, payload: {} });
  try {
    const { userSignin: { userInfo: { token } } } = getState();

    const { data: paidOrder } = await axios.put(`/api/orders/${order._id}/deliver`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_PAY_SUCCESS, payload: paidOrder });
  } catch (error) {
    dispatch({ type: ORDER_PAY_FAIL, payload: getErrorMessage(error) });
  }
};

const deleteOrder = (order) => async (dispatch, getState) => {
  dispatch({ type: ORDER_DELETE_REQUEST, payload: order });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const { data: deletedOrder } = await axios.delete(`/api/orders/${order._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: ORDER_DELETE_SUCCESS, payload: deletedOrder });
  } catch (error) {
    dispatch({ type: ORDER_DELETE_FAIL, payload: getErrorMessage(error) });
  }
};


const detailsOrder = (orderId) => async (dispatch) => {
  try {
    dispatch({ type: ORDER_DETAILS_REQUEST, payload: orderId });
    const result = await axios(`/api/orders/${orderId}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: ORDER_DETAILS_FAIL, payload: getErrorMessage(error) });
  }
};

const listOrders = (category) => async (dispatch, getState) => {
  dispatch({ type: ORDER_LIST_REQUEST, payload: category });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const result = await axios('/api/orders', { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: ORDER_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: ORDER_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

const listMyOrders = () => async (dispatch, getState) => {
  dispatch({ type: MY_ORDER_LIST_REQUEST });
  try {
    const { userSignin: { userInfo: { token } } } = getState();
    const result = await axios('/api/orders/mine', { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: MY_ORDER_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: MY_ORDER_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

export {
  createOrder, detailsOrder, listOrders, listMyOrders,
  updateOrder, deleteOrder, payOrder, deliverOrder,
};
