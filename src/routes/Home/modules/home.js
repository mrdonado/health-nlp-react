import database from '../../../firebase/firebase-db';

// ------------------------------------
// Constants
// ------------------------------------
export const actionTypes = {
  GetAnalysisRequested: 'GET_ANALYSIS_REQUESTED',
  GetAnalysisRejected: 'GET_ANALYSIS_REJECTED',
  GetAnalysisFulfilled: 'GET_ANALYSIS_FULFILLED'
};

// ------------------------------------
// Actions
// ------------------------------------

// getAnalysis thunk
export function getAnalysis() {
  return dispatch => {
    dispatch(getAnalysisRequestedAction());
    return database.ref('/analysis').once('value', snap => {
      const analysis = snap.val();
      dispatch(getAnalysisFulfilledAction(analysis));
    })
      .catch((error) => {
        console.log(error);
        dispatch(getAnalysisRejectedAction());
      });
  };
}

function getAnalysisRequestedAction() {
  return {
    type: ActionTypes.GetAnalysisRequested
  };
}

function getAnalysisRejectedAction() {
  return {
    type: ActionTypes.GetAnalysisRejected
  };
}

function getAnalysisFulfilledAction(analysis) {
  return {
    type: ActionTypes.GetAnalysisFulfilled,
    analysis
  };
}

// ------------------------------------
// Reducer
// ------------------------------------
export function analysisReducer(state = {}, action) {
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