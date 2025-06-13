'use client';

import { useState } from 'react';
import DashboardNav from '../../../components/DashboardNav';
import RegionSalesChart from '../../../components/charts/RegionSalesChart';
import ChartCard from '../../../components/ui/ChartCard';
import useFilteredSales, { FilterOptions } from '@/hooks/useFilteredSales';
import FilterPanel from '../../../components/FilterPanel';

export default function RegionPage() {
   const [filters, setFilters] = useState<FilterOptions>({});
  const { data: filteredSales } = useFilteredSales(filters);

  return (
    <div className="space-y-6">
      <DashboardNav />
       <FilterPanel
        filters={filters}
        setFilters={setFilters}
        dataToExport={filteredSales}
        exportFileName="sales_by_region"
      />
      <ChartCard title="Sales by Region">
        <RegionSalesChart filters={filters} />
      </ChartCard>
    </div>
  );
}
