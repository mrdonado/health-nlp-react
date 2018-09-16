import * as d3 from 'd3';

const d3ChartFactory = function () {
  
  const legendRectSize = 15; // defines the size of the colored squares in legend
  const legendSpacing = 6; 

  const d3Chart = {
    cb: () => { } 
  };

  let radius, width, height;

  d3Chart.create = function (el, props, state) {

    width = props.width;
    height = props.height;
    const translateX = props.width / 2 - 60;
    const translateY = props.height / 2;
    
    radius = Math.min(width, height) / 2;

    d3Chart.svg = d3.select(el)
      .append('svg')
      .attr('width', '100%')
      .attr('height', '100%')
      .attr('height', '100%')
      .attr('viewBox', `-0 -0 ${width} ${height}`)
      .attr('preserveAspectRatio', 'xMinYMin')
      .append('g')
      .attr('transform', `translate(${translateX}, ${translateY})`)

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

    const dataset = [{ count: 1, label: '-select solution-' },
    { count: 1, label: '-select solution-' }];

    
    d3Chart.path = d3Chart.svg
      .selectAll('path') 
      .data(d3Chart.pie(dataset)) 
      .enter() 
      .append('path'); 

    d3Chart.svg.selectAll('path').exit().remove();

    this.update(el, state);
  };

  d3Chart.update = function (el, state) {
    let { dataset } = state;

    if (!dataset || dataset.length === 0) {
      dataset = [{ count: 1, label: '-select solution-' }];
    }

    if(d3Chart.svg.selectAll('path').data().length > dataset.length) {
      d3Chart.svg.selectAll('path').remove();
    }

    const colorRange = d3
      .scaleLinear()
      .domain([1, dataset.length])
      .interpolate(d3.interpolateHcl)
      .range(["#3f2a72", "#ebebeb"]);

    d3Chart.color = d3.scaleOrdinal()
      .domain(dataset.map(d => d.label))
      .range(dataset.map((d, i) => colorRange(i)));


    dataset.forEach(function (d) {
      d.count = +d.count; 
      d.enabled = true; // add enabled property to track which entries are checked
    });


    // creating the chart
    d3Chart.path = d3Chart.svg
      .selectAll('path') 
      .data(d3Chart.pie(dataset)) 
      .enter() 
      .append('path') 
      .attr('class', 'clickable-path')
      .on('click', (d) => d3Chart.cb(d.data.label))
      .merge(d3Chart.path)
      .attr('d', d3Chart.arc) 
      .attr('fill', function (d) { return d3Chart.color(d.data.label); }) 
      .each(function (d) { return this._current - d; }); 


    d3Chart.path.transition() 
      .duration(750) 
      .attrTween('d', function (d) { 
        const interpolate = d3.interpolate(this._current, d); 
        this._current = interpolate(0); 
        return function (t) {
          return d3Chart.arc(interpolate(t));
        };
      });


    
    d3Chart.path.on('mouseover', function (d) {  
      var total = d3.sum(dataset.map(function (d) { 
        return (d.enabled) ? d.count : 0; 
      }));
      var percent = Math.round(1000 * d.data.count / total) / 10; 
      d3Chart.tooltip.select('.label').html(d.data.label);
      d3Chart.tooltip.select('.count').html(d.data.count);
      d3Chart.tooltip.select('.percent').html(percent + '%');
      d3Chart.tooltip.classed('active', true);
    });

    d3Chart.path.on('mouseout', function () { 
      d3Chart.tooltip.classed('active', false);
    });

    d3Chart.path.on('mousemove', function (d) { 
      d3Chart.tooltip.style('top', (d3.event.layerY + 10) + 'px') 
        .style('left', (d3.event.layerX + 10) + 'px'); 
    });

    if (d3Chart.legend) {
      d3Chart.legend.remove();
    }

    
    d3Chart.legend = d3.select(el)
      .select('svg')
      .append('g')
      .attr('class', 'legend-wrapper')
      .style('transform', 'translate(50%, 50%)')
      .selectAll('.legend') 
      .data(d3Chart.color.domain()) 
      .enter() 
      .append('g') 
      .attr('class', 'legend') 
      .attr('transform', function (d, i) {
        const height = legendRectSize + legendSpacing; 
        const offset = height * d3Chart.color.domain().length / 2; 
        const horz = 8 * legendRectSize; 
        const vert = i * height - offset; 
        return 'translate(' + horz + ',' + vert + ')'; 
      });

    
    d3Chart.legend.append('rect') 
      .attr('width', legendRectSize) 
      .attr('height', legendRectSize) 
      .style('fill', d3Chart.color) 
      .style('stroke', d3Chart.color) 
      .on('click', function (label) {
        const rect = d3.select(this); 
        let enabled = true; 
        const totalEnabled = d3.sum(dataset.map(function (d) { 
          return (d.enabled) ? 1 : 0; 
        }));

        if (rect.attr('class') === 'disabled') { 
          rect.attr('class', ''); 
        } else { 
          if (totalEnabled < 2) return; 
          rect.attr('class', 'disabled'); 
          enabled = false; 
        }

        d3Chart.pie.value(function (d) {
          if (d.label === label) d.enabled = enabled; 
          return (d.enabled) ? d.count : 0; 
        });

        d3Chart.path = d3Chart.path.data(d3Chart.pie(dataset)); 

        d3Chart.path.transition() 
          .duration(750) 
          .attrTween('d', function (d) { 
            const interpolate = d3.interpolate(this._current, d); 
            this._current = interpolate(0); 
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
