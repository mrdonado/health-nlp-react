import ActionTypes from '../constants/action-types';

export default function analysisReducer(state = {}, action) {
  switch (action.type) {
    case ActionTypes.GetAnalysisRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case ActionTypes.GetAnalysisRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in getting analysis.',
      });
    }
    case ActionTypes.GetAnalysisFulfilled: {
      const analysis = action.analysis;
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Got analysis.',
        analysis: analysis
      });
      return newState;
    }
    case ActionTypes.AddToAnalysisRequested: {
      return Object.assign({}, state, {
        inProgress: true,
        error: '',
        success: ''
      });
    }
    case ActionTypes.AddToAnalysisRejected: {
      return Object.assign({}, state, {
        inProgress: false,
        error: 'Error in adding guest.',
      });
    }
    case ActionTypes.AddToAnalysisFulfilled: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Added guest.'
      });
      // newState.guests = newState.guests || [];
      // newState.guests = newState.guests.slice();
      // newState.guests.push(action.guest);
      return newState;
    }
    case ActionTypes.GuestAdded: {
      const newState = Object.assign({}, state);
      newState.guests = newState.guests || [];
      newState.guests = newState.guests.slice();
      newState.guests.push(action.guest);
      return newState;
    }
    default:
      return state;
  }
}