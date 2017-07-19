import React from 'react';
import PropTypes from 'prop-types';
import './Home.scss';

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


class Home extends React.Component {

  componentDidMount = () => {
    this.props.onGetAnalysis();
  };
  render() {
    return <div id='analysis-section'>
      {this.props.analysis ? renderAnalysis(this.props.analysis) : 'no-analysis'}
    </div>;
  }
}

Home.propTypes = {
  analysis: PropTypes.any.isRequired,
  onGetAnalysis: PropTypes.func.isRequired
};

export default Home;
