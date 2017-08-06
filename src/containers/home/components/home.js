import React from 'react';
import './home.css';

/**
 * It receives an item where a message is contained along with an analysis. From the analysis,
 * it identifies solution and problem (when available), and it returns a JSX message where
 * problem and solution receive elements and css classes.
 *
 * E.g.:
 *
 * 'Some message with a problem and a solution'
 *
 * produces (compiled to HTML):
 * <div class="message">
 * 'Some message with <strong class="problem">a problem</strong> and <strong class="solution">a solution</strong>
 * </div>
 *
 * @param item An analyzed job item
 * @returns generated JSX.
 */
const renderMessage = (item) => {
  const problemIndex = item.message.indexOf(item.analysis.problem),
    problemEnd = problemIndex + item.analysis.problem.length,
    solutionIndex = item.message.indexOf(item.analysis.solution),
    solutionEnd = solutionIndex + item.analysis.solution.length,
    message = item.message;

  // First case: problem first, solution after the problem
  if (problemIndex < solutionIndex) {
    let beforeText = message.substring(0, problemIndex - 1),
      problem = message.substring(problemIndex, problemEnd),
      betweenText = message.substring(problemEnd + 1, solutionIndex - 1),
      solution = message.substring(solutionIndex, solutionEnd),
      afterText = message.substring(solutionEnd + 1);
    return <div className="message">
      {beforeText} {/* Text before the problem */}
      <strong className="problem">{problem}</strong>
      {betweenText} {/* Text between the problem and the solution */}
      <strong className="solution">{solution}</strong>
      {afterText} {/* Text after the solution */}
    </div>;
  }
  let beforeText = message.substring(0, solutionIndex - 1),
    solution = message.substring(solutionIndex, solutionEnd),
    betweenText = message.substring(solutionEnd + 1, problemIndex - 1),
    problem = message.substring(problemIndex, problemEnd),
    afterText = message.substring(problemEnd + 1);
  // Second case: solution first, problem after
  return <div className="message">
    {beforeText} {/* Text before the solution */}
    <strong className="solution">{solution}</strong>
    {betweenText} {/* Text between the solution and the problem */}
    <strong className="problem">{problem}</strong>
    {afterText} {/* Text after the problem */}
  </div>;
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
        {renderMessage(data.results[key])}
        {/* &ldquo;{data.results[key].message}&bdquo; */}
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
      {/* <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p> */}
    </div >;
  }
};