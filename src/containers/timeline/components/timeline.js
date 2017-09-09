import React from 'react';
import Spinner from './spinner';
import AnalysisBlock from './analysis-block';
import AnalysisForm from './analysis-form';
import './timeline.css';

export class Timeline extends React.Component {

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.props.getResults();
  };

  render() {
    return <div>
      {this.props.analysis.results ? <div id='analysis-section'>
        <ul id="analysis-list">
          {this.props
            .analysis
            .results
            .map(result =>
              <AnalysisBlock key={'analysis-' + result.id} result={result}></AnalysisBlock>)
          }
          {/* Show more button as last element of the list. */}
          <li className="more-results-btn"
            onClick={() => {
              this.props.moreResults();
            }}>
            Show more
          </li>
        </ul>
        <button onClick={this.props.swapForm} className="add-analysis">+</button>
      </div> : <Spinner />}
      <AnalysisForm
        onClose={this.props.swapForm}
        opened={this.props.form.showForm}></AnalysisForm>
    </div >;
  }
};