import { profile as profileHttp } from '../http';
import { setAlert } from './alertHandler';

import {
  CREATE_INIT_PROFILE,
  GET_PROFILE,
  PROFILE_ERROR,
  ADD_EDUCATION,
  ADD_EXPERIENCE,
  DELETE_EXPERIENCE,
  PUT_EXPERIENCE,
  PUT_EDUCATION,
  DELETE_EDUCATION,
  UPDATE_PROFILE,
} from './types';

// Get current user profile
export const getCurrentUserProfile = () => async (dispatch) => {
  try {
    const res = await profileHttp.get('/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.message, status: 'error' },
    });
  }
};

// create initial profile
// POST  /users/:userId/profiles;
export const createInitialProfile = (body) => async (dispatch) => {
  try {
    //initial profile (empty)
    await profileHttp.post('/', body);

    dispatch({
      type: CREATE_INIT_PROFILE,
    });
    dispatch(setAlert('Profile created 🍸', 'success'));
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.data.message, status: 'error' },
    });
    dispatch(setAlert('Error on creating initial profile 🍸', 'error'));
  }
};

/// UPDATE my profile
// {{URL}}/profiles/update/5f4d2c71dfe1dc2a1063c305
export const updateMyProfile = (body, profileId) => async (dispatch) => {
  try {
    const res = await profileHttp.patch(`/update/${profileId}`, body);
    dispatch({ type: UPDATE_PROFILE, payload: res.data.doc });
    dispatch(setAlert('Profile updated 🍭', 'success'));
  } catch (err) {
    dispatch(setAlert('Error on updating profile 😿', 'error'));
  }
};

// Add experience to profile
// PATH /experience
export const addExp = (body) => async (dispatch) => {
  try {
    await profileHttp.patch('/experience', body);

    dispatch({ type: ADD_EXPERIENCE, payload: body });
    dispatch(
      setAlert('Experience has been added to your profile 🍭', 'success')
    );
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when adding an experience , please try again', 'error')
    );
  }
};

// PUT experience
//{{URL}}/profiles/experience/5f4d52669f30492b48263879
export const putExp = (id, body) => async (dispatch) => {
  try {
    await profileHttp.put(`/experience/${id}`, body);

    dispatch({ type: PUT_EXPERIENCE, payload: body });
    dispatch(setAlert('Experience has been updated  ', 'success'));
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when updating an experience , please try again', 'error')
    );
  }
};

// DELETE experience
//{{URL}}/profiles/experience/5f4d52669f30492b48263879
export const delExp = (id) => async (dispatch) => {
  try {
    await profileHttp.delete(`/experience/${id}`);

    dispatch({ type: DELETE_EXPERIENCE, payload: id });
    dispatch(
      setAlert('Experience has been removed from your profile 🍭', 'warning')
    );
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when removing an experience , please try again', 'error')
    );
  }
};

// Add education to profile
// PATCH /education
export const addEdu = (body) => async (dispatch) => {
  try {
    await profileHttp.patch('/education', body);

    dispatch({ type: ADD_EDUCATION, payload: body });
    dispatch(
      setAlert('Education has been added to your profile 🍭', 'success')
    );
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when adding an experience , please try again', 'error')
    );
  }
};
// PUT education
//{{URL}}/profiles/education/5f4d52669f30492b48263879
export const putEdu = (id, body) => async (dispatch) => {
  try {
    await profileHttp.put(`/education/${id}`, body);

    dispatch({ type: PUT_EDUCATION, payload: body });
    dispatch(setAlert('Education has been updated  ', 'success'));
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when updating an education , please try again', 'error')
    );
  }
};

// DELETE education
//{{URL}}/profiles/education/5f4d52669f30492b48263879
export const delEdu = (id) => async (dispatch) => {
  try {
    await profileHttp.delete(`/education/${id}`);

    dispatch({ type: DELETE_EDUCATION, payload: id });
    dispatch(
      setAlert('education has been removed from your profile 🍭', 'warning')
    );
  } catch (err) {
    console.log(err);
    dispatch(
      setAlert('Error when removing an experience , please try again', 'error')
    );
  }
};
