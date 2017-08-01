import Actions from './actions';


export const analysisReducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.GetAnalysisRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case Actions.GetAnalysisRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error while getting analysis.',
      });
    }
    case Actions.GetAnalysisFulfilled: {
      const analysis = action.analysis;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got analysis.',
        analysis: analysis
      });
      return newState;
    }
    default:
      return state;
  }
};
