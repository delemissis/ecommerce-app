import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import {
  productListReducer, productDetailsReducer, productSaveReducer,
  productDeleteReducer, productCategoryListReducer, productReviewSaveReducer,
} from './reducers/productReducers';
import { cartReducer } from './reducers/cartRedcuers';
import {
  orderCreateReducer, orderDetailsReducer, orderListReducer, myOrderListReducer,
  orderPayReducer, orderUpdateReducer, orderDeleteReducer, orderDeliverReducer,
} from './reducers/orderReducers';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';

const reducers = combineReducers({
  cart: cartReducer,
  myOrderList: myOrderListReducer,
  orderList: orderListReducer,
  orderUpdate: orderUpdateReducer,
  orderPay: orderPayReducer,
  orderDetails: orderDetailsReducer,
  orderCreate: orderCreateReducer,
  orderDelete: orderDeleteReducer,
  orderDeliver: orderDeliverReducer,
  productList: productListReducer,
  productSave: productSaveReducer,
  productReviewSave: productReviewSaveReducer,
  productDelete: productDeleteReducer,
  productCategoryList: productCategoryListReducer,
  productDetails: productDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
});
const initialState = {
  cart: {
    cartItems: Cookies.getJSON('cartItems') || [],
    shipping: {
      address: '1911, Sherbrooke', city: 'Montreal', country: 'Canada', postalCode: 'H2X1C4',
    },
    payment: { paymentMethod: 'paypal' },
  },
  userSignin: { userInfo: Cookies.getJSON('userInfo') },
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
