'use client';
import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';
import useFilteredSales, { FilterOptions } from '../../hooks/useFilteredSales';

interface SalesRecord {
  Region: string;
  Total_Revenue: number;
}

interface ChartData {
  region: string;
  revenue: number;
}

export default function RegionSalesChart({ filters }: { filters: FilterOptions }) {
  const { data: filteredSales, loading, error } = useFilteredSales(filters);
  const [chartData, setChartData] = useState<ChartData[]>([]);

  useEffect(() => {
    if (filteredSales.length === 0) {
      setChartData([]);
      return;
    }

    const grouped = filteredSales.reduce((acc: Record<string, number>, cur: SalesRecord) => {
      acc[cur.Region] = (acc[cur.Region] || 0) + cur.Total_Revenue;
      return acc;
    }, {});

    const result = Object.keys(grouped).map((region) => ({
      region,
      revenue: parseFloat(grouped[region].toFixed(2)),
    }));

    setChartData(result);
  }, [filteredSales]);

  if (loading) return <p className="text-gray-500 p-4">Loading chart...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="revenue" fill="#34d399" />
      </BarChart>
    </ResponsiveContainer>
  );
}
