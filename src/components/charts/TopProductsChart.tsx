'use client';

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { SalesRecord } from '@/lib/types';
import useFilteredSales from '@/hooks/useFilteredSales';
import { FilterOptions } from "@/lib/types";

interface TopProduct {
  name: string;
  revenue: number;
}

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

export default function TopProductsChart({ filters }: { filters: FilterOptions }) {
  const { data: filteredSales, loading, error } = useFilteredSales(filters);
  const [data, setData] = useState<TopProduct[]>([]);

  useEffect(() => {
    if (filteredSales.length === 0) {
      setData([]);
      return;
    }

    const grouped = filteredSales.reduce((acc: Record<string, number>, cur: SalesRecord) => {
      acc[cur.Product_Name] = (acc[cur.Product_Name] || 0) + cur.Total_Revenue;
      return acc;
    }, {});

    const allProducts = Object.entries(grouped).map(([name, revenue]) => ({
      name,
      revenue: Number(revenue)
    }));

    const topProducts = allProducts.sort((a, b) => b.revenue - a.revenue).slice(0, 5);
    setData(topProducts);
  }, [filteredSales]);

  if (loading) return <p className="text-gray-500 p-4">Loading chart...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="revenue"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend verticalAlign="bottom" height={36} />
      </PieChart>
    </ResponsiveContainer>
  );
}
