import React from 'react';
import PropTypes from 'prop-types';

const renderAnalysis = (data) => {
  if (typeof data.analysis === 'undefined') {
    return '';
  }
  const keys = Object.keys(data.analysis);
  let template = [];
  keys.forEach((key) => {
    template.push(<div>{data.analysis[key].analysis.problem}</div>);
  });
  return template;
};

class Counter extends React.Component {

  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  // componentDidMount = () => {
  //   this.props.onGetAnalysis();
  // };

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
      {/* {this.props.analysis ? renderAnalysis(this.props.analysis) : 'no-analysis'} */}
    </div >;
  }
}

Counter.propTypes = {
  counter: PropTypes.number.isRequired,
  increment: PropTypes.func.isRequired,
  doubleAsync: PropTypes.func.isRequired,
  // analysis: PropTypes.any.isRequired,
  // onGetAnalysis: PropTypes.func.isRequired
};

export default Counter;
