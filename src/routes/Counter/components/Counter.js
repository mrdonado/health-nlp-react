import React from 'react';
import PropTypes from 'prop-types';

class Counter extends React.Component {

  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  render() {
    return <div style={{ margin: '0 auto' }} >
      <h2>Counter: {this.props.counter}</h2>
      <button className='btn btn-primary' onClick={this.props.increment}>
        Increment
    </button>
      {' '}
      <button className='btn btn-secondary' onClick={this.props.doubleAsync}>
        Double (Async)
    </button>
    </div >;
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired
};

export default Counter;
