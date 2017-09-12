import React from 'react';
import Spinner from './spinner';
import AnalysisBlock from './analysis-block';
import AnalysisForm from './analysis-form';
import './timeline.css';

export class Timeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showHelp: false };
  }

  componentDidMount = () => {
    window.scrollTo(0, 0);
    this.props.getResults();
  };

  render() {
    return <div>
      {this.props.analysis.results ? <div id='analysis-section'>
        <div className="listening"><div className="listening-spinner"></div></div>
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
        <div id="help-window"
          onClick={() => {
            this.setState({ showHelp: false });
          }}
          className={this.state.showHelp ? 'active' : ''}>
          <h3>User Tags</h3>
          <ul>
            <li><span className="user-tag news-source">News Source</span></li>
            <li><span className="user-tag doctor">Doctor</span></li>
            <li><span className="user-tag generic">Generic</span></li>
            <li><span className="user-tag health-initiative">Health Initiative</span></li>
            <li><span className="user-tag interested-in healthcare">Interested in healthcare</span></li>
            <li><span className="user-tag professional">Professional</span></li>
            <li><span className="user-tag academia">Academia</span></li>
            <li><span className="user-tag med-business">Med Business</span></li>
            <li><span className="user-tag institution">Institution</span></li>
            <li><span className="user-tag healthcare-initiative">Healthcare Initiative</span></li>
          </ul>
        </div>
        <button onClick={() => {
          this.setState({ showHelp: !this.state.showHelp });
        }} className="show-help">?</button>
        <button onClick={this.props.swapForm} className="add-analysis">+</button>
      </div> : <Spinner />}
      <AnalysisForm
        onClose={this.props.swapForm}
        opened={this.props.form.showForm}></AnalysisForm>
    </div >;
  }
};