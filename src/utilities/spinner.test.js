import Spinner from './spinner';
import React from 'react';
import ReactDOM from 'react-dom';

describe('Spinner component', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Spinner/>, div);
  });
});