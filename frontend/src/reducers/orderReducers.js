import {
  ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL, ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS, ORDER_DETAILS_FAIL,
  ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL,
  ORDER_LIST_ADMIN_REQUEST, ORDER_LIST_ADMIN_SUCCESS, ORDER_LIST_ADMIN_FAIL, ORDER_SAVE_REQUEST, ORDER_SAVE_SUCCESS, ORDER_SAVE_FAIL, ORDER_DELETE_REQUEST, ORDER_DELETE_SUCCESS, ORDER_DELETE_FAIL,
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

function orderAdminListReducer(state = { orders: [] }, action) {
  switch (action.type) {
    case ORDER_LIST_ADMIN_REQUEST:
      return { loading: true };
    case ORDER_LIST_ADMIN_SUCCESS:
      return { loading: false, orders: action.payload };
    case ORDER_LIST_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    default: return state;
  }
}


function orderSaveReducer(state = {}, action) {
  switch (action.type) {
    case ORDER_SAVE_REQUEST:
      return { loading: true };
    case ORDER_SAVE_SUCCESS:
      return { loading: false, success: true, orders: action.payload };
    case ORDER_SAVE_FAIL:
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
  orderCreateReducer, orderDetailsReducer, orderListReducer, orderAdminListReducer,
  orderDeleteReducer, orderSaveReducer,
};
