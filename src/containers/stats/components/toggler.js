import React from 'react';
import './slider.css';

export default class Toggler extends React.Component {
  render() {
    return <div>
      <label className={
        "toggler " + (!this.props.freeSearch &&
          "toggler--is-active")
      }
        id="p-s-search">{this.props.choiceA}</label>
      <div className="toggle">
        <input type="checkbox" id="switcher"
          onChange={this.props.onChange}
          className="check" />
        <b className="b switch"></b>
      </div>
      <label className={
        "toggler " + (this.props.freeSearch && " toggler--is-active")
      }
        id="free-search">{this.props.choiceB}</label>
    </div>;
  } 
}