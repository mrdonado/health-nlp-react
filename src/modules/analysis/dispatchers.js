import Actions from './actions';

/**
 * analysisDispatchers. In order to use them, they 
 * must be first initialized with a firebase database
 * @see ./firebase/firebase-db.js
 * @param {*} database 
 */
const analysisDispatchers = (database) => {

  /**
  * 
   * This thunk retrieves the specified count of latest analysis,
   * dispatching a getResultsFulfilled action on success and
   * a getResultsRejected action on failure.
   * 
   * @param {number} count 
   */
  const getResults = () => {
    return (dispatch, getState) => {
      const count = getState().analysis.resultsCount;
      dispatch(getResultsRequestedAction());
      return database.ref('/analysis')
        .limitToLast(count)
        .once('value',
        snap => {
          const results = snap.val();
          dispatch(getResultsFulfilledAction(results));
        })
        .catch((error) => {
          console.log(error);
          dispatch(getResultsRejectedAction());
        });
    };
  };

  const getResultsRequestedAction = () => {
    return {
      type: Actions.GetAnalysisRequested
    };
  };

  const getResultsRejectedAction = () => {
    return {
      type: Actions.GetAnalysisRejected
    };
  };

  const getResultsFulfilledAction = (results) => {
    return {
      type: Actions.GetAnalysisFulfilled,
      results
    };
  };

  /**
   * When requesting more results, the current number of
   * desired results must be increased (action MoreResults),
   * and then, the analysis results must be obtained again.
   */
  const moreResults = () => {
    return dispatch => {
      dispatch({
        type: Actions.MoreResults
      });
      return dispatch(getResults());
    };
  };
  return { getResults, moreResults };
};

export default analysisDispatchers;