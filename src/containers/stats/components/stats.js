import React from 'react';
import './stats.css';
import AnalysisList from '../../timeline/components/analysis-list';
import Spinner from '../../../utilities/spinner';
import Toggler from './toggler';
import Chart from './charts/chart';
import docsToDatasetFn from './data-functions/docs-to-dataset';
import { Combobox } from 'react-input-enhancements';

const OTHERS_LABEL = 'others';
const SHIFT_STEP = 12;

const docsToDataset = docsToDatasetFn(SHIFT_STEP);

export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      resultsDisplayed: 5,
      searchString: '',
      freeSearch: false,
      problemsOffset: 0,
      solutionsOffset: 0
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

  resetStats() {
    this.setState({ problemsOffset: 0, solutionsOffset: 0 });
    this.props.resetStats();
  }

  selectSolution(elem) {
    if(!elem) {
      this.resetStats();
      return;
    }
    const solution = elem.target ? elem.target.value : elem;
    if (solution === OTHERS_LABEL) {
      this.setState({ solutionsOffset: this.state.solutionsOffset + SHIFT_STEP });
      return;
    }
    this
      .props
      .fetchMessagesForProblemSolution(this.props.stats.problem, solution);
  }

  selectProblem(elem) {
    if(!elem) {
      this.resetStats();
      return;
    }
    const problem = elem.target ? elem.target.value : elem;
    this.setState({ solutionsOffset: 0 });
    if (problem === OTHERS_LABEL) {
      this.setState({ problemsOffset: this.state.problemsOffset + SHIFT_STEP });
      return;
    }
    this
      .props
      .fetchSolutionsToProblem(problem)
  }

  render() {

    if (typeof this.props.stats.count === 'undefined') {
      return <Spinner />;
    }

    return <div className="main-content stats-grid">
      <div className="top-panel">

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
            <Combobox value={this.props.stats.problem || ''}
              options={[{ static: true, text: '-reset-' },
                ...(this.props.stats.problems || [])
                .map(p => p.key)]}
              autosize
              placeholder="Select a problem"
              onSelect={this.selectProblem.bind(this)}
              autocomplete>
              {(inputProps, { matchingText, width }) =>
                <input id="problem-select"
                  placeholder="Select a problem"
                  type='text' {...inputProps} />
              }
            </Combobox>
            <Combobox
              value={this.props.stats.solution || ''}
              options={[{ static: true, text: '-reset-' },
                ...(this.props.stats.solutions || []).map(p => p.key)]}
              disabled={!Array.isArray(this.props.stats.solutions)}
              onSelect={this.selectSolution.bind(this)}>
              {(inputProps, { matchingText, width }) =>
                <input id="solution-select"
                 type='text' {...inputProps} />
              }             
            </Combobox>
          </div>
        }

          <div className="chart-wrapper">

          <div className="chart-title">Problems ({SHIFT_STEP + this.state.problemsOffset} of {(this.props.stats.problems || []).length})</div>

            <Chart data={docsToDataset(this.props.stats.problems,
              this.state.problemsOffset)}
              cb={this.selectProblem.bind(this)} />

          </div>

        <div className="chart-wrapper">

            <div className="chart-title">Solutions for {this.props.stats.problem} ({SHIFT_STEP + this.state.solutionsOffset} of {(this.props.stats.solutions || []).length})</div>

          <Chart data={docsToDataset(this.props.stats.solutions,
            this.state.solutionsOffset)}
            cb={this.selectSolution.bind(this)} />

        </div>

      </div>

      <div className="bottom-panel">
        <div className="data-box">
          <div className="box-title">
            {(this.props.stats.messages || []).length} results (problem: {this.props.stats.problem} / solution: {this.props.stats.solution})
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