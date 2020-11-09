import { changeTheme } from './themeHandler';
import { ToggleSideBar } from './mainSideBarHandler';
import {
  register,
  login,
  logout,
  updateMe,
  updateMyPassword,
  forgotPassword,
  resetPassword,
} from './authHandler';
import { setAlert, removeAlert } from './alertHandler';
import {
  getCurrentUserProfile,
  updateMyProfile,
  addExp,
  delExp,
  putExp,
  addEdu,
  delEdu,
  putEdu,
} from './profileHandler';

import { bookPost, unBookPost } from './userHandler';
export {
  changeTheme,
  ToggleSideBar,
  setAlert,
  removeAlert,
  register,
  login,
  logout,
  getCurrentUserProfile,
  addExp,
  addEdu,
  delExp,
  putExp,
  delEdu,
  putEdu,
  updateMe,
  updateMyPassword,
  updateMyProfile,
  forgotPassword,
  resetPassword,
  bookPost,
  unBookPost,
};
