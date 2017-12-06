import Actions from './actions';
import { analysisDispatchers, swapForm, postAnalysis } from './dispatchers';

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

describe('swapForm dispatchers', () => {
  it('dispatches a swapForm action', () => {
    const swapFormAction = swapForm();
    expect(swapFormAction).toEqual({ type: Actions.SwapForm });
  });
});

describe('post an analysis and trigger a swap form action', () => {

  let cb1, cb2, cbe, config;

  const fetch = (_url, _config) => {
    config = _config;
    return {
      then: (cb) => {
        cb1 = cb;
        return {
          then: (cb) => {
            cb2 = cb;
            return {
              catch: (cb) => {
                cbe = cb;
              }
            }
          }
        }
      }
    }
  };

  let dispCount = 0, action;

  const dispatch = (_action) => {
    dispCount += 1;
    action = _action;
  };

  postAnalysis(fetch)(dispatch)({ user_name: 'someUser', user_description: 'some description', message: 'some random message' });

  expect(config).toEqual({
    body: "{\"source\":\"web\",\"user_name\":\"someUser\",\"user_description\":\"some description\",\"message\":\"some random message\"}",
    headers: {
      "Accept": "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    method: "POST",
  });

  expect(dispCount).toEqual(0);

  const expJsonResponse = { data: 'Some json response' };
  const jsonResponse = cb1({ json: () => expJsonResponse });
  expect(jsonResponse).toEqual(expJsonResponse);

  expect(dispCount).toEqual(0);
  // Success case
  cb2();
  expect(dispCount).toEqual(1);
  expect(action.type).toEqual('SWAP_FORM');
  // Error case
  dispCount = 0;
  cbe();
  expect(dispCount).toEqual(1);
  expect(action.type).toEqual('SWAP_FORM');

});