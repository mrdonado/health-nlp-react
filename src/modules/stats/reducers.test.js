import { statsReducer } from './reducers';
import Actions from './actions';
import deepFreeze from 'deep-freeze';

describe('Stats reducers', () => {

  it('should be defined', () => {
    expect(statsReducer).toBeDefined();
  });

  it('should assign a messages count', () => {
    const state = { something: 'else' };
    deepFreeze(state);
    expect(statsReducer(state,
      {
        type: Actions.SetMessagesCount,
        count: 5
      })).toEqual({ something: 'else', count: 5 });
  });

  it('should increment the messages count', () => {
    const state = { count: 7 };
    deepFreeze(state);
    expect(statsReducer(state,
      {
        type: Actions.IncrementMessagesCount
      })).toEqual({ count: 8 });
  });

  it('should left the state inaltered when no action applies', () => {
    const state = { whatever: 'information' };
    deepFreeze(state);
    expect(statsReducer(state,
      {
        type: 'NON_EXSISTING_ACTION'
      })).toEqual(state);
  });

  it('should initialize the state if it is not yet defined', () => {
    let state; // Undefined
    expect(statsReducer(state, { type: 'NON_EXSISTING_ACTION' }))
      .toEqual({});
  });

});