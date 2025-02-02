import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import moment from 'moment';
import { motion, AnimatePresence } from 'framer-motion';

const CodeImpactChart = ({ additions, deletions }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select(ref.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', `translate(${width / 2},${height / 2})`);

    const data = [
      { label: 'Additions', value: additions, color: '#4CAF50' },
      { label: 'Deletions', value: deletions, color: '#F44336' },
    ];

    const pie = d3
      .pie()
      .value((d) => d.value)
      .sort(null);

    const arc = d3
      .arc()
      .innerRadius(radius * 0.6)
      .outerRadius(radius * 0.8);

    const arcs = pie(data);

    svg
      .selectAll('path')
      .data(arcs)
      .join('path')
      .attr('d', arc)
      .attr('fill', (d) => d.data.color)
      .attr('stroke', '#1a1a1a')
      .attr('stroke-width', 1.5)
      .style('filter', 'url(#glow)')
      .transition()
      .duration(800)
      .attrTween('d', (d) => {
        const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
        return (t) => arc(interpolate(t));
      });

    // Glow effect
    svg
      .append('defs')
      .append('filter')
      .attr('id', 'glow')
      .html(
        '<feGaussianBlur stdDeviation="4" result="glow"/><feMerge><feMergeNode in="glow"/><feMergeNode in="SourceGraphic"/></feMerge>'
      );

    // Center text
    svg
      .append('text')
      .text(`${additions - deletions}`)
      .attr('text-anchor', 'middle')
      .attr('dominant-baseline', 'middle')
      .style('fill', '#fff')
      .style('font-size', '32px')
      .style('font-weight', '600')
      .style('opacity', 0)
      .transition()
      .delay(400)
      .style('opacity', 1);

    return () => svg.selectAll('*').remove();
  }, [additions, deletions]);

  return <svg ref={ref} className="w-48 h-48" />;
};

const WeeklyRhythmSparkline = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    if (!data) return;

    const width = 200;
    const height = 80;

    const svg = d3
      .select(ref.current)
      .attr('viewBox', `0 0 ${width} ${height}`);

    const xScale = d3
      .scaleBand()
      .domain(d3.range(7))
      .range([0, width])
      .padding(0.2);

    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data)])
      .range([height - 10, 10]);

    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => xScale(i))
      .attr('y', height - 10)
      .attr('width', xScale.bandwidth())
      .attr('height', 0)
      .attr('fill', '#4CAF50')
      .attr('rx', 2)
      .transition()
      .delay((d, i) => i * 50)
      .duration(400)
      .attr('y', (d) => yScale(d))
      .attr('height', (d) => height - 10 - yScale(d));
  }, [data]);

  return <svg ref={ref} className="w-full h-32" />;
};

const PeakHoursHeatmap = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const width = 600;
    const height = 80;
    const cellSize = 22;

    const svg = d3
      .select(ref.current)
      .attr('viewBox', `0 0 ${width} ${height}`)
      .append('g')
      .attr('transform', 'translate(20, 10)');

    const colorScale = d3
      .scaleSequential(d3.interpolateYlGnBu)
      .domain([0, d3.max(data)]);

    svg
      .selectAll('rect')
      .data(data)
      .join('rect')
      .attr('x', (d, i) => (i % 6) * cellSize)
      .attr('y', (d, i) => Math.floor(i / 6) * cellSize)
      .attr('width', cellSize - 2)
      .attr('height', cellSize - 2)
      .attr('fill', (d) => colorScale(d))
      .style('opacity', 0)
      .transition()
      .delay((d, i) => i * 20)
      .duration(300)
      .style('opacity', 1);
  }, [data]);

  return <svg ref={ref} className="w-full h-32" />;
};

const UserActivity = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="space-y-8 mt-6 font-sans">
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 rounded-2xl shadow-2xl"
        >
          <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
            Temporal DNA
          </h3>

          <div className="space-y-6">
            <div className="bg-gray-700/50 p-4 rounded-xl">
              <h4 className="text-sm font-semibold mb-3 text-gray-400">
                Peak Hours
              </h4>
              <PeakHoursHeatmap data={stats.temporal.peakHours} />
              <div className="flex justify-between mt-4 text-sm text-gray-400">
                <span>🌅 Morning</span>
                <span>
                  🌇 Evening Prime Time: {stats.temporal.primeTime}:00
                </span>
                <span>🌙 Night</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-gray-800/70 p-6 rounded-2xl backdrop-blur-lg shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-4 text-cyan-400">
              Code Impact Ratio
            </h3>
            <div className="flex flex-col items-center">
              <CodeImpactChart
                additions={stats.codeImpact.additions}
                deletions={stats.codeImpact.deletions}
              />
              <div className="mt-4 space-y-2 text-center">
                <p className="text-sm text-gray-400">
                  Net Code Change:{' '}
                  <span
                    className={`ml-2 font-mono ${
                      stats.codeImpact.net >= 0
                        ? 'text-green-400'
                        : 'text-red-400'
                    }`}
                  >
                    {stats.codeImpact.net >= 0 ? '+' : ''}
                    {stats.codeImpact.net}
                  </span>
                </p>
                <div className="flex justify-center space-x-4">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center px-3 py-1 bg-gray-700/50 rounded-full"
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-2" />
                    <span className="text-sm">Additions</span>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center px-3 py-1 bg-gray-700/50 rounded-full"
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full mr-2" />
                    <span className="text-sm">Deletions</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-gray-800/70 p-6 rounded-2xl backdrop-blur-lg shadow-xl"
          >
            <h3 className="text-lg font-semibold mb-4 text-purple-400">
              Behavioral Signature
            </h3>
            <div className="space-y-4">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center bg-gray-700/30 p-4 rounded-xl"
              >
                <span className="flex items-center">
                  🌙 <span className="ml-2">Night Contributions</span>
                </span>
                <span className="font-mono bg-gray-800 px-3 py-1 rounded-full">
                  {stats.behavioralProfile.isNightCoder ? 'Frequent' : 'Rare'}
                </span>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="flex justify-between items-center bg-gray-700/30 p-4 rounded-xl"
              >
                <span className="flex items-center">
                  📅 <span className="ml-2">Weekend Engagement</span>
                </span>
                <div className="flex items-center space-x-3">
                  <div className="w-20 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      style={{
                        width: `${stats.behavioralProfile.weekendEngagement}%`,
                        originX: 0,
                      }}
                      className="h-full bg-purple-400"
                    />
                  </div>
                  <span className="font-mono">
                    {stats.behavioralProfile.weekendEngagement}%
                  </span>
                </div>
              </motion.div>

              <div className="bg-gray-900/50 p-4 rounded-xl">
                <WeeklyRhythmSparkline data={stats.temporal.rhythmPattern} />
                <div className="flex justify-between text-xs mt-3 text-gray-400">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(
                    (day) => (
                      <span key={day}>{day}</span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </div>
  );
};

export default UserActivity;
