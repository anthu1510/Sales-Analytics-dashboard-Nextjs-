'use client';

import { useState, useEffect } from 'react';
import { FilterOptions } from '@/hooks/useFilteredSales';
import { exportToPDF } from '@/utils/exportToPDF';

interface FilterPanelProps {
  filters: FilterOptions;
  setFilters: (filters: FilterOptions) => void;
  dataToExport: object[];
  exportFileName: string;
}

export default function FilterPanel({
  filters,
  setFilters,
  dataToExport,
  exportFileName,
}: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filters);

  const handleApply = () => {
    setFilters(localFilters);
  };

  return (
    <div className="bg-white p-4 shadow rounded-md mb-4 flex flex-col md:flex-row justify-between items-center gap-4">
      <div className="flex flex-wrap gap-2 items-center">
        {/* Example filter: Add more as needed */}
        <input
          type="text"
          placeholder="Region"
          value={localFilters.region || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, region: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Product Category"
          value={localFilters.productCategory || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, productCategory: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <input
          type="text"
          placeholder="Sales Rep"
          value={localFilters.salesRep || ''}
          onChange={(e) => setLocalFilters({ ...localFilters, salesRep: e.target.value })}
          className="border px-2 py-1 rounded"
        />
        <button
          onClick={handleApply}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Apply Filters
        </button>
      </div>

      {/* Export Buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => exportToPDF(dataToExport, exportFileName)}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
        >
          Export CSV
        </button>
        <button
          onClick={() => exportToPDF(dataToExport, exportFileName)}
          className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          Export PDF
        </button>
      </div>
    </div>
  );
}
