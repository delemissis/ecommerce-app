import axios from 'axios';
import {
  CATEGORY_LIST_REQUEST,
  CATEGORY_LIST_SUCCESS,
  CATEGORY_LIST_FAIL,
} from '../constants/categoryConstants';
import { getErrorMessage } from '../util';

const listCategories = () => async (dispatch) => {
  dispatch({ type: CATEGORY_LIST_REQUEST, loading: true });
  try {
    const result = await axios.get('/api/categories');
    dispatch({ type: CATEGORY_LIST_SUCCESS, payload: result.data });
  } catch (error) {
    dispatch({ type: CATEGORY_LIST_FAIL, payload: getErrorMessage(error) });
  }
};

export { listCategories };
