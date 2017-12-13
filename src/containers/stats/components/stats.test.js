import React from 'react';
import Stats from './stats';
import sinon from 'sinon';
import ReactDOM from 'react-dom';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


describe('Stats component', () => {

  let _props, _spies, _wrapper, _context;

  beforeEach(() => {
    _spies = {};
    _props = {
      stats: {},
      fetchMessagesCount: () => { },
      fetchProblemsList: () => { }
    };
    _context = {};
    _wrapper = shallow(<Stats {..._props} />, { context: _context });
  });

  it('renders without crashing, fetching messages when no count is ready yet', () => {
    const div = document.createElement('div');
    const context = {};
    const fmcount = sinon.spy();
    const fplist = sinon.spy();
    ReactDOM.render(<Stats stats={{}} fetchMessagesCount={fmcount} fetchProblemsList={fplist} />, div);
    expect(fmcount.called).toBeTruthy();
    expect(fplist.called).toBeTruthy();
  });

  it('renders without crashing, fetching no messages if a count is already present', () => {
    const div = document.createElement('div');
    const context = {};
    const fmcount = sinon.spy();
    const fplist = sinon.spy();
    ReactDOM.render(<Stats stats={{ count: 50 }} fetchMessagesCount={fmcount} fetchProblemsList={fplist} />, div);
    expect(fmcount.called).toBeFalsy();
    expect(fplist.called).toBeFalsy();
  });

});