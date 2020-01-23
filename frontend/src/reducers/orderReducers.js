import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL,
  ORDER_DETAILS_REQUEST, ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
  MY_ORDER_LIST_REQUEST, MY_ORDER_LIST_SUCCESS, MY_ORDER_LIST_FAIL,
  ORDER_UPDATE_REQUEST, ORDER_UPDATE_SUCCESS, ORDER_UPDATE_FAIL,
  ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
} from '../constants/orderConstants';

function orderListReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function myOrderListReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case MY_ORDER_LIST_REQUEST:
      return { loading: true };
    case MY_ORDER_LIST_SUCCESS:
      return { loading: false, orders: action.payload };
    case MY_ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderSaveReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderDeleteReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_DELETE_REQUEST:
      return { loading: true };
    case ORDER_DELETE_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case ORDER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderCreateReducer(state = { orderItems: [] }, action) {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return { loading: true };
    case ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, data: action.payload };
    case ORDER_CREATE_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

function orderDetailsReducer(state = {
  order: {
    orderItems: [],
    shipping: {},
    payment: {},
  },
}, action) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export {
  orderCreateReducer, orderDetailsReducer, orderListReducer, myOrderListReducer,
  orderDeleteReducer, orderSaveReducer,
};
