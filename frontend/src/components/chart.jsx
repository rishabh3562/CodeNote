import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
  const chartRef = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 400,
      height = 200;
    const svg = d3
      .select(chartRef.current)
      .attr('width', width)
      .attr('height', height);

    svg.selectAll('*').remove();

    const barWidth = 50;
    const dataset = Object.values(data);
    const labels = Object.keys(data);

    svg
      .selectAll('rect')
      .data(dataset)
      .enter()
      .append('rect')
      .attr('x', (_, i) => i * (barWidth + 10))
      .attr('y', (d) => height - d * 5)
      .attr('width', barWidth)
      .attr('height', (d) => d * 5)
      .attr('fill', 'blue');

    svg
      .selectAll('text')
      .data(labels)
      .enter()
      .append('text')
      .attr('x', (_, i) => i * (barWidth + 10) + 10)
      .attr('y', height - 5)
      .text((d) => d)
      .attr('fill', 'black');
  }, [data]);

  return <svg ref={chartRef} />;
};

export default Chart;

// import React, { useEffect } from 'react';
// import * as d3 from 'd3';

// const Chart = ({ data }) => {
//   useEffect(() => {
//     const svg = d3.select('#chart').attr('width', 500).attr('height', 300);
//     const margin = { top: 10, right: 30, bottom: 40, left: 40 };
//     const width = svg.attr('width') - margin.left - margin.right;
//     const height = svg.attr('height') - margin.top - margin.bottom;

//     const chart = svg
//       .append('g')
//       .attr('transform', `translate(${margin.left},${margin.top})`);

//     const x = d3.scaleBand().range([0, width]).padding(0.1);
//     const y = d3.scaleLinear().range([height, 0]);

//     // Example: simple bar chart showing commits over time (replace with actual data)
//     const commits = [
//       { date: '2025-01-01', count: 10 },
//       { date: '2025-01-02', count: 15 },
//       // More data...
//     ];

//     x.domain(commits.map((d) => d.date));
//     y.domain([0, d3.max(commits, (d) => d.count)]);

//     chart
//       .selectAll('.bar')
//       .data(commits)
//       .enter()
//       .append('rect')
//       .attr('class', 'bar')
//       .attr('x', (d) => x(d.date))
//       .attr('width', x.bandwidth())
//       .attr('y', (d) => y(d.count))
//       .attr('height', (d) => height - y(d.count));

//     chart
//       .append('g')
//       .attr('transform', `translate(0,${height})`)
//       .call(d3.axisBottom(x));

//     chart.append('g').call(d3.axisLeft(y));
//   }, [data]);

//   return <svg id="chart"></svg>;
// };

// export default Chart;
