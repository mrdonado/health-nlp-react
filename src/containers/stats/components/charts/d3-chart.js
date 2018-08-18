import * as d3 from 'd3';

const d3ChartFactory = function () {
  // legend dimensions
  const legendRectSize = 15; // defines the size of the colored squares in legend
  const legendSpacing = 6; // defines spacing between squares

  const d3Chart = {
    cb: () => { } // This callback can later be reassigned
  };

  let radius, width, height;

  d3Chart.create = function (el, props, state) {
    width = props.width;
    height = props.height;
    // a circle chart needs a radius
    radius = Math.min(width, height) / 2;

    d3Chart.svg = d3.select(el) 
      .append('svg') 
      .attr('width', width) 
      .attr('height', height)
      .append('g') 
      .style('transform', 'translate(40%, 50%)')

    // define tooltip
    d3Chart.tooltip = d3.select(el) 
      .append('div')
      .attr('class', 'tooltip'); 

    d3Chart.tooltip.append('div') 
      .attr('class', 'label'); 

    d3Chart.tooltip.append('div') 
      .attr('class', 'count'); 

    d3Chart.tooltip.append('div') 
      .attr('class', 'percent'); 

    d3Chart.arc = d3.arc()
      .innerRadius(100) 
      .outerRadius(radius); 

    d3Chart.pie = d3.pie() 
      .value(function (d) { return d.count; }) 
      .sort(null); 

    const { dataset } = state;

    dataset.forEach(function (d) {
      d.count = +d.count; // calculate count as we iterate through the data
      d.enabled = true; // add enabled property to track which entries are checked
    });

    // creating the chart
    d3Chart.path = d3Chart.svg
      .selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
      .data(d3Chart.pie(dataset)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
      .enter() //creates placeholder nodes for each of the values
      .append('path'); // replace placeholders with path elements

    d3Chart.svg.selectAll('path').exit().remove();

    this.update(el, state);
  };

  d3Chart.update = function (el, state) {
    const { dataset } = state;

    d3Chart.color = d3.scaleOrdinal(d3.schemeCategory10);

    dataset.forEach(function (d) {
      d.count = +d.count; // calculate count as we iterate through the data
      d.enabled = true; // add enabled property to track which entries are checked
    });


    // creating the chart
    d3Chart.path = d3Chart.svg
      .selectAll('path') // select all path elements inside the svg. specifically the 'g' element. they don't exist yet but they will be created below
      .data(d3Chart.pie(dataset)) //associate dataset wit he path elements we're about to create. must pass through the pie function. it magically knows how to extract values and bakes it into the pie
      .enter() //creates placeholder nodes for each of the values
      .append('path') // replace placeholders with path elements
      .attr('class', 'clickable-path')
      .on('click', (d) => d3Chart.cb(d.data.label))
      .merge(d3Chart.path)
      .attr('d', d3Chart.arc) // define d attribute with arc function above
      .attr('fill', function (d) { return d3Chart.color(d.data.label); }) // use color scale to define fill of each label in dataset
      .each(function (d) { return this._current - d; }); // creates a smooth animation for each track


    d3Chart.path.transition() // transition of redrawn pie
      .duration(750) // 
      .attrTween('d', function (d) { // 'd' specifies the d attribute that we'll be animating
        const interpolate = d3.interpolate(this._current, d); // this = current path element
        this._current = interpolate(0); // interpolate between current value and the new value of 'd'
        return function (t) {
          return d3Chart.arc(interpolate(t));
        };
      });


    // mouse event handlers are attached to path so they need to come after its definition
    d3Chart.path.on('mouseover', function (d) {  // when mouse enters div
      var total = d3.sum(dataset.map(function (d) { // calculate the total number of tickets in the dataset
        return (d.enabled) ? d.count : 0; // checking to see if the entry is enabled. if it isn't, we return 0 and cause other percentages to increase  
      }));
      var percent = Math.round(1000 * d.data.count / total) / 10; // calculate percent
      d3Chart.tooltip.select('.label').html(d.data.label);
      d3Chart.tooltip.select('.count').html(d.data.count);
      d3Chart.tooltip.select('.percent').html(percent + '%');
      d3Chart.tooltip.classed('active', true);
    });

    d3Chart.path.on('mouseout', function () { // when mouse leaves div
      d3Chart.tooltip.classed('active', false);
    });

    d3Chart.path.on('mousemove', function (d) { // when mouse moves
      d3Chart.tooltip.style('top', (d3.event.layerY + 10) + 'px') // always 10px below the cursor
        .style('left', (d3.event.layerX + 10) + 'px'); // always 10px to the right of the mouse
    });

    //d3.select(el).selectAll('g.legend-wrapper *').remove();
    if (d3Chart.legend) {
      d3Chart.legend.remove();
    }

    // define legend
    d3Chart.legend = d3.select(el)
      .select('svg')
      .append('g')
      .attr('class', 'legend-wrapper')
      .style('transform', 'translate(50%, 50%)')
      .selectAll('.legend') // selecting elements with class 'legend'
      .data(d3Chart.color.domain()) // refers to an array of labels from our dataset
      .enter() // creates placeholder
      .append('g') // replace placeholders with g elements
      .attr('class', 'legend') // each g is given a legend class
      .attr('transform', function (d, i) {
        const height = legendRectSize + legendSpacing; // height of element is the height of the colored square plus the spacing
        const offset = height * d3Chart.color.domain().length / 2; // vertical offset of the entire legend = height of a single element & half the total number of elements  
        const horz = 8 * legendRectSize; // the legend is shifted to the left to make room for the text
        const vert = i * height - offset; // the top of the element is hifted up or down from the center using the offset defiend earlier and the index of the current element 'i'
        return 'translate(' + horz + ',' + vert + ')'; //return translation 
      });

    // adding colored squares to legend
    d3Chart.legend.append('rect') // append rectangle squares to legend
      .attr('width', legendRectSize) // width of rect size is defined above
      .attr('height', legendRectSize) // height of rect size is defined above 
      .style('fill', d3Chart.color) // each fill is passed a color
      .style('stroke', d3Chart.color) // each stroke is passed a color
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

        d3Chart.pie.value(function (d) {
          if (d.label === label) d.enabled = enabled; // if entry label matches legend label
          return (d.enabled) ? d.count : 0; // update enabled property and return count or 0 based on the entry's status
        });

        d3Chart.path = d3Chart.path.data(d3Chart.pie(dataset)); // update pie with new data

        d3Chart.path.transition() // transition of redrawn pie
          .duration(750) // 
          .attrTween('d', function (d) { // 'd' specifies the d attribute that we'll be animating
            const interpolate = d3.interpolate(this._current, d); // this = current path element
            this._current = interpolate(0); // interpolate between current value and the new value of 'd'
            return function (t) {
              return d3Chart.arc(interpolate(t));
            };
          });
      });

    d3Chart.legend.append('text')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d; })
      .on('click', (t) => { d3Chart.cb(t) }); 
  };

  d3Chart.destroy = function (el) {
    // Any clean-up would go here
    // in this example there is nothing to do
  };

  return d3Chart;

};

export default d3ChartFactory;
