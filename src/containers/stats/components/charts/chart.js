import React from 'react';
import ReactDOM from 'react-dom';
import d3ChartFactory from './d3-chart';
import './chart.css';

export default class Chart extends React.Component {

  d3Chart = d3ChartFactory();

  componentDidMount () {
    var el = ReactDOM.findDOMNode(this);
    this.d3Chart.create(el, {
      width: 650,
      height: 300
    }, this.getChartState());
  }

  componentDidUpdate () {
    var el = ReactDOM.findDOMNode(this);
    this.d3Chart.update(el, this.getChartState());
  }

  getChartState () {
    return {
      dataset: this.props.data
    };
  }

  componentWillUnmount () {
    var el = ReactDOM.findDOMNode(this);
    this.d3Chart.destroy(el);
  }

  render () {
    return (
      <div className="Chart"></div>
    );
  }

}
