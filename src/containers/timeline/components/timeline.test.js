import React from 'react';
import ReactDOM from 'react-dom';
import { Timeline } from './timeline';
import { connect, Provider } from 'react-redux';
import { bindActionCreators } from 'redux';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('Timeline component', () => {

  let _props, _spies, _wrapper, _store = { getState: () => { }, dispatch: () => { }, subscribe: () => { } };

  const analysis = {
    results: [
      {
        message: 'a message with some problem and some solution',
        analysis: {
          problem: 'some problem',
          solution: 'some solution',
          profile: 'some profile'
        }
      }
    ]
  };

  beforeEach(() => {
    _spies = {}
    _props = {
      analysis,
      swapForm: false,
      moreResults: () => { },
      formWindow: {
        showForm: false
      },
      ...bindActionCreators({
        getResults: (_spies.getResults = sinon.spy()),
        changePage: (_spies.increment = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Timeline {..._props} />);
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    // Timeline contains a redux-form, which needs to be
    // wrapped within a Provider.
    ReactDOM.render(
      <Provider store={_store}>
        <Timeline {..._props} />
      </Provider>, div);
    expect(_spies.getResults.called).toBeTruthy();
  });

});

