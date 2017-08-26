import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { analysisReducer, swapFormReducer } from './analysis/reducers';

export default combineReducers({
  routing: routerReducer,
  analysis: analysisReducer,
  form: swapFormReducer
});