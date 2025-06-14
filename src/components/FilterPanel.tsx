'use client';

import { useEffect, useState } from 'react';
import { exportToCSV, exportToPDF } from '@/lib/exportUtils';
import { SalesRecord, FilterOptions } from '@/lib/types';

interface FilterPanelProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  data: SalesRecord[];
}

export default function FilterPanel({ filters, setFilters, data }: FilterPanelProps) {
  const [regions, setRegions] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [reps, setReps] = useState<string[]>([]);

  useEffect(() => {
    if (!data || data.length === 0) return;

    const unique = <K extends keyof SalesRecord>(key: K): string[] => {
      return [...new Set(data.map((d) => d[key]))].filter(Boolean) as string[];
    };

    setRegions(unique('Region'));
    setCategories(unique('Product_Category'));
    setReps(unique('Sales_Rep'));
  }, [data]);

  const handleDateChange = (index: 0 | 1, value: string) => {
    const updated = [...(filters.dateRange || ['', ''])] as [string, string];
    updated[index] = value;
    setFilters({ ...filters, dateRange: updated });
  };

  return (
    <div className="p-4 bg-white rounded-md shadow flex flex-wrap gap-4 items-end">
      <div>
        <label className="block text-sm font-medium">Region</label>
        <select
          className="border p-2 rounded"
          value={filters.region || ''}
          onChange={(e) => setFilters({ ...filters, region: e.target.value || undefined })}
        >
          <option value="">All</option>
          {regions.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Product Category</label>
        <select
          className="border p-2 rounded"
          value={filters.productCategory || ''}
          onChange={(e) => setFilters({ ...filters, productCategory: e.target.value || undefined })}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Sales Rep</label>
        <select
          className="border p-2 rounded"
          value={filters.salesRep || ''}
          onChange={(e) => setFilters({ ...filters, salesRep: e.target.value || undefined })}
        >
          <option value="">All</option>
          {reps.map((r) => (
            <option key={r} value={r}>{r}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">From Date</label>
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.dateRange?.[0] || ''}
          onChange={(e) => handleDateChange(0, e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">To Date</label>
        <input
          type="date"
          className="border p-2 rounded"
          value={filters.dateRange?.[1] || ''}
          onChange={(e) => handleDateChange(1, e.target.value)}
        />
      </div>

      <div className="ml-auto flex gap-2">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => exportToCSV(data)}
        >
          Export CSV
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => exportToPDF(data)}
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
