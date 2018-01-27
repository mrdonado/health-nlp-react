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
    return <div className="main-content">
      <div className="left-panel">
        SOME STATS {this.props.stats.count}
        <input id="free-text" type="text" />
        <input onClick={() => this.props.fetchWordSearch(document.getElementById('free-text').value)}
          type="button"
          value="Search" />
        <select onChange={(v) => this.props.fetchSolutionsToProblem(v.target.value)}>
          <option>-select problem-</option>
          {(this.props.stats.problems || [])
            .map(p => <option key={p.key} value={p.key}>{p.key}</option>)}
        </select>
        <select onChange={(v) => this.props.fetchMessagesForProblemSolution(this.props.stats.problem, v.target.value)}>
          <option>-select solution-</option>
          {(this.props.stats.solutions || [])
            .map(p => <option key={p.key} value={p.key}>{p.key}</option>)}
        </select>
      </div>
      <div className="right-panel">
        <AnalysisList analysis={{ results: this.props.stats.messages || [] }}
          moreResults={() => { }}>
        </AnalysisList>
      </div>
    </div >
  }
};