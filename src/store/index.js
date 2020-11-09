import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import rootReducers from '../reducers';

const initialState = {};
const middlewares = [thunk];
export default createStore(
  rootReducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);
