import React from 'react';
import Spinner from './spinner';
import MessageBlock from './message-block';
import './home.css';



const renderAnalysis = (data) => {
  if (typeof data.results === 'undefined') {
    return '';
  }
  const keys = Object.keys(data.results);
  let template = [];
  keys.forEach((key, idx) => {
    template.push(
      <li className="analysis-item" key={'analysis-' + data.results[key].id}>
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
        <MessageBlock item={data.results[key]}></MessageBlock>
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
      {this.props.analysis.results ? <div id='analysis-section'>
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
      </div> : <Spinner />}

    </div >;
  }
};