import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { analysisReducer, swapFormReducer } from './analysis/reducers';
import { statsReducer } from './stats/reducers';

export default combineReducers({
  routing: routerReducer,
  analysis: analysisReducer,
  stats: statsReducer,
  form: reduxFormReducer,
  formWindow: swapFormReducer
});