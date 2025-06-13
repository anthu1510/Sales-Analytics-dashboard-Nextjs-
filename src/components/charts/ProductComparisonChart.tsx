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
} from 'recharts';
import { SalesRecord } from '@/lib/types';

interface ChartData {
  product: string;
  revenue: number;
}

export default function ProductComparisonChart() {
  const [data, setData] = useState<ChartData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/api/sales');
        const json = await res.json();

        const grouped = json.data.reduce((acc: Record<string, number>, cur: SalesRecord) => {
          const name = cur.Product_Name;
          acc[name] = (acc[name] || 0) + cur.Total_Revenue;
          return acc;
        }, {});

        const chartData: ChartData[] = Object.entries(grouped).map(([product, revenue]) => ({
          product,
          revenue: Number(revenue)
        }));

        setData(chartData);
      } catch (error) {
        console.error('Failed to load product comparison data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
