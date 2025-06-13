'use client';
import { useEffect, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import useFilteredSales, { FilterOptions } from '../../hooks/useFilteredSales';

interface SalesRecord {
  Date: string;
  Total_Revenue: number;
}

interface ChartData {
  date: string;
  revenue: number;
}

export default function RevenueOverviewChart({ filters }: { filters: FilterOptions }) {
  const { data: filteredSales, loading, error } = useFilteredSales(filters);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (filteredSales.length === 0) {
      setChartData([]);
      return;
    }

    const grouped = filteredSales.reduce((acc: Record<string, number>, cur: SalesRecord) => {
      const [day, month, year] = cur.Date.split('-');
      const formattedDate = `${year}-${month}-${day}`;
      acc[formattedDate] = (acc[formattedDate] || 0) + cur.Total_Revenue;
      return acc;
    }, {});

    const result = Object.entries(grouped)
      .sort(([a], [b]) => new Date(a).getTime() - new Date(b).getTime())
      .map(([date, revenue]) => ({
        date,
        revenue: parseFloat(revenue.toFixed(2)),
      }));

    setChartData(result);
  }, [filteredSales]);

  if (loading) return <p className="text-gray-500 p-4">Loading chart...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
