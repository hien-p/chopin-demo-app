"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { PastSpeedTestResult } from '../../lib/types';

interface LocationChartProps {
  pastResults: PastSpeedTestResult[];
  isLoading: boolean;
}

interface ChartDataPoint {
  location: string;
  avgDownload: number;
  maxDownload: number;
  minDownload: number;
  count: number;
}

export default function LocationChart({ pastResults, isLoading }: LocationChartProps) {
  const transformData = (results: PastSpeedTestResult[]): ChartDataPoint[] => {
    const locationToSpeeds = new Map<string, number[]>();

    results.forEach((result) => {
      const list = locationToSpeeds.get(result.location) ?? [];
      list.push(result.download_speed);
      locationToSpeeds.set(result.location, list);
    });

    return Array.from(locationToSpeeds.entries())
      .map(([location, speeds]) => {
        const sum = speeds.reduce((acc, s) => acc + s, 0);
        const avg = sum / speeds.length;
        const max = Math.max(...speeds);
        const min = Math.min(...speeds);
        return {
          location: location.length > 20 ? `${location.slice(0, 20)}...` : location,
          avgDownload: Math.round(avg * 100) / 100,
          maxDownload: Math.round(max * 100) / 100,
          minDownload: Math.round(min * 100) / 100,
          count: speeds.length,
        };
      })
      .sort((a, b) => b.avgDownload - a.avgDownload);
  };

  const chartData = transformData(pastResults);

  if (isLoading) {
    return (
      <div className="w-full py-8 text-center">
        <p>Loading chart data...</p>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p>No data available for chart visualization.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-2">Download Speeds by Location</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Showing {chartData.length} locations with {pastResults.length} total measurements
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="location" angle={-45} textAnchor="end" height={80} interval={0} tick={{ fontSize: 12 }} />
          <YAxis label={{ value: 'Mbps', angle: -90, position: 'insideLeft' }} tick={{ fontSize: 12 }} />
          <Tooltip
            formatter={(value: number, name: string) => [
              `${value} Mbps`,
              name === 'avgDownload' ? 'Average' : name === 'maxDownload' ? 'Maximum' : 'Minimum',
            ]}
            labelFormatter={(label) => `Location: ${label}`}
          />
          <Legend />
          <Bar dataKey="avgDownload" fill="#3b82f6" name="Average" radius={[4, 4, 0, 0]} />
          <Bar dataKey="maxDownload" fill="#10b981" name="Maximum" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
