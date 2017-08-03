import analysisDispatchers from './dispatchers';

let dbName, count, value, onceCb, errorCb, dispatchedActions, currentState;

const resetVars = () => {
  dbName = null;
  count = null;
  value = null;
  onceCb = null;
  errorCb = null;
  currentState = null;
  dispatchedActions = [];
};

function DbMock() { };

DbMock.prototype.ref = function (db) {
  dbName = db;
  return this;
};
DbMock.prototype.limitToLast = function (_count) {
  count = _count;
  return this;
};
DbMock.prototype.once = function (_value, cb) {
  value = _value; onceCb = cb;
  return this;
};
DbMock.prototype.catch = function (cb) {
  errorCb = cb;
  return this;
};

const dispatch = (action) => {
  dispatchedActions.push(action);
};

const getState = () => {
  return currentState;
};

describe('Analysis action dispatchers', () => {

  const { getResults, moreResults } = analysisDispatchers(new DbMock());

  it('should dispatch getAnalysis and obtain 6 elements from the database on success.', () => {
    resetVars();
    currentState = { analysis: { resultsCount: 10 } };
    getResults()(dispatch, getState);
    expect(dispatchedActions[0]).toEqual({ 'type': 'GET_ANALYSIS_REQUESTED' });
    expect(dbName).toEqual('/analysis');
    expect(count).toEqual(10);
    // Success call
    onceCb({ val: () => ({ id0: { data: 'analysis0' } }) });
    expect(dispatchedActions[1]).toEqual({ 'results': [{ id: 'id0', data: 'analysis0' }], 'type': 'GET_ANALYSIS_FULFILLED' });
  });

  it('should dispatch getAnalysis and reject on error', () => {
    resetVars();
    currentState = { analysis: { resultsCount: 5 } };
    getResults()(dispatch, getState);
    expect(dispatchedActions[0]).toEqual({ 'type': 'GET_ANALYSIS_REQUESTED' });
    expect(dbName).toEqual('/analysis');
    expect(count).toEqual(5);
    // Error call
    errorCb('Some error!');
    expect(dispatchedActions[1]).toEqual({ "type": "GET_ANALYSIS_REJECTED" });
  });

  it('should obtain more results by dispatching a MoreResults action and getting the results afterwards', () => {
    resetVars();
    moreResults()(dispatch);
    expect(dispatchedActions[0]).toEqual({ 'type': 'MORE_RESULTS' });
    currentState = { analysis: { resultsCount: 5 } };
    expect(dispatchedActions[1](dispatch, getState)).toEqual(getResults()(dispatch, getState));
  });

});
