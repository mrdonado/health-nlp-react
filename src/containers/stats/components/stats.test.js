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
      stats: {
        problems: [{ key: 'problem0' }],
        solutions: [{ key: 'solution0' }]
      },
      fetchMessagesCount: sinon.spy(),
      fetchProblemsList: sinon.spy(),
      fetchWordSearch: sinon.spy(),
      fetchSolutionsToProblem: sinon.spy(),
      fetchMessagesForProblemSolution: sinon.spy()
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

  it('fetches a word search when clicking on search', () => {
    expect(_props.fetchWordSearch.called).toBeFalsy();
    const freeTextInput = _wrapper.find('#free-text');
    freeTextInput.simulate('change', { target: { value: 'searchword' } });
    _wrapper.find('#search-button').simulate('click');
    expect(_props.fetchWordSearch.calledWith('searchword')).toBeTruthy();
  });

  it('fetches messages for a specific problem-solution pair when selecting a solution', () => {
    expect(_props.fetchSolutionsToProblem.called).toBeFalsy();
    _wrapper.find('#problem-select').simulate('change', { target: { value: 'problem0' } });
    expect(_props.fetchSolutionsToProblem.called).toBeTruthy();
    expect(_props.fetchMessagesForProblemSolution.called).toBeFalsy();
    _wrapper.find('#solution-select').simulate('change', { target: { value: 'solution0' } });
    expect(_props.fetchMessagesForProblemSolution.called).toBeTruthy();
  });

});