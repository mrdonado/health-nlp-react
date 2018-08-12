import * as d3 from 'd3';


/*
// legend dimensions
const legendRectSize = 25; // defines the size of the colored squares in legend
const legendSpacing = 6; // defines spacing between squares
*/

// define color scale
const color = d3.scaleOrdinal(d3.schemeCategory10);
// more color scales: https://bl.ocks.org/pstuffa/3393ff2711a53975040077b7453781a9

const d3Chart = {};

let radius, width, height;

d3Chart.create = function(el, props, state) {

  width = props.width;
  height = props.height;

  // a circle chart needs a radius
  radius = Math.min(width, height) / 2;
  this.update(el, state);

};

d3Chart.update = function(el, state) {

  const { dataset } = state;

  d3.select(el).select('svg').remove();

  const svg = d3.select(el) // select element in the DOM with id 'chart'
    .append('svg') // append an svg element to the element we've selected
    .attr('width', width) // set the width of the svg element we just added
    .attr('height', height) // set the height of the svg element we just added
    .append('g') // append 'g' element to the svg element
    .attr('transform', 'translate(' + (width / 2) + ',' + (height / 2) + ')'); // our reference is now to the 'g' element. centerting the 'g' element to the svg element

  // define tooltip
  /*
  tooltip = d3.select(el) // select element in the DOM with id 'chart'
    .append('div') // append a div element to the element we've selected                                    
    .attr('class', 'tooltip'); // add class 'tooltip' on the divs we just selected

  tooltip.append('div') // add divs to the tooltip defined above                            
    .attr('class', 'label'); // add class 'label' on the selection                         

  tooltip.append('div') // add divs to the tooltip defined above                     
    .attr('class', 'count'); // add class 'count' on the selection                  

  tooltip.append('div') // add divs to the tooltip defined above  
    .attr('class', 'percent'); // add class 'percent' on the selection
    */


  const arc = d3.arc()
    .innerRadius(0) // none for pie chart
    .outerRadius(radius); // size of overall chart

  const pie = d3.pie() // start and end angles of the segments
    .value(function (d) { return d.count; }) // how to extract the numerical data from each entry in our dataset
    .sort(null); // by default, data sorts in oescending value. this will mess with our animation so we set it to null
  dataset.forEach(function (d) {
    d.count = +d.count; // calculate count as we iterate through the data
    d.enabled = true; // add enabled property to track which entries are checked
  });

  // creating the chart
  let path = svg
    .selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
    .data(pie(dataset)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
    .enter() //creates placeholder nodes for each of the values
    .append('path') // replace placeholders with path elements
    .attr('d', arc) // define d attribute with arc function above
    .attr('fill', function (d) { return color(d.data.label); }) // use color scale to define fill of each label in dataset
    .each(function (d) { return this._current - d; }); // creates a smooth animation for each track

  // mouse event handlers are attached to path so they need to come after its definition
  path.on('mouseover', function (d) {  // when mouse enters div      
    /*
    var total = d3.sum(dataset.map(function (d) { // calculate the total number of tickets in the dataset         
      return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase                                      
    }));
    var percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
    tooltip.select('.label').html(d.data.label); // set current label           
    tooltip.select('.count').html('$' + d.data.count); // set current count            
    tooltip.select('.percent').html(percent + '%'); // set percent calculated above          
    tooltip.style('display', 'block'); // set display                     
    */
  });

  path.on('mouseout', function () { // when mouse leaves div                        
    /*
    tooltip.style('display', 'none'); // hide tooltip for that element
    */
  });

  path.on('mousemove', function (d) { // when mouse moves                  
    /*
    tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
      .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
      */
  });

  // define legend
  /*
  const legend = d3.select(el).select('svg').selectAll('.legend') // selecting elements with class 'legend'
    .data(color.domain()) // refers to an array of labels from our dataset
    .enter() // creates placeholder
    .append('g') // replace placeholders with g elements
    .attr('class', 'legend') // each g is given a legend class
    .attr('transform', function (d, i) {
      const height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing      
      const offset = height * color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
      const horz = 8 * legendRectSize; // the legend is shifted to the left to make room for the text
      const vert = i * height - offset; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'               
      return 'translate(' + horz + ',' + vert + ')'; //return translation       
    });

  // adding colored squares to legend
  legend.append('rect') // append rectangle squares to legend                                   
    .attr('width', legendRectSize) // width of rect size is defined above                        
    .attr('height', legendRectSize) // height of rect size is defined above                      
    .style('fill', color) // each fill is passed a color
    .style('stroke', color) // each stroke is passed a color
    .on('click', function (label) {
      const rect = d3.select(this); // this refers to the colored squared just clicked
      let enabled = true; // set enabled true to default
      const totalEnabled = d3.sum(dataset.map(function (d) { // can't disable all options
        return (d.enabled) ? 1 : 0; // return 1 for each enabled entry. and summing it up
      }));

      if (rect.attr('class') === 'disabled') { // if class is disabled
        rect.attr('class', ''); // remove class disabled
      } else { // else
        if (totalEnabled < 2) return; // if less than two labels are flagged, exit
        rect.attr('class', 'disabled'); // otherwise flag the square disabled
        enabled = false; // set enabled to false
      }

      pie.value(function (d) {
        if (d.label === label) d.enabled = enabled; // if entry label matches legend label
        return (d.enabled) ? d.count : 0; // update enabled property and return count or 0 based on the entry's status
      });

      path = path.data(pie(dataset)); // update pie with new data

      path.transition() // transition of redrawn pie
        .duration(750) // 
        .attrTween('d', function (d) { // 'd' specifies the d attribute that we'll be animating
          const interpolate = d3.interpolate(this._current, d); // this = current path element
          this._current = interpolate(0); // interpolate between current value and the new value of 'd'
          return function (t) {
            return arc(interpolate(t));
          };
        });
    });

  // adding text to legend
  legend.append('text')
    .attr('x', legendRectSize + legendSpacing)
    .attr('y', legendRectSize - legendSpacing)
    .text(function (d) { return d; }); // return label
    */


  // Re-compute the scales, and render the data points
  /*
  var scales = this._scales(el, state.domain);
  this._drawPoints(el, scales, state.data);
  */
};

d3Chart.destroy = function(el) {
  // Any clean-up would go here
  // in this example there is nothing to do
};

d3Chart._scales = function(el, domain) {
  /*
  if (!domain) {
    return null;
  }
  var width = el.offsetWidth;
  var height = el.offsetHeight;
  var x = d3.scaleLinear()
    .range([0, width])
    .domain(domain.x);
  var y = d3.scaleLinear()
    .range([height, 0])
    .domain(domain.y);
  var z = d3.scaleLinear()
    .range([5, 20])
    .domain([1, 10]);
  return {x: x, y: y, z: z};
  */
};


d3Chart._drawPoints = function(el, scales, data) {
  /*
  var g = d3.select(el).selectAll('.d3-points');
  var point = g.selectAll('.d3-point')
    .data(data, function(d) { return d.id; });
  // ENTER
  point.enter().append('circle')
      .attr('class', 'd3-point');
  // ENTER & UPDATE
  point.attr('cx', function(d) { return scales.x(d.x); })
      .attr('cy', function(d) { return scales.y(d.y); })
      .attr('r', function(d) { return scales.z(d.z); });
  // EXIT
  point.exit()
      .remove();
  */
};

export default d3Chart;