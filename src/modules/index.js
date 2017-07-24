import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { analysisReducer } from './analysis';
import counter from './counter';

export default combineReducers({
  routing: routerReducer,
  analysis: analysisReducer,
  counter
});