import React from 'react';
import './stats.css';
import AnalysisList from '../../timeline/components/analysis-list';

export default class Home extends React.Component {

  componentDidMount() {
    if (this.props.stats.count) { return; }
    this.props.fetchMessagesCount();
    this.props.fetchProblemsList();
  }
  render() {
    let analysisList = this.props.stats.messages || [];
    return <div className="main-content">
      <div className="left-panel">
        SOME STATS {this.props.stats.count}
        </div>
      <div className="right-panel">
        <AnalysisList analysis={analysisList}
          moreResults={() => { }}>
        </AnalysisList>
      </div>
    </div>
  }
};