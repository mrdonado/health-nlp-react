import {
  setMessagesCount,
  fetchMessagesCount,
  fetchProblemsList,
  fetchSolutionsToProblem,
  fetchWordSearch,
  fetchMessagesForProblemSolution,
  resetStats
} from './dispatchers';

import Actions from './actions';
import fetchMock from 'fetch-mock';

describe('Stats action dispatchers', () => {

  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch the set messages count action', () => {
    fetchMock.get('*', { 'messages-count': 55 });
    const action = setMessagesCount(5);
    expect(action.type).toEqual(Actions.SetMessagesCount);
    expect(action.count).toEqual(5);
  });

  it('should fetch the current messages count and trigger the set messages count action', (done) => {
    fetchMock.get('*', { 'messages-count': 55 });
    fetchMessagesCount()((action) => {
      expect(action.type).toEqual("SET_MESSAGES_COUNT");
      expect(action.count).toEqual(55);
      done();
    });
  });

  it('should fetch the problems list and trigger the set problems list action', (done) => {
    fetchMock.get('*', [{ key: 'prob1', doc_count: 1234 }]);
    fetchProblemsList()((action) => {
      expect(action.type).toEqual(Actions.SetProblemsList);
      expect(action.problems[0].key).toEqual('prob1');
      done();
    });
  });

  it('should set the current problem, fetch the solutions list for that problem and trigger the set solutions list action', (done) => {
    let callNum = 0;
    fetchMock.get('*', [{ key: 'solution1', doc_count: 1234 }]);
    fetchSolutionsToProblem('problem1')((action) => {
      if (callNum === 0) {
        expect(action.type).toEqual(Actions.SetProblem);
        expect(action.problem).toEqual('problem1');
        callNum += 1;
      } else {
        expect(action.type).toEqual(Actions.SetSolutionsList);
        expect(action.solutions[0].key).toEqual('solution1');
        done();
      }
    });
  });

  it('should search for messages containing a keyword, and then set the received messages list', (done) => {
    fetchMock.get('*', [{ query: 'message1q' }, { query: 'message2q' }]);
    let callCount = 0;
    fetchWordSearch('searchTerm')((action) => {
      if (callCount === 0) {
        expect(action.type).toEqual(Actions.AddPendingRequest);
        callCount += 1;
      } else if (callCount === 1) {
        expect(action.type).toEqual(Actions.RemovePendingRequest);
        callCount += 1;
      } else {
        expect(action.type).toEqual(Actions.SetMessagesList);
        expect(action.messages[0].query).toEqual('message1q');
        done();
      }
    });
  });

  it('should set the current solution, fetch the messages list for the current problem-solution pair and trigger the set messages list action', (done) => {
    let callNum = 0;
    fetchMock.get('*', [{ query: 'message1q' }, { query: 'message2q' }]);
    fetchMessagesForProblemSolution('problem1', 'solution1')((action) => {
      if (callNum === 0) {
        expect(action.type).toEqual(Actions.SetSolution);
        expect(action.solution).toEqual('solution1');
        callNum += 1;
      } else {
        expect(action.type).toEqual(Actions.SetMessagesList);
        expect(action.messages[0].query).toEqual('message1q');
        done();
      }
    });
  });


  it('should dispatch the reset stats action', () => {
    const action = resetStats();
    expect(action.type).toEqual(Actions.ResetStats);
  });

});