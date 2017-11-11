import Actions from './actions';
import StatsActions from '../stats/actions';

const firebaseObjectToArray = (fbo) => {
  const result = [];
  const ids = Object.keys(fbo);
  ids.forEach(id => result.push(Object.assign({ id }, fbo[id])));
  return result;
};

const swapForm = (dispatch) => {
  return {
    type: Actions.SwapForm
  };
};

/**
 * analysisDispatchers. In order to use them, they 
 * must be first initialized with a firebase database
 * @see ./firebase/firebase-db.js
 * @param {*} database 
 */
const analysisDispatchers = (database) => {

  /**
   * When executed, it configures a listener for new
   * analysis added to the database.
   */
  const watchAnalysisAddedEvent = (dispatch) => {
    let initialDataLoaded = false;
    database.ref('/analysis').on('child_added', (snap) => {
      if (initialDataLoaded) {
        dispatch({ type: StatsActions.IncrementMessagesCount });
        dispatch(analysisAddedAction(snap.val(), snap.key));
      }
    });
    database.ref('/analysis').once('value', () => {
      initialDataLoaded = true;
    });
  };

  const analysisAddedAction = (analysis, key) => {
    return {
      type: Actions.AnalysisAdded,
      analysis: Object.assign({ id: key }, analysis)
    };
  };

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
          const resultsObject = snap.val();
          const results = firebaseObjectToArray(resultsObject);
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
  return { getResults, moreResults, watchAnalysisAddedEvent };
};

export { analysisDispatchers, swapForm };