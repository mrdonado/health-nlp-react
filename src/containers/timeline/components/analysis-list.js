import React from 'react';
import AnalysisBlock from './analysis-block';

export default class AnalysisList extends React.Component {
  render() {

    let list = (this.props.analysis && 
      this.props.analysis.results) || [];

    return <ul id="analysis-list">
      {list
        .map(result =>
          <AnalysisBlock key={'analysis-' + result.id} result={result}></AnalysisBlock>)
      }

      {/* Show more button as last element of the list. */}
      <button className="more-results-btn"
        onClick={() => {
          this.props.moreResults();
        }}>
        Show more
          </button>
    </ul>;
  }
}