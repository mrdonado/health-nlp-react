import Actions from './actions';

describe('Analysis actions', () => {
  it('should contain all the actions', () => {
    expect(Actions.GetAnalysisFulfilled).toBeDefined();
    expect(Actions.GetAnalysisRejected).toBeDefined();
    expect(Actions.GetAnalysisRequested).toBeDefined();
  });
});