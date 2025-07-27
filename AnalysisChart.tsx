
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { AnalysisStatistics } from '../types';
import { Severity } from '../types';

interface AnalysisChartProps {
  statistics: AnalysisStatistics;
}

const COLORS = {
  [Severity.CRITICAL]: '#ef4444', // red-500
  [Severity.ERROR]: '#f97316', // orange-500
  [Severity.WARNING]: '#eab308', // yellow-500
  [Severity.INFO]: '#38bdf8', // sky-400
  [Severity.DEBUG]: '#64748b', // slate-500
};

const CustomTooltip: React.FC<any> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-800 p-2 border border-slate-700 rounded text-sm">
        <p className="label">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

export const AnalysisChart: React.FC<AnalysisChartProps> = ({ statistics }) => {
  const data = [
    { name: 'Critical', value: statistics.criticalCount },
    { name: 'Error', value: statistics.errorCount },
    { name: 'Warning', value: statistics.warningCount },
    { name: 'Info', value: statistics.infoCount },
    { name: 'Debug', value: statistics.debugCount },
  ].filter(d => d.value > 0);

  if (data.length === 0) {
      return <div className="text-slate-500">No data to display in chart.</div>;
  }

  const chartColors = [
      COLORS[Severity.CRITICAL],
      COLORS[Severity.ERROR],
      COLORS[Severity.WARNING],
      COLORS[Severity.INFO],
      COLORS[Severity.DEBUG],
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius="80%"
          fill="#8884d8"
          dataKey="value"
          stroke="#1e293b" // slate-800
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />}/>
        <Legend
            iconType="circle"
            formatter={(value) => <span className="text-slate-300 ml-2">{value}</span>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};
