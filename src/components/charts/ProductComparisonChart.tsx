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
import useFilteredSales from '@/hooks/useFilteredSales';
import { SalesRecord, FilterOptions} from '@/lib/types';

interface ChartData {
  product: string;
  revenue: number;
}

export default function ProductComparisonChart({ filters }: { filters: FilterOptions }) {
  const { data: filteredSales, loading, error } = useFilteredSales(filters);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (filteredSales.length === 0) {
      setChartData([]);
      return;
    }

    const grouped = filteredSales.reduce((acc: Record<string, number>, cur: SalesRecord) => {
      const name = cur.Product_Name;
      acc[name] = (acc[name] || 0) + cur.Total_Revenue;
      return acc;
    }, {});

    const data: ChartData[] = Object.entries(grouped).map(([product, revenue]) => ({
      product,
      revenue: Number(revenue),
    }));

    setChartData(data);
  }, [filteredSales]);

  if (loading) return <p className="text-gray-500 p-4">Loading chart...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#6366f1" />
      </BarChart>
    </ResponsiveContainer>
  );
}
