import React from 'react';
import './stats.css';
import AnalysisList from '../../timeline/components/analysis-list';

export default class Home extends React.Component {

  componentDidMount() {
    this.props.fetchMessagesCount();
  }
  render() {
    let analysisList = this.props.stats.messages || [];
    return <div>
      <div className="left-panel">
        SOME STATS
        </div>
      <div className="right-panel">
        <AnalysisList analysis={analysisList}
          moreResults={() => { }}>
        </AnalysisList>
      </div>
    </div>
  }
}