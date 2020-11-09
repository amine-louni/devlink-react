import axios from 'axios';
import { auth, profile, user, post } from '../http';

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    auth.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    profile.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    user.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    post.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export default setAuthToken;
