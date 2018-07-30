import React from 'react';
import Toggler from './toggler';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

describe('Toggler component', () => {

  let _props, _spies, _wrapper, _context;

  beforeEach(() => {
    _spies = {};
    _props = {
      onChange: sinon.spy(),
      choiceA: "Choice A",
      choiceB: "Choice B"
    };
    _context = {};
    _wrapper = shallow(<Toggler {..._props} />, { context: _context });
  });

  it('should call the onChange property callback when clicking on the switcher', () => {
    expect(_props.onChange.callCount).toEqual(0);
    _wrapper
      .find('#switcher')
      .simulate('change',
        { target: { checked: true } });
    expect(_props.onChange.callCount).toEqual(1);
  });

});

