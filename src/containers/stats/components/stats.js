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
    let textSearch = '';
    return <div className="main-content">
      <div className="left-panel">
        <div className="data-box">
          <div className="box-title">
            Total number of analyzed messages
          </div>
          {this.props.stats.count}
        </div>
        <input id="free-text" type="text"
          onChange={v => textSearch = v.target.value}
        />
        <div className="data-box">
          <div className="box-title">
            Messages found:
          </div>
          {(this.props.stats.messages || []).length}
        </div>
        <input
          id="search-button"
          onClick={() => this.props.fetchWordSearch(textSearch)}
          type="button"
          value="Search" />
        <select
          id="problem-select"
          onChange={v => this.props.fetchSolutionsToProblem(v.target.value)}>
          <option>-select problem-</option>
          {(this.props.stats.problems || [])
            .map(p => <option key={p.key} value={p.key}>{p.key}</option>)}
        </select>
        <select
          id="solution-select"
          disabled={!Array.isArray(this.props.stats.solutions)}
          onChange={(v) => this.props.fetchMessagesForProblemSolution(this.props.stats.problem, v.target.value)}>
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
    </div>
  }
};