import { analysisReducer } from './reducers';
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

  it('should reduce GetAnalysisFulfilled', () => {
    const state = {};
    const results = { analysis: 'some analysis...' };
    deepFreeze(state);
    const newState = analysisReducer(state, {
      type: Actions.GetAnalysisFulfilled,
      results
    });
    expect(newState.inProgress).toEqual(false);
    expect(newState.results).toEqual(results);
    expect(newState.success).toEqual('Got analysis results.');
  });

  it('should reduce GetAnalysisFulfilled', () => {
    const state = {};
    const results = { analysis: 'some analysis...' };
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

});
