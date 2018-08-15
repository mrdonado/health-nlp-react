import React from 'react';
import ReactDOM from 'react-dom';
import d3ChartFactory from './d3-chart';
import './chart.css';

const sameProperties = (prevProps, props)=>{
  const propsReducer = (l, d) => { return l + d.label };
  return (prevProps.data).reduce(propsReducer, "") ===
    (props.data).reduce(propsReducer, "") 
};
export default class Chart extends React.Component {

  d3Chart = d3ChartFactory();

  componentDidMount () {
    var el = ReactDOM.findDOMNode(this);
    this.d3Chart.create(el, {
      width: 650,
      height: 300
    }, this.getChartState());
  }

  componentDidUpdate (prevProps) {
    if(sameProperties(prevProps, this.props)){
      return;
    }
    this.d3Chart.cb = this.props.cb;
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
      <div className="chart"></div>
    );
  }

}
