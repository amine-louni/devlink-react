import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOGOUT,
  UPDATE_USER,
  UPDATE_PASSWORD,
  RESET_PASSWORD,
  BOOKMARK_POST,
  UNBOOKMARK_POST,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuth: null,
  loading: true,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case USER_LOADED:
      return {
        ...state,
        isAuth: true,
        loading: false,
        user: action.payload.data,
      };
    case BOOKMARK_POST:
    case UNBOOKMARK_POST:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
    case UPDATE_PASSWORD:
    case RESET_PASSWORD:
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuth: true,
        loading: false,
      };
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case REGISTER_FAIL:
    case LOGIN_FAIL:
    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');

      return {
        ...state,
        token: null,
        isAuth: false,
        loading: false,
      };
    default:
      return state;
  }
}
