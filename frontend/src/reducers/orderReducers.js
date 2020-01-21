import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
} from '../constants/orderConstants';

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

function orderDetailsReducer(state = { orderItems: [], shipping: {}, payment: {} }, action) {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        loading: true, orderItems: [], shipping: {}, payment: {},
      };
    case ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}

export { orderCreateReducer, orderDetailsReducer };
