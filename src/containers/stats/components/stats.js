import React from 'react';
import './stats.css';
import './slider.css';
import AnalysisList from '../../timeline/components/analysis-list';
import Spinner from '../../../utilities/spinner';

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resultsDisplayed: 5,
      searchString: '',
      freeSearch: false
    };
  }

  componentDidMount() {
    if (this.props.stats.count) { return; }
    this.props.fetchMessagesCount();
    this.props.fetchProblemsList();
  }

  componentWillReceiveProps() {
    this.setState({ resultsDisplayed: 5 });
  }

  render() {
    if (typeof this.props.stats.count === 'undefined') {
      return <Spinner />;
    }
    return <div className="main-content stats-grid">
      <div className="left-panel">
        <div>
          <div className="switch-selector">
            <span className={
              !this.state.freeSearch && 'active'
            }>Problem/Solution</span>
            <label className="switch">
              <input type="checkbox"
                id="free-search"
                onChange={(e) => {
                  this.setState({
                    freeSearch: e.target.checked
                  });
                }}
                iname="free-search"
                label="Free search" />
              <span className="slider" />
            </label>
            <span className={
              this.state.freeSearch && 'active'
            }>Free search</span>
          </div>
        </div>
        <div className="data-box">
          <div className="box-title">
            Total number of analyzed messages
          </div>
          {this.props.stats.count}
        </div>
        <div className="data-box">
          <div className="box-title">
            Current search results
          </div>
          {(this.props.stats.messages || []).length}
        </div>

        {this.state.freeSearch ?
          <div>
            <input id="free-text" type="text"
              onChange={v =>
                this.setState({
                  searchString: v.target.value
                })} />
            <input
              id="search-button"
              onClick={() => {
                this.props.fetchWordSearch(this.state.searchString);
              }}
              type="button"
              value="Search" />
          </div>
          :
          <div>
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
              onChange={(v) => {
                this
                  .props
                  .fetchMessagesForProblemSolution(this.props.stats.problem, v.target.value);
              }}>
              <option>-select solution-</option>
              {(this.props.stats.solutions || [])
                .map(p => <option key={p.key} value={p.key}>{p.key}</option>)}
            </select>
          </div>
        }
      </div>
      <div className="right-panel">

        <AnalysisList analysis={{
          results: (this.props.stats.messages || [])
            .slice(0, this.state.resultsDisplayed)
        }}
          moreResults={() =>
            this.setState({ resultsDisplayed: this.state.resultsDisplayed + 5 })}
          hideButton={this.state.resultsDisplayed >= (this.props.stats.messages || []).length}>
        </AnalysisList>
      </div>
    </div>
  }
};