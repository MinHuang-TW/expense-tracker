import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';

const BarChart = ({ data : originalData, select, width, height }) => {
  const ref = useRef(null);
  const weekList = moment.weekdays();
  const monthList = moment.months();
  const colorList = [ 'rgba(255, 255, 255, 1)', 'rgba(255, 255, 255, 0.3)' ];

  useEffect(() => {
    const data = originalData;
    const group = d3.select(ref.current);
    // const labels = data.map(d => d.text);
    const labels = select === 0 
      ? weekList : select === 1 
      ? data.map(d => d.text) : monthList;
    const maxAmount = d3.max(data, d => Math.abs(d.amount));

    const yScale = d3
      .scaleLinear()
      .domain([0, maxAmount])
      .range([0, height - 15]);

    const xScale = d3
      .scaleBand()
      .domain(labels)
      .range([0, width]);
    
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0);

    group
      .select('.x-axis')
      .style('transform', `translateY(${+height - 14}px)`)
      .style('color', 'white')
      .call(xAxis)
      .call(g => g.select(".domain").remove())
      .selectAll('.x-axis .tick text')
      .call(t => t.each(function(d) {
        const self = d3.select(this);
        const s = self.text().split(' - ');
        self.text('');
        self.append("tspan")
          .attr("x", 0)
          .attr("dy","1em")
          .text(select === 1 ? s[0] : s[0].slice(0, 3));
        select === 1 && self.append("tspan")
          .attr("x", 0)
          .attr("dy","1em")
          .text('- ' + s[1]);
      }));

    group
      .selectAll('.bar')
      .data(data)
      .join('rect')
      .attr('class', 'bar')
      .style('transform', 'scale(1, -1)')
      .attr('x', d => xScale.bandwidth() / 2 - 3 + xScale(d.text))
      .attr('y', -height + 15)
      .attr('width', 6)
      .attr('height', 0)
      .attr('fill', d => d.amount < 0 ? colorList[0] : colorList[1])
      .transition()
      .duration(1000)
      .attr('height', d => yScale(Math.abs(d.amount)));

  // eslint-disable-next-line
  }, [originalData])

  return ( 
    <svg
      width={width} 
      height={height} 
      ref={ref}
      style={{ margin: 'auto', overflow: 'visible' }}
    >
      <g className='x-axis' />
    </svg>
  );
}

export default BarChart;