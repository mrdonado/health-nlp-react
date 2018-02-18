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

  it('should set a list of health problems', () => {
    const problems = [{ "key": "cancer", "doc_count": 55184 }, { "key": "diabetes", "doc_count": 8826 }, { "key": "breast", "doc_count": 7912 }, { "key": "obesity", "doc_count": 4086 }];
    let state; // Undefined
    expect(statsReducer(state, {
      problems,
      type: Actions.SetProblemsList
    })).toEqual({ problems });

  });

  it('should set a list of solutions for a given problem', () => {
    const solutions = [{ "key": "food", "doc_count": 500 }, { "key": "activity", "doc_count": 333 }];
    let state; // Undefined
    expect(statsReducer(state, {
      solutions,
      type: Actions.SetSolutionsList
    })).toEqual({ solutions });

  });

  it('should set a list of messages', () => {
    const messages = [{
      user_name: 'FlorinDanPopesc',
      user_description: 'Allergist, Assoc. Professor,\nNational Rep @EAACI_HQ,\n#TeamFollowBack 4 #ContinuousAllergyAwareness, Tweets/RTweets≠medical advice, Following/RTweets≠endorsement',
      created_at: '2017-10-28T13:15:23.269Z',
      message: 'RT @faye_harrison: Important message from fantastic pro-con debate: IgG4 testing on its own is currently NOT validated for food allergy dia…',
      source: 'twitter',
      query: 'food allergy',
      analysis: {
        profile: 'Doctor',
        profile_rule: '(?i)^(\\S+ ){0,5}<DOCTOR>\\b',
        profile_origin: '<from Description>',
        health_related: true,
        solution: 'testing',
        problem: 'food allergy',
        created_at: '2017-10-28T13:15:24.683484'
      }
    },
    {
      user_name: 'newsaction_',
      user_description: 'Get the latest #World #news and #international #news.',
      created_at: '2017-09-08T08:01:58.866Z',
      message: 'RT inews2day “”https://t.co/xLrfQ8LDfQ family seeks help getting dad home following overseas cancer dia………… https://t.co/ReO68mvP1c',
      source: 'twitter',
      query: 'cancer',
      analysis: {
        profile: 'News source',
        profile_rule: '(?i)news',
        profile_origin: '<from Name>',
        health_related: true,
        solution: 'family',
        problem: 'cancer',
        created_at: '2017-09-08T08:02:00.177895'
      }
    }];
    let state; // Undefined
    expect(statsReducer(state, {
      messages,
      type: Actions.SetMessagesList
    })).toEqual({ messages });
  });

  it('should set the currently selected problem', () => {
    const problem = 'someProblem';
    let state; // Undefined
    expect(statsReducer(state, {
      problem,
      type: Actions.SetProblem
    })).toEqual({ problem });
  });

  it('should set the currently selected solution', () => {
    const solution = 'solution';
    let state; // Undefined
    expect(statsReducer(state, {
      solution,
      type: Actions.SetSolution
    })).toEqual({ solution });
  });

  it('should add a new name to the pending requests list', () => {
    const requestName = 'someRequest';
    let state; // Undefined
    expect(statsReducer(state, {
      requestName, type: Actions.AddPendingRequest
    })).toEqual({ pendingRequests: [requestName] })

    // It stays the same if that request is already pending
    expect(statsReducer({ pendingRequests: [requestName] }, {
      requestName, type: Actions.AddPendingRequest
    })).toEqual({ pendingRequests: [requestName] })
  });

  it('should remove an existing name from the pending requests list', () => {
    const requestName = 'someRequest';
    let state = { pendingRequests: [requestName] };
    expect(statsReducer(state, {
      requestName, type: Actions.RemovePendingRequest
    })).toEqual({ pendingRequests: [] })

    // It stays the same if the request didn't exist
    expect(statsReducer({ pendingRequests: [] }, {
      requestName, type: Actions.RemovePendingRequest
    })).toEqual({ pendingRequests: [] })


  });

});