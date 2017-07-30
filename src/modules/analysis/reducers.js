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
    case Actions.AddToAnalysisRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case Actions.AddToAnalysisRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in adding analysis.',
      });
    }
    case Actions.AddToAnalysisFulfilled: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Added analysis.'
      });
      newState.analysis = newState.analysis || [];
      newState.analysis = newState.analysis.slice();
      newState.analysis.push(action.analysis);
      return newState;
    }
    case Actions.AnalysisAdded: {
      const newState = Object.assign({}, state);
      newState.analysis = newState.analysis || [];
      newState.analysis = newState.analysis.slice();
      newState.analysis.push(action.analysis);
      return newState;
    }
    default:
      return state;
  }
};