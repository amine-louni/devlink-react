import { user as userHttp } from '../http';
import { setAlert } from './alertHandler';
import { BOOKMARK_POST, UNBOOKMARK_POST } from './types';

// Bookmark an article
//[PATCH] {{URL}}/users/update-me
export const bookPost = (id) => async (dispatch) => {
  try {
    //'/reading-list/:postId'
    const res = await userHttp.patch(`/reading-list/${id}`);

    dispatch({
      type: BOOKMARK_POST,
      payload: res.data.doc,
    });
    dispatch(setAlert('Bookmarked 🔖', 'success'));
  } catch (err) {
    console.log(err);
    // dispatch(setAlert(`Ops! 😣 , ${err.response.data.message}`, 'error'));
  }
};

export const unBookPost = (id) => async (dispatch) => {
  try {
    //'/reading-list/:postId'

    const res = await userHttp.delete(`/reading-list/${id}`);

    dispatch({
      type: UNBOOKMARK_POST,
      payload: res.data.doc,
    });
    dispatch(setAlert('Article remove from reading list', 'success'));
  } catch (err) {
    console.log(err);
    //   dispatch(setAlert(`Ops! 😣 , ${err.response.data.message}`, 'error'));
  }
};
