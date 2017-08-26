import Actions from './actions';
import * as R from 'ramda';

const combineResults = (results = [], newResults = []) => {
  const cResults = [...results];
  const existingIds = R.groupBy(o => o.id)(results);
  newResults.forEach(result => {
    if (typeof existingIds[result.id] === 'undefined') {
      cResults.push(result);
    }
  });
  return cResults;
};

const swapFormReducer = (state = { showForm: false }, action) => {
  if (action.type === Actions.SwapForm) {
    return Object.assign({}, state, { showForm: !state.showForm });
  }
  return state;
};

const analysisReducer = (state = { resultsCount: 5 }, action) => {
  let newResults, newState;

  switch (action.type) {

    case Actions.GetAnalysisRequested:
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });

    case Actions.GetAnalysisRejected:
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error while getting analysis.',
      });

    case Actions.GetAnalysisFulfilled:
      newResults = action.results;
      newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got analysis results.',
        results: combineResults(state.results, newResults)
      });
      return newState;

    case Actions.AnalysisAdded:
      let existingAnalysis = state.results.find(r => r.id === action.analysis.id);
      if (existingAnalysis) {
        newResults = [...state.results];
      } else {
        newResults = [action.analysis, ...state.results];
      }
      return Object.assign({}, state, {
        inProgress: false,
        success: 'Got a new analysis.',
        results: newResults,
        resultsCount: state.resultsCount + 1
      });

    case Actions.MoreResults:
      return Object.assign({}, state, {
        resultsCount: state.resultsCount + 5
      });
    default:
      return state;
  }
};

export { analysisReducer, swapFormReducer };