'use client';
import { useEffect, useState } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { SalesRecord } from '@/lib/types';

interface GrowthChartData {
  month: string;
  revenue: number;
}

export default function GrowthRateChart() {
  const [data, setData] = useState<GrowthChartData[]>([]);

  useEffect(() => {
    fetch('/api/sales')
      .then((res) => res.json())
      .then((json) => {
        const monthly = json.data.reduce((acc: Record<string, number>, cur: SalesRecord) => {
          const [day, month, year] = cur.Date.split('-');
          const key = `${year}-${month}`;
          acc[key] = (acc[key] || 0) + cur.Total_Revenue;
          return acc;
        }, {});

        const chartData: GrowthChartData[] = Object.entries(monthly).map(([month, revenue]) => ({
          month,
          revenue: Number(revenue),
        }));

        setData(chartData);
      });
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="month" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#3b82f6"
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
