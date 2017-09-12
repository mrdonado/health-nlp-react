import React from 'react';
import MessageBlock from './message-block';

export default class AnalysisBlock extends React.Component {

  render() {

    const userTag = this.props.result.analysis.profile
      .trim()
      .replace(' ', '-')
      .toLowerCase();

    return <li className="analysis-item" key={'analysis-' + this.props.result.id}>
      <span className="date-and-query">
        <i className={'source ' + this.props.result.source}></i>
        {this.props.result.source} - {this.props.result.created_at} <span hidden="this.props.result.query">- Query: "{this.props.result.query}"</span>
      </span>
      <div className="user-information">
        <span className="name-and-description">
          @{this.props.result.user_name}:
            <span className="description" title={this.props.result.user_description}>{this.props.result.user_description}</span>
        </span>
      </div>
      <MessageBlock item={this.props.result}></MessageBlock>
      {/* &ldquo;{this.props.result.message}&bdquo; */}
      <div className="user-analysis">
        <span className={this.props.result.analysis.health_related ? 'positive' : ''}>
          <span className="title">User Analysis: </span><span className={'user-tag ' + userTag}> {this.props.result.analysis.health_related ? this.props.result.analysis.profile
            : 'not health related'}</span>
        </span>
      </div>
    </li>;
  }
}
