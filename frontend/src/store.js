import {
  createStore, combineReducers, applyMiddleware, compose,
} from 'redux';
import thunk from 'redux-thunk';
import Cookies from 'js-cookie';
import { categoryListReducer } from './reducers/categoryReducers';
import { productListReducer, productDetailsReducer } from './reducers/productReducers';
import { cartReducer } from './reducers/cartRedcuers';
import { userSigninReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';

const reducers = combineReducers({
  cart: cartReducer,
  productList: productListReducer,
  categoryList: categoryListReducer,
  productDetails: productDetailsReducer,
  userSignin: userSigninReducer,
  userRegister: userRegisterReducer,
  userUpdate: userUpdateReducer,
});
const initialState = {
  cart: {
    cartItems: Cookies.getJSON('cartItems') || [],
    shipping: { address: '1911, Sherbrooke', city: 'Montreal', country: 'Canada' },
    payment: { paymentMethod: 'paypal' },
  },
  userSignin: { userInfo: Cookies.getJSON('userInfo') },
};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;
