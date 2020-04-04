import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const PieChart = ({ data : originalData, width, height, outerRadius, innerRadius }) => {
  const ref = useRef(null);
  const cache = useRef(originalData);

  const createPie = d3
    .pie()
    .value(d => d)
    .sort(null);
  
    const createArc = d3
      .arc()
      .outerRadius(outerRadius)
      .innerRadius(innerRadius);

    const colors = [
      'rgba(255, 255, 255, 1)', 
      'rgba(255, 255, 255, 0.3)'
    ];
    // const format = d3.format('.2f');

    useEffect(() => {
      const data = createPie(originalData);
      const prevData = createPie(cache.current);
      const group = d3.select(ref.current);
      const groupWithData = group.selectAll('g.arc').data(data);

      groupWithData.exit().remove();

      const groupWithUpdate = groupWithData
        .enter()
        .append('g')
        .attr('class', 'arc');

      const path = groupWithUpdate
        .append('path')
        .merge(groupWithData.select('path.arc'));

      const arcTween = (d, i) => {
        const interpolator = d3.interpolate(prevData[i], d);
        return t => createArc(interpolator(t));
      };
      path
        .attr('class', 'arc')
        .attr('d', createArc)
        .attr('fill', (d, i) => colors[i])
        .transition()
        .duration(750)
        .attrTween('d', arcTween);
    // eslint-disable-next-line
    }, [originalData])
    
  return ( 
    <svg width={width} height={height}>
      <g ref={ref} transform={`translate(${outerRadius} ${outerRadius})`} />
    </svg>
  );
}

export default PieChart;