import React from 'react';
import './home.css';

/**
 * It receives an item where a message is contained along with an analysis. From the analysis,
 * it identifies solution and problem (when available), and it returns a markup message where
 * problem and solution receive css classes.
 *
 * E.g.:
 *
 * 'Some message with a problem and a solution'
 *
 * produces:
 *
 * 'Some message with <strong class="problem">a problem</strong> and <strong class="solution">a solution</strong>
 *
 * @param item An analyzed job item
 * @returns message string: the markup version of the problem.
 */
const renderMessage = (item) => {
  const problemIndex = item.message.indexOf(item.analysis.problem);
  let message = item.message;
  if (problemIndex > -1 && item.analysis.problem !== '') {
    message = item.message.substring(0, problemIndex) +
      '<strong class="problem">' + item.analysis.problem +
      '</strong>' + item.message.substring(problemIndex + item.analysis.problem.length);
  }
  const solutionIndex = message.indexOf(item.analysis.solution);
  if (solutionIndex > -1) {
    message = message.substring(0, solutionIndex) +
      '<strong class="solution">' + item.analysis.solution +
      '</strong>' + message.substring(solutionIndex + item.analysis.solution.length);
  }
  return message;
};

const renderAnalysis = (data) => {
  if (typeof data.results === 'undefined') {
    return '';
  }
  const keys = Object.keys(data.results);
  let template = [];
  keys.forEach((key, idx) => {
    template.push(
      <li className="analysis-item" key={'analysis-' + idx}>
        <span className="date-and-query">
          <i className={'source ' + data.results[key].source}></i>
          {data.results[key].source} - {data.results[key].created_at} <span hidden="data.results[key].query">- Query: "{data.results[key].query}"</span>
        </span>
        <div className="user-information">
          <span className="name-and-description">
            @{data.results[key].user_name}:
            <span className="description" title={data.results[key].user_description}>{data.results[key].user_description}</span>
          </span>
        </div>
        <div className="message">
          {renderMessage(data.results[key])}
          {/* &ldquo;{data.results[key].message}&bdquo; */}
        </div>
        <div className="user-analysis">
          <span className={data.results[key].analysis.health_related ? 'positive' : ''}>
            <span className="title">User Analysis: </span> {data.results[key].analysis.health_related ? data.results[key].analysis.profile
              : 'not health related'}
          </span>
        </div>
      </li>
    );
  });
  return template;
};

export class Home extends React.Component {

  componentDidMount = () => {
    this.props.getResults();
  };

  render() {
    return <div>
      <h1>Home</h1>
      <div id='analysis-section'>
        <ul id="analysis-list">
          {this.props.analysis ? renderAnalysis(this.props.analysis) : 'no-analysis'}
          {/* Show more button as last element of the list. */}
          <li className="more-results-btn"
            onClick={() => {
              this.props.moreResults();
            }}>
            Show more
          </li>
        </ul>
      </div>
      <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>
    </div >;
  }
};