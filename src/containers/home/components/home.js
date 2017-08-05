import React from 'react';
import './home.css';

const renderAnalysis = (data) => {
  if (typeof data.results === 'undefined') {
    return '';
  }
  const keys = Object.keys(data.results);
  let template = [];
  keys.forEach((key, idx) => {
    template.push(
      <li className="analysis-item" key={'analysis-' + idx}>
        {data.results[key].analysis.problem}
        <span class="date-and-query">
          <i class="source" className="{data.results[key].source}"></i>
          {data.results[key].source} - {data.results[key].created_at} <span hidden="data.results[key].query">- Query: "{data.results[key].query}"</span>
        </span>
        <div class="user-information">
          <span class="name-and-description">
            @{data.results[key].user_name}:
            <span class="description" title="{data.results[key].user_description}">{data.results[key].user_description}</span>
          </span>
        </div>
        <div class="message"
          innerHTML="formatMessage(item)">
          &ldquo;{data.results[key].message}&bdquo;
        </div>
        <div class="user-analysis">
          <span className="{'positive': data.results[key].analysis.health_related}">
            <span class="title">User Analysis: </span> {data.results[key].analysis.health_related ? data.results[key].analysis.profile
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

  componentDidUpdate = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };

  render() {
    return <div>
      <h1>Home</h1>
      <div id='analysis-section'>
        <ul id="analysis-list">
          {this.props.analysis ? renderAnalysis(this.props.analysis) : 'no-analysis'}
        </ul>
      </div>
      <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>
      <p><button onClick={() => {
        this.props.moreResults();
      }
      }>More results</button></p>
    </div>;
  }
};