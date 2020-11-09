import { combineReducers } from 'redux';
import theme from './themeReducer';
import sideBar from './sideBarReducer';
import alert from './alertReducer';
import isAuth from './authReducer';
import profile from './profileReducer';

export default combineReducers({
  isDark: theme,
  isMainSideBarOpen: sideBar,
  alert,
  auth: isAuth,
  userProfile: profile,
});
