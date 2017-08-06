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

export const analysisReducer = (state = { resultsCount: 5 }, action) => {
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
      const newResults = action.results;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got analysis results.',
        results: combineResults(state.results, newResults)
      });
      return newState;

    case Actions.AnalysisAdded:
      return Object.assign({}, state, {
        inProgress: false,
        success: 'Got a new analysis.',
        results: [action.analysis, ...state.results],
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
