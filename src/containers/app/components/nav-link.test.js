import React from 'react';
import NavLink from './nav-link';
import ReactDOM from 'react-dom';
import { StaticRouter } from 'react-router-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() })

describe('NavLink component', () => {

  let _props, _spies, _wrapper, _context;

  beforeEach(() => {
    _spies = {};
    _props = { children: '', to: '' };
    _context = {
      router: { route: { location: { pathname: 'example' } } }
    };
    _wrapper = shallow(<NavLink {..._props} />, { context: _context });
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    const context = {};
    ReactDOM.render(
      <StaticRouter location="someLocation" context={context}>
        <NavLink to="'example'" />
      </StaticRouter>
      , div);
  });

  it('assigns the active class for links pointing to the current path name', () => {
    _wrapper.setProps({ children: '', to: '' });
    expect(_wrapper.find('.active').length).toEqual(0);
    _wrapper.setProps({ children: '', to: 'example' });
    expect(_wrapper.find('.active').length).toEqual(1);
  });

});