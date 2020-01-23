import Axios from 'axios';
import Cookies from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS, USER_SIGNIN_FAIL,
  USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT,
  USER_UPDATE_FAIL, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS,
} from '../constants/userConstants';
import { getErrorMessage } from '../util';

const signin = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_SIGNIN_REQUEST });
    const result = await Axios.post('/api/users/signin', { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: result.data });
    Cookies.set('userInfo', JSON.stringify(result.data));
  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: getErrorMessage(error) });
  }
};

const update = (userId, name, email, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });
    const { userSignin: { userInfo: { token } } } = getState();

    const result = await Axios.put(`/api/users/${userId}`, { name, email, password }, {
      headers: {
        Authorization: `Bearer ${token}`, 
      },
    });
    dispatch({ type: USER_UPDATE_SUCCESS, payload: result.data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: result.data });
    Cookies.set('userInfo', JSON.stringify(result.data));
  } catch (error) {
    dispatch({ type: USER_UPDATE_FAIL, payload: getErrorMessage(error) });
  }
};

const logout = () => (dispatch) => {
  Cookies.remove('userInfo');
  dispatch({ type: USER_LOGOUT });
};

const register = (name, email, password, repassword) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST });
    if (password !== repassword) {
      dispatch({ type: USER_REGISTER_FAIL, payload: 'Password and Re-enter Password are not equal!' });
    }
    const result = await Axios.post('/api/users/register', { name, email, password });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: result.data });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: result.data });
    Cookies.set('userInfo', JSON.stringify(result.data));
  } catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: getErrorMessage(error) });
  }
};
export {
  signin, register, logout, update,
};
