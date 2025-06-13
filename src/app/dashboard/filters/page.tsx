'use client';
import { useState } from 'react';
import useFilteredSales from '../../../hooks/useFilteredSales';

export default function FiltersPage() {
  const [region, setRegion] = useState('');
  const [salesRep, setSalesRep] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const { data, loading, error } = useFilteredSales({
    region,
    salesRep,
    productCategory,
    dateRange: startDate && endDate ? [startDate, endDate] : undefined,
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Sales Filters</h1>
      <div className="grid grid-cols-2 gap-4 max-w-xl">
        <input
          className="border p-2 rounded"
          placeholder="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Sales Rep"
          value={salesRep}
          onChange={(e) => setSalesRep(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Product Category"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          className="border p-2 rounded"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        {loading ? (
          <p>Loading filtered data...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-[400px]">
            {JSON.stringify(data, null, 2)}
          </pre>
        )}
      </div>
    </div>
  );
}
