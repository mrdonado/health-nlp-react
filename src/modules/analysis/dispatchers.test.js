import analysisDispatchers from './dispatchers';

let dbName, count, value, onceCb, errorCb, dispatchedAction;

const resetVars = () => {
  dbName = null;
  count = null;
  value = null;
  onceCb = null;
  errorCb = null;
  dispatchedAction = null;
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
  dispatchedAction = action;
};

describe('Analysis action dispatchers', () => {

  const { getResults } = analysisDispatchers(new DbMock());

  it('should dispatch getAnalysis and obtain 6 elements from the database on success.', () => {
    resetVars();
    getResults()(dispatch, () => { return { analysis: { resultsCount: 10 } } });
    expect(dispatchedAction).toEqual({ 'type': 'GET_ANALYSIS_REQUESTED' });
    expect(dbName).toEqual('/analysis');
    expect(count).toEqual(10);
    // Success call
    onceCb({ val: () => ({ 'analysis': '10 elements...' }) });
    expect(dispatchedAction).toEqual({ 'results': { 'analysis': '10 elements...' }, 'type': 'GET_ANALYSIS_FULFILLED' });
  });

  it('should dispatch getAnalysis and reject on error', () => {
    resetVars();
    getResults()(dispatch, () => { return { analysis: { resultsCount: 5 } } });
    expect(dispatchedAction).toEqual({ 'type': 'GET_ANALYSIS_REQUESTED' });
    expect(dbName).toEqual('/analysis');
    expect(count).toEqual(5);
    // Error call
    errorCb('Some error!');
    expect(dispatchedAction).toEqual({ "type": "GET_ANALYSIS_REJECTED" });
  });

});
