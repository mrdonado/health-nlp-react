import React from 'react';
import './home.css';


const renderAnalysis = (data) => {
  if (typeof data.results === 'undefined') {
    return '';
  }
  const keys = Object.keys(data.results);
  let template = [];
  keys.forEach((key, idx) => {
    template.push(<div key={'analysis-' + idx}>{data.results[key].analysis.problem}</div>);
  });
  return template;
};

export class Home extends React.Component {

  componentDidMount = () => {
    this.props.getResults();
  };

  componentDidUpdate = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  render() {
    return <div>
      <h1>Home</h1>
      <div id='analysis-section'>
        {this.props.analysis ? renderAnalysis(this.props.analysis) : 'no-analysis'}
      </div>
      <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>
      <p><button onClick={() => {
        this.props.moreResults();
      }
      }>More results</button></p>
    </div>;
  }
};