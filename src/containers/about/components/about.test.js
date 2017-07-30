import React from 'react';
import ReactDOM from 'react-dom';
import About from './about';
import { connect } from 'react-redux';
import { shallow } from 'enzyme';
import sinon from 'sinon';

describe('About component', () => {

  let _props, _spies, _wrapper;

  beforeEach(() => {
    _spies = {}
    _props = {}
    _wrapper = shallow(<About {..._props} />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<About {..._props} />, div);
  });

});

