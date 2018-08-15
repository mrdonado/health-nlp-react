import React from 'react';
import './stats.css';
import AnalysisList from '../../timeline/components/analysis-list';
import Spinner from '../../../utilities/spinner';
import Toggler from './toggler';
import Chart from './charts/chart';
import docsToDataset from './data-functions/docs-to-dataset';

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
    this.setState({
      resultsDisplayed: 5
    });
  }

  freeSearchChange(e) {
    this.setState({
      freeSearch: e.target.checked
    });
  }

  selectSolution(elem) {
    const solution = elem.target ? elem.target.value : elem;
    this
      .props
      .fetchMessagesForProblemSolution(this.props.stats.problem, solution);
  }

  selectProblem(elem) {
    const problem = elem.target ? elem.target.value : elem;
    this
      .props
      .fetchSolutionsToProblem(problem)
  }

  render() {

    if (typeof this.props.stats.count === 'undefined') {
      return <Spinner />;
    }

    return <div className="main-content stats-grid">
      <div className="left-panel">

        <Toggler
          freeSearch={this.state.freeSearch}
          choiceA="Problem/Solution"
          choiceB="Free Search"
          onChange={this.freeSearchChange.bind(this)}/>

        <div className="data-box">
          {this.props.stats.count} messages analyzed
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
              onChange={this.selectProblem.bind(this)}
              value={this.props.stats.problem} >
              <option>-select problem-</option>
              {(this.props.stats.problems || [])
                .map(p => <option key={p.key} value={p.key}>{p.key}</option>)}
            </select>
            <select
              id="solution-select"
              value={this.props.stats.solution}
              disabled={!Array.isArray(this.props.stats.solutions)}
              onChange={this.selectSolution.bind(this)}>
              <option>-select solution-</option>
              {(this.props.stats.solutions || [])
                .map(p => <option key={p.key} value={p.key}>{p.key}</option>)}
            </select>
          </div>
        }

        <Chart data={docsToDataset(this.props.stats.problems)}
          cb={this.selectProblem.bind(this)} />

        <Chart data={docsToDataset(this.props.stats.solutions)}
          cb={this.selectSolution.bind(this)} /> 

      </div>
      <div className="right-panel">
        <div className="data-box">
          <div className="box-title">
            {(this.props.stats.messages || []).length} results
          </div>
          
        </div>
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