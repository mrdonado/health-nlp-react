import React from 'react';
import { push } from 'react-router-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
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
export class Home extends React.Component {

  componentDidMount = () => {
    this.props.getAnalysis();
  };
  render() {
    return <div>
      <h1>Home</h1>
      <div id='analysis-section'>
        {this.props.analysis ? renderAnalysis(this.props.analysis) : 'no-analysis'}
      </div>
      <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>
    </div>;
  }
};

const mapStateToProps = state => ({
  analysis: state.analysis
});

const mapDispatchToProps = dispatch => bindActionCreators({
  getAnalysis,
  changePage: () => push('/about-us')
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);