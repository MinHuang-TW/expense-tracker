import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const BarChart = ({ data : originalData, width, height }) => {
  const ref = useRef(null);
  // const cache = useRef(originalData);

  const colors = [
    'rgba(255, 255, 255, 1)',
    'rgba(255, 255, 255, 0.3)'
  ];

  useEffect(() => {
    const data = originalData;
    // const prevData = createPie(cache.current);
    const labels = data.map(d => d.text);
    const maxAmount = d3.max(data, d => Math.abs(d.amount));
    const group = d3.select(ref.current);

    const scaleY = d3
      .scaleLinear()
      .domain([0, maxAmount])
      .range([0, height]);

    const scaleX = d3
      .scaleBand()
      .domain(labels)
      .range([0, width]);

    const groupWithData = group
      .selectAll('g.rect')
      .data(data);

    groupWithData
      .exit()
      .remove();

    const groupWithUpdate = groupWithData
      .enter()
      .append('g')
      .attr('class', 'rect')

    const rect = groupWithUpdate
      .append('rect')
      .merge(groupWithData.select('rect'));

    rect
      .attr('width', 6)
      .attr('height', d => scaleY(Math.abs(d.amount)))
      .attr('fill', d => d.amount < 0 ? colors[0] : colors[1])
      .attr('x', d => scaleX.bandwidth() / 2 - 3 + scaleX(d.text))
      .attr('y', d => height - scaleY(Math.abs(d.amount)));

  // eslint-disable-next-line
  }, [originalData])

  return ( 
    <svg 
      width={width} 
      height={height} 
      ref={ref}
      style={{ margin: 'auto' }}
    />
  );
}

export default BarChart;