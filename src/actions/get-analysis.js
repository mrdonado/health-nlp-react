import ActionTypes from '../constants/action-types';
import database from './firebase-db';

export function getAnalysis() {
  return dispatch => {
    dispatch(getAnalysisRequestedAction());
    return database.ref('/analysis').once('value', snap => {
      const analysis = snap.val();
      dispatch(getAnalysisFulfilledAction(analysis))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getAnalysisRejectedAction());
    });
  }
}

function getAnalysisRequestedAction() {
  return {
    type: ActionTypes.GetAnalysisRequested
  };
}

function getAnalysisRejectedAction() {
  return {
    type: ActionTypes.GetAnalysisRejected
  }
}

function getAnalysisFulfilledAction(analysis) {
  return {
    type: ActionTypes.GetAnalysisFulfilled,
    analysis
  };
}
