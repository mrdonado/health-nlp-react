import {
  setMessagesCount,
  fetchMessagesCount
} from './dispatchers';
import Actions from './actions';
import fetchMock from 'fetch-mock';

beforeAll(() => {
  fetchMock.get('*', { 'messages-count': 55 });
});

afterAll(() => {
  fetchMock.restore();
});

describe('Stats action dispatchers', () => {

  it('should dispatch the set messages count action', () => {
    const action = setMessagesCount(5);
    expect(action.type).toEqual(Actions.SetMessagesCount);
    expect(action.count).toEqual(5);
  });

  it('should fetch the current messages count', (done) => {
    fetchMessagesCount()((action) => {
      expect(action.type).toEqual("SET_MESSAGES_COUNT");
      expect(action.count).toEqual(55);
      done();
    });
  });
});