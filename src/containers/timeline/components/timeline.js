import React from 'react';
import Spinner from './spinner';
import AnalysisList from './analysis-list';
import { HelpWindow } from './help-window';
import AnalysisForm from './analysis-form';
import './timeline.css';

export class Timeline extends React.Component {

  constructor(props) {
    super(props);
    this.state = { showHelp: false };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.getResults();
  }

  render() {
    return <div>
      {this.props.analysis.results ? <div id='analysis-section'>
        <div className="listening"><div className="listening-spinner"></div></div>
        <AnalysisList analysis={this.props.analysis}
          moreResults={this.props.moreResults}>
        </AnalysisList>
        <HelpWindow
          showHelp={this.state.showHelp}
          closeWindow={(e) => {
            e.preventDefault();
            this.setState({ showHelp: false });
          }}
        ></HelpWindow>
        <button onClick={() => {
          this.setState({ showHelp: !this.state.showHelp });
        }} className="show-help">?</button>
        <button onClick={this.props.swapForm} className="add-analysis">+</button>
      </div> : <Spinner />}
      <AnalysisForm
        onClose={this.props.swapForm}
        onSubmit={(values) => {
          const data = {
            source: 'web',
            user_name: values.user_name,
            user_description: values.user_description,
            message: values.message
          };
          fetch('https://health-nlp.api.jdonado.com/analysis',
            {
              method: 'POST',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(data)
            }).then((response) => {
              return response.json();
            }).then((data) => {
              this.props.swapForm();
            }).catch(() => {
              this.props.swapForm();
            });
        }}
        opened={this.props.formWindow.showForm}></AnalysisForm>
    </div >;
  }
};