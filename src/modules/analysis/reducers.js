import Actions from './actions';


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
      const results = action.results;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got analysis results.',
        results: results
      });
      return newState;

    case Actions.MoreResults:
      return Object.assign({}, state, {
        resultsCount: state.resultsCount + 5
      });
    default:
      return state;
  }
};
