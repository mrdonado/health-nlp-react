import { getMessagesCount } from './dispatchers';
import Actions from './actions';


describe('Stats action dispatchers', () => {
  it('should dispatch the get messages count action', () => {
    const action = getMessagesCount();
    expect(action.type).toEqual(Actions.GetMessagesCount);
  });
});