import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { analysisReducer, swapFormReducer } from './analysis/reducers';

export default combineReducers({
  routing: routerReducer,
  analysis: analysisReducer,
  form: reduxFormReducer,
  formWindow: swapFormReducer
});