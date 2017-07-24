import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  increment,
  incrementAsync,
  decrement,
  decrementAsync
} from '../../modules/counter';

import { getAnalysis } from '../../modules/analysis';

const renderAnalysis = (data) => {
  if (typeof data.analysis === 'undefined') {
    return '';
  }
  const keys = Object.keys(data.analysis);
  let template = [];
  keys.forEach((key, idx) => {
    template.push(<div key={'analysis-' + idx}>{data.analysis[key].analysis.problem}</div>);
  });
  return template;
};
class Home extends React.Component {

  componentDidMount = () => {
    this.props.getAnalysis();
  };
  render() {
    return <div>
      <h1>Home</h1>
      <p>Count: {this.props.count}</p>
      <div id='analysis-section'>
        {this.props.analysis ? renderAnalysis(this.props.analysis) : 'no-analysis'}
      </div>
      <p>
        <button onClick={this.props.increment} disabled={this.props.isIncrementing}>Increment</button>
        <button onClick={this.props.incrementAsync} disabled={this.props.isIncrementing}>Increment Async</button>
      </p>

      <p>
        <button onClick={this.props.decrement} disabled={this.props.isDecrementing}>Decrementing</button>
        <button onClick={this.props.decrementAsync} disabled={this.props.isDecrementing}>Decrement Async</button>
      </p>

      <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>
    </div>;
  }
};

const mapStateToProps = state => ({
  analysis: state.analysis,
  count: state.counter.count,
  isIncrementing: state.counter.isIncrementing,
  isDecrementing: state.counter.isDecrementing
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAnalysis,
  increment,
  incrementAsync,
  decrement,
  decrementAsync,
  changePage: () => push('/about-us')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);