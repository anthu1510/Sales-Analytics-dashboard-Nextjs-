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
import useFilteredSales from '@/hooks/useFilteredSales';
import { FilterOptions } from "@/lib/types";

interface SalesRepData {
  rep: string;
  revenue: number;
}

export default function SalesRepLeaderboard({ filters }: { filters: FilterOptions }) {
  const { data: filteredSales, loading, error } = useFilteredSales(filters);
  const [data, setData] = useState<SalesRepData[]>([]);

  useEffect(() => {
    if (filteredSales.length === 0) {
      setData([]);
      return;
    }

    const grouped = filteredSales.reduce((acc: Record<string, number>, cur: SalesRecord) => {
      const rep = cur.Sales_Rep;
      acc[rep] = (acc[rep] || 0) + cur.Total_Revenue;
      return acc;
    }, {});

    const chartData: SalesRepData[] = Object.entries(grouped)
      .map(([rep, revenue]) => ({ rep, revenue: Number(revenue) }))
      .sort((a, b) => b.revenue - a.revenue); // sort descending

    setData(chartData);
  }, [filteredSales]);

  if (loading) return <p className="text-gray-500 p-4">Loading chart...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

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
