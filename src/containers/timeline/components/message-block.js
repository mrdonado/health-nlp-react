import React from 'react';
import UrlToA from './url-to-a';

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
export default class MessageBlock extends React.Component {
  render() {
    const problemIndex = this.props.item.message.indexOf(this.props.item.analysis.problem),
      problemEnd = problemIndex + this.props.item.analysis.problem.length,
      solutionIndex = this.props.item.message.indexOf(this.props.item.analysis.solution),
      solutionEnd = solutionIndex + this.props.item.analysis.solution.length,
      message = this.props.item.message;

    // Special case: no solution found.
    if (this.props.item.analysis.solution === '<nothing_found>') {
      return <div className="message">
        {message}
      </div>;
    }

    // First case: problem first, solution after the problem
    if (problemIndex < solutionIndex) {
      let beforeText = message.substring(0, problemIndex - 1),
        problem = message.substring(problemIndex, problemEnd),
        betweenText = message.substring(problemEnd + 1, solutionIndex - 1),
        solution = message.substring(solutionIndex, solutionEnd),
        afterText = message.substring(solutionEnd + 1);
      return <div className="message">
        <UrlToA text={beforeText}></UrlToA> {/* Text before the solution */}
        <i className="problem">{problem}</i>
        {betweenText} {/* Text between the problem and the solution */}
        <i className="solution">{solution}</i>
        <UrlToA text={afterText}></UrlToA> {/* Text after the problem */}
      </div>;
    }
    let beforeText = message.substring(0, solutionIndex - 1),
      solution = message.substring(solutionIndex, solutionEnd),
      betweenText = message.substring(solutionEnd + 1, problemIndex - 1),
      problem = message.substring(problemIndex, problemEnd),
      afterText = message.substring(problemEnd + 1);
    // Second case: solution first, problem after
    return <div className="message">
      <UrlToA text={beforeText}></UrlToA> {/* Text before the solution */}
      <i className="solution">{solution}</i>
      {betweenText} {/* Text between the solution and the problem */}
      <i className="problem">{problem}</i>
      <UrlToA text={afterText}></UrlToA> {/* Text after the problem */}
    </div>;
  }
}