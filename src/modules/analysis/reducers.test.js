import { analysisReducer, swapFormReducer } from './reducers';
import Actions from './actions';
import deepFreeze from 'deep-freeze';

describe('Analysis reducers', () => {
  it('should be defined', () => {
    expect(analysisReducer).toBeDefined();
  });

  it('should reduce GetAnalysisRequested', () => {
    const state = {};
    deepFreeze(state);
    const newState = analysisReducer(state, { type: Actions.GetAnalysisRequested });
    expect(newState.error).toEqual('');
    expect(newState.inProgress).toEqual(true);
    expect(newState.success).toEqual('');
  });

  it('should reduce GetAnalysisRejected', () => {
    const state = {};
    deepFreeze(state);
    const newState = analysisReducer(state, { type: Actions.GetAnalysisRejected });
    expect(newState.error).toContain('Error while');
    expect(newState.inProgress).toEqual(false);
  });

  it('should reduce GetAnalysisFulfilled (ignore repeated results)', () => {
    const state = {
      results: [
        { id: 'asdf', analysis: 'some analysis...' }]
    };
    const results = [{ id: 'asdf', analysis: 'some analysis...' }];
    deepFreeze(state);
    const newState = analysisReducer(state, {
      type: Actions.GetAnalysisFulfilled,
      results
    });
    expect(newState.inProgress).toEqual(false);
    expect(newState.results).toEqual(results);
    expect(newState.success).toEqual('Got analysis results.');
  });

  it('should reduce GetAnalysisFulfilled (add new results)', () => {
    const state = {};
    const results = [{ id: 'asdf', analysis: 'some analysis...' }];
    deepFreeze(state);
    const newState = analysisReducer(state, {
      type: Actions.GetAnalysisFulfilled,
      results
    });
    expect(newState.inProgress).toEqual(false);
    expect(newState.results).toEqual(results);
    expect(newState.success).toEqual('Got analysis results.');
  });

  it('should ignore unknown actions', () => {
    const state = {};
    deepFreeze(state);
    const newState = analysisReducer(state, { type: 'someUnknownAction' });
    expect(newState).toEqual(state);
  });

  it('should reduce a MoreResults action', () => {
    let state;
    const newState = analysisReducer(state, { type: Actions.MoreResults });
    expect(newState.resultsCount).toEqual(10);
  });

  it('should reduce an AnalysisAdded action with a new analysis', () => {
    const state = { results: [] };
    deepFreeze(state);
    const newState = analysisReducer(state, {
      type: Actions.AnalysisAdded,
      analysis: { id: '1234' }
    });
    expect(newState.resultsCount).toEqual(1);
  });

  it('should reduce an AnalysisAdded action with an existing analysis', () => {
    const state = { results: [{ id: '1234' }] };
    deepFreeze(state);
    const newState = analysisReducer(state, {
      type: Actions.AnalysisAdded,
      analysis: { id: '1234' }
    });
    expect(newState.resultsCount).toEqual(1);
  });


});

describe('Analysis reducers', () => {
  it('should be defined', () => {
    expect(swapFormReducer).toBeDefined();
  });

  it('should ignore unknown actions', () => {
    const state = { showForm: false };
    const action = { type: 'UNKNOWN_ACTION'};
    deepFreeze(state);
    const newState = swapFormReducer(state, action)
    expect(newState).toEqual(state);
  });

  it('should reduce the SwapForm action', () => {
    const action = { type: Actions.SwapForm };
    let state;
    const newState = swapFormReducer(state, action);
    expect(newState).toEqual({ showForm: true });
    deepFreeze(newState);
    const newState2 = swapFormReducer(newState, action);
    expect(newState2).toEqual({ showForm: false });
  });
});

