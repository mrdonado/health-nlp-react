import { setMessagesCount } from './dispatchers';
import Actions from './actions';


describe('Stats action dispatchers', () => {
  it('should dispatch the set messages count action', () => {
    const action = setMessagesCount(5);
    expect(action.type).toEqual(Actions.SetMessagesCount);
    expect(action.count).toEqual(5);
  });
});