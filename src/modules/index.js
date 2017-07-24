import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { analysisReducer } from './analysis';

export default combineReducers({
  routing: routerReducer,
  analysis: analysisReducer
});