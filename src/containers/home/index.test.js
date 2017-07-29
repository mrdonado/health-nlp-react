import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from '.';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import sinon from 'sinon';
import { shallow } from 'enzyme';

describe('Home component', () => {
  let _props, _spies, _wrapper
  beforeEach(() => {
    _spies = {}
    _props = {
      analysis: {},
      ...bindActionCreators({
        getAnalysis: (_spies.getAnalysis = sinon.spy()),
        changePage: (_spies.increment = sinon.spy())
      }, _spies.dispatch = sinon.spy())
    }
    _wrapper = shallow(<Home {..._props} />)
  })
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Home {..._props} />, div);
  });

});

