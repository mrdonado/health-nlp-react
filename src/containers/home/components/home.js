import React from 'react';
import Spinner from './spinner';
import AnalysisBlock from './analysis-block';
import AnalysisForm from './analysis-form';
import './home.css';

export class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showForm: false };
  }

  componentDidMount = () => {
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
        <button onClick={() => {
          this.setState({ showForm: !this.state.showForm });
        }} className="add-analysis">+</button>
      </div> : <Spinner />}
      <AnalysisForm
        onClose={() => {
          this.setState({ showForm: false });
        }}
        opened={this.state.showForm}></AnalysisForm>
    </div >;
  }
};