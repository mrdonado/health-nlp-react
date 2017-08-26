import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { analysisReducer, showFormReducer } from './analysis/reducers';

export default combineReducers({
  routing: routerReducer,
  analysis: analysisReducer,
  form: showFormReducer
});