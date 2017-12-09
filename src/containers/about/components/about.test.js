import React from 'react';
import ReactDOM from 'react-dom';
import About from './about';
import { connect } from 'react-redux';
import sinon from 'sinon';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
configure({ adapter: new Adapter() });


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

