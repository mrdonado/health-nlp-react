import Actions from './actions';

/**
 * Action dispatcher getAnalysis (default export). In order
 * to use it, it must be initialized with a firebase database
 * first (@see ./firebase/firebase-db.js).
 * 
 * This thunk retrieves the specified count of latest analysis,
 * dispatching a getAnalysisFulfilled action on success and
 * a getAnalysisRejected action on failure.
 * 
 * @param {number} count 
 */
const getAnalysis = (database) => (count = 5) => {
  return dispatch => {
    dispatch(getAnalysisRequestedAction());
    return database.ref('/analysis')
      .limitToLast(count)
      .once('value',
      snap => {
        const analysis = snap.val();
        dispatch(getAnalysisFulfilledAction(analysis));
      })
      .catch((error) => {
        console.log(error);
        dispatch(getAnalysisRejectedAction());
      });
  };
};

const getAnalysisRequestedAction = () => {
  return {
    type: Actions.GetAnalysisRequested
  };
};

const getAnalysisRejectedAction = () => {
  return {
    type: Actions.GetAnalysisRejected
  };
};

const getAnalysisFulfilledAction = (analysis) => {
  return {
    type: Actions.GetAnalysisFulfilled,
    analysis
  };
};

export default getAnalysis;