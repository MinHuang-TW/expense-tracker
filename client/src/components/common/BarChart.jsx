import React, { useEffect, useRef } from 'react';
import moment from 'moment';
import * as d3 from 'd3';

const BarChart = ({ data, keys, select, width, height }) => {
  const ref = useRef(null);
  const barWidth = 6;
  const colorList = { income: 'rgba(255, 255, 255, 0.3)', expense: '#fff' };

  const dayList = moment.weekdays();
  const monthList = moment.months();
  const weekList = [];

  const firstDay = moment().startOf('month');
  const lastDay = moment().endOf('month');
  const monthRange = moment.range(firstDay, lastDay);
  for (let mday of monthRange.by('days')) {
    if (weekList.indexOf(mday.week()) === -1) {
      weekList.push('Week ' + mday.week());
    }
  }
  data.forEach((data) => (data['expense'] = Math.abs(data['expense'])));

  useEffect(() => {
    const svg = d3.select(ref.current);
    const labels = select === 0 ? dayList : select === 1 ? weekList : monthList;
    const stackGenerator = d3.stack().keys(keys).order(d3.stackOrderReverse);
    const layers = stackGenerator(data);
    const maxAmount = d3.max(layers, (layer) =>
      d3.max(layer, (seq) => Math.abs(seq[1]))
    );
    const extent = [0, maxAmount];
    const yScale = d3.scaleLinear().domain(extent).range([height, 0]);
    const xScale = d3.scaleBand().domain(labels).range([0, width]);
    const paddingLeft = (xScale.bandwidth() - barWidth) / 2;
    const xAxis = d3
      .axisBottom(xScale)
      .tickFormat((d) => (select === 1 ? d : d.slice(0, 3)))
      .tickSize(0);

    svg
      .select('.x-axis')
      .style('transform', `translateY(${height}px)`)
      .style('color', 'white')
      .call(xAxis)
      .call((g) => g.select('.domain').remove())
      .selectAll('.x-axis .tick text')
      .attr('dy', '1em');

    svg
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => colorList[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      .attr('x', (seq) => paddingLeft + xScale(seq.data.text))
      .attr('width', barWidth)
      .attr('y', height)
      .attr('height', 0)
      .transition()
      .duration(1000)
      .attr('y', (seq) => yScale(seq[1]))
      .attr('height', (seq) => yScale(seq[0]) - yScale(seq[1]));

    // eslint-disable-next-line
  }, [data]);

  return (
    <svg width={width} height={height} ref={ref} className='center-align'>
      <g className='x-axis' />
    </svg>
  );
};

export default BarChart;
