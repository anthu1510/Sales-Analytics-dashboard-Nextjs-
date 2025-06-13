'use client';

import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  LabelList,
} from 'recharts';
import { SalesRecord } from '@/lib/types';

interface SalesRepData {
  rep: string;
  revenue: number;
}

export default function SalesRepLeaderboard() {
  const [data, setData] = useState<SalesRepData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/sales');
        const json = await res.json();

        const grouped = json.data.reduce((acc: Record<string, number>, cur: SalesRecord) => {
          const rep = cur.Sales_Rep;
          acc[rep] = (acc[rep] || 0) + cur.Total_Revenue;
          return acc;
        }, {});

        const chartData: SalesRepData[] = Object.entries(grouped)
          .map(([rep, revenue]) => ({ rep, revenue: Number(revenue) }))
          .sort((a, b) => b.revenue - a.revenue); // sort by revenue descending

        setData(chartData);
      } catch (error) {
        console.error('Failed to load sales rep data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart layout="vertical" data={data} margin={{ top: 20, right: 30, bottom: 20, left: 80 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis type="category" dataKey="rep" />
        <Tooltip />
        <Bar dataKey="revenue" fill="#f59e0b">
          <LabelList dataKey="revenue" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
