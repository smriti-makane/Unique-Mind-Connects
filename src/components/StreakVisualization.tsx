import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { StreakDay } from '../types';
import { Sparkles, Calendar, TrendingUp, Flame, Activity } from 'lucide-react';

interface StreakVisualizationProps {
  data: StreakDay[];
}

export const StreakVisualization: React.FC<StreakVisualizationProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [metric, setMetric] = useState<'streakCount' | 'activeMinutes' | 'completedActivities'>('streakCount');
  const [hoveredDay, setHoveredDay] = useState<StreakDay | null>(null);

  useEffect(() => {
    if (!svgRef.current || !containerRef.current || !data || data.length === 0) return;

    // Clear previous SVG contents
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll('*').remove();

    // Dimensions & Padding
    const containerWidth = containerRef.current.clientWidth || 700;
    const height = 320;
    const margin = { top: 30, right: 30, bottom: 50, left: 50 };
    const width = containerWidth - margin.left - margin.right;

    svgEl
      .attr('width', containerWidth)
      .attr('height', height)
      .attr('viewBox', `0 0 ${containerWidth} ${height}`);

    const g = svgEl
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // Parse Data
    const x = d3
      .scalePoint<string>()
      .domain(data.map((d) => d.dayLabel))
      .range([0, width])
      .padding(0.2);

    const maxY = d3.max(data, (d) => d[metric]) || 10;
    const y = d3
      .scaleLinear()
      .domain([0, Math.ceil(maxY * 1.15)])
      .nice()
      .range([height - margin.top - margin.bottom, 0]);

    // Gradient Definition
    const defs = svgEl.append('defs');
    const gradient = defs
      .append('linearGradient')
      .attr('id', 'streak-gradient')
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '0%')
      .attr('y2', '100%');

    gradient
      .append('stop')
      .attr('offset', '0%')
      .attr('stop-color', '#0d9488')
      .attr('stop-opacity', 0.4);

    gradient
      .append('stop')
      .attr('offset', '100%')
      .attr('stop-color', '#0d9488')
      .attr('stop-opacity', 0.0);

    // Grid Lines
    const yGrid = d3.axisLeft(y).ticks(5).tickSize(-width).tickFormat(() => '');
    g.append('g')
      .attr('class', 'grid-lines')
      .call(yGrid)
      .selectAll('line')
      .attr('stroke', '#e2e8f0')
      .attr('stroke-dasharray', '3,3');
    g.select('.grid-lines .domain').remove();

    // Axes
    const xAxis = d3
      .axisBottom(x)
      .tickValues(data.filter((_, i) => i % 3 === 0 || i === data.length - 1).map((d) => d.dayLabel));

    const yAxis = d3.axisLeft(y).ticks(5);

    g.append('g')
      .attr('transform', `translate(0, ${height - margin.top - margin.bottom})`)
      .call(xAxis)
      .selectAll('text')
      .attr('fill', '#64748b')
      .attr('font-size', '11px')
      .attr('font-weight', '600');

    g.append('g')
      .call(yAxis)
      .selectAll('text')
      .attr('fill', '#64748b')
      .attr('font-size', '11px')
      .attr('font-weight', '600');

    // Area Generator
    const area = d3
      .area<StreakDay>()
      .x((d) => x(d.dayLabel) || 0)
      .y0(height - margin.top - margin.bottom)
      .y1((d) => y(d[metric]))
      .curve(d3.curveMonotoneX);

    g.append('path')
      .datum(data)
      .attr('fill', 'url(#streak-gradient)')
      .attr('d', area);

    // Line Generator
    const line = d3
      .line<StreakDay>()
      .x((d) => x(d.dayLabel) || 0)
      .y((d) => y(d[metric]))
      .curve(d3.curveMonotoneX);

    const path = g
      .append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#0d9488')
      .attr('stroke-width', 3)
      .attr('d', line);

    // Animate line path
    const totalLength = (path.node() as SVGPathElement)?.getTotalLength() || 0;
    path
      .attr('stroke-dasharray', `${totalLength} ${totalLength}`)
      .attr('stroke-dashoffset', totalLength)
      .transition()
      .duration(1200)
      .ease(d3.easeCubicOut)
      .attr('stroke-dashoffset', 0);

    // Data Points
    g.selectAll('.data-point')
      .data(data)
      .enter()
      .append('circle')
      .attr('class', 'data-point')
      .attr('cx', (d) => x(d.dayLabel) || 0)
      .attr('cy', (d) => y(d[metric]))
      .attr('r', (d) => (d.loggedAt ? 5 : 3.5))
      .attr('fill', (d) => (d.loggedAt ? '#0f766e' : '#94a3b8'))
      .attr('stroke', '#ffffff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseover', (_event, d) => {
        setHoveredDay(d);
      })
      .on('mouseout', () => {
        setHoveredDay(null);
      });

  }, [data, metric]);

  const metricTitle =
    metric === 'streakCount'
      ? 'Daily Streak Count (Days)'
      : metric === 'activeMinutes'
      ? 'Active Learning Time (Minutes)'
      : 'Activities Completed';

  return (
    <div className="space-y-4">
      {/* Chart Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
        <div className="flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-teal-600" />
          <h4 className="font-bold text-slate-800 text-sm">{metricTitle}</h4>
        </div>

        {/* Metric Selector Buttons */}
        <div className="flex bg-white p-1 rounded-lg border border-slate-200 text-xs font-bold gap-1">
          <button
            onClick={() => setMetric('streakCount')}
            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
              metric === 'streakCount'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🔥 Streak
          </button>
          <button
            onClick={() => setMetric('activeMinutes')}
            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
              metric === 'activeMinutes'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            ⏱️ Minutes
          </button>
          <button
            onClick={() => setMetric('completedActivities')}
            className={`px-3 py-1.5 rounded-md cursor-pointer transition-all ${
              metric === 'completedActivities'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            🎯 Activities
          </button>
        </div>
      </div>

      {/* SVG Container */}
      <div ref={containerRef} className="relative bg-white p-2 rounded-2xl border border-slate-200 shadow-xs">
        <svg ref={svgRef} className="w-full h-auto overflow-visible" />

        {/* Hover Tooltip Overlay */}
        {hoveredDay && (
          <div className="absolute top-4 right-4 bg-slate-900 text-white p-3 rounded-xl shadow-lg text-xs space-y-1 animate-fade-in border border-slate-700">
            <p className="font-bold text-teal-300 border-b border-slate-700 pb-1 flex items-center justify-between gap-4">
              <span>{hoveredDay.date} ({hoveredDay.dayLabel})</span>
              <span>{hoveredDay.loggedAt ? '✅ Logged' : '❌ Inactive'}</span>
            </p>
            <div className="pt-1 space-y-0.5 text-slate-200">
              <p>🔥 Streak Length: <span className="font-bold text-amber-300">{hoveredDay.streakCount} days</span></p>
              <p>⏱️ Time Spent: <span className="font-bold text-emerald-300">{hoveredDay.activeMinutes} mins</span></p>
              <p>🎯 Activities: <span className="font-bold text-cyan-300">{hoveredDay.completedActivities} completed</span></p>
            </div>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center text-xs">
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium">30-Day Total Days</p>
          <p className="text-lg font-black text-slate-800">{data.filter((d) => d.loggedAt).length} / 30 Days</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium">Current Streak</p>
          <p className="text-lg font-black text-amber-600">🔥 {data[data.length - 1]?.streakCount || 0} Days</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium">Peak Monthly Streak</p>
          <p className="text-lg font-black text-teal-600">{Math.max(...data.map((d) => d.streakCount))} Days</p>
        </div>
        <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
          <p className="text-slate-500 font-medium">Total Active Time</p>
          <p className="text-lg font-black text-emerald-600">{data.reduce((acc, d) => acc + d.activeMinutes, 0)} Mins</p>
        </div>
      </div>
    </div>
  );
};
