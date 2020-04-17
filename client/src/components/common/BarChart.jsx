import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { stackOrderAscending } from 'd3';

const BarChart = ({ data, keys, select, width, height }) => {
  const ref = useRef(null);
  const weekList = moment.weekdays();
  const monthList = moment.months();
  const colorList = {
    income: '#fff',
    expense: '#f8777d',
  };

  useEffect(() => {
    const group = d3.select(ref.current);
    // const labels = data.map(d => d.text);
    const labels =
      select === 0
        ? weekList
        : select === 1
        ? data.map((d) => d.text)
        : monthList;

    data.forEach((data) => (data['expense'] = Math.abs(data['expense'])));
    const stackGenerator = d3.stack().keys(keys).order(stackOrderAscending);
    const layers = stackGenerator(data);
    const extent = [
      0,
      d3.max(layers, (layer) => d3.max(layer, (seq) => Math.abs(seq[1]))),
    ];
    // const maxAmount = d3.max(data, (d) => Math.abs(d.amount));

    const yScale = d3
      .scaleLinear()
      .domain(extent)
      .range([height - 15, 0]);

    const xScale = d3.scaleBand().domain(labels).range([0, width]);

    const xAxis = d3.axisBottom(xScale).tickSize(0);

    group
      .select('.x-axis')
      .style('transform', `translateY(${+height - 14}px)`)
      .style('color', 'white')
      .call(xAxis)
      .call((g) => g.select('.domain').remove())
      .selectAll('.x-axis .tick text')
      .call((t) =>
        t.each(function (d) {
          const self = d3.select(this);
          const s = self.text().split(' - ');
          self.text('');
          self
            .append('tspan')
            .attr('x', 0)
            .attr('dy', '1em')
            .text(select === 1 ? s[0] : s[0].slice(0, 3));
          select === 1 &&
            self
              .append('tspan')
              .attr('x', 0)
              .attr('dy', '1em')
              .text('- ' + s[1]);
        })
      );

    group
      .selectAll('.layer')
      .data(layers)
      .join('g')
      .attr('class', 'layer')
      .attr('fill', (layer) => colorList[layer.key])
      .selectAll('rect')
      .data((layer) => layer)
      .join('rect')
      // .style('transform', 'scale(1, -1)')
      .attr('x', (seq) => xScale.bandwidth() / 2 - 3 + xScale(seq.data.text))
      .attr('y', (seq) => yScale(seq[1]))
      .attr('width', 6)
      // .attr('height', 0)
      // .transition()
      // .duration(1000)
      .attr('height', (seq) => yScale(seq[0]) - yScale(seq[1]));

    // group
    //   .selectAll('.bar')
    //   .data(data)
    //   .join('rect')
    //   .attr('class', 'bar')
    //   .style('transform', 'scale(1, -1)')
    //   .attr('x', (d) => xScale.bandwidth() / 2 - 3 + xScale(d.text))
    //   .attr('y', -height + 15)
    //   .attr('width', 6)
    //   .attr('height', 0)
    //   .attr('fill', (d) => (d.amount < 0 ? colorList[0] : colorList[1]))
    //   .transition()
    //   .duration(1000)
    //   .attr('height', (d) => yScale(Math.abs(d.amount)));

    // eslint-disable-next-line
  }, [data]);

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
};

export default BarChart;
