import React from 'react';
import ReactDOM from 'react-dom';
import Home from './home';
import { connect } from 'react-redux';
import { shallow, mount, render } from 'enzyme';
import sinon from 'sinon';
import { StaticRouter } from 'react-router-dom';

describe('Home component', () => {

  let _props, _spies, _wrapper, _context;

  beforeEach(() => {
    _spies = {};
    _props = {};
    _context = {};
    _wrapper = shallow(<Home {..._props} />, { context: _context });
  })

  it('renders without crashing', () => {
    const context = {};
    const div = document.createElement('div');
    ReactDOM.render(<StaticRouter location="someLocation" context={context}>
      <Home {..._props} />
    </StaticRouter>, div);
  });

  it('should set the right section according to the scroll position', () => {

    // Test each section rendering every 200 pixels
    document.getElementById = (section) => ({
      offsetTop: parseInt(section.replace('section-', '')) * 200
    });

    window.pageYOffset = null;
    document.documentElement.scrollTop = null;
    document.body.scrollTop = 250;
    window.innerHeight = 300;
    let inst = _wrapper.instance();
    inst.scrollHandler();

    expect(inst.state.section).toEqual(1);
  });


});

