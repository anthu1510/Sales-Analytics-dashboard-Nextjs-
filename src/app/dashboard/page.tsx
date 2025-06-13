'use client';

import { useState } from 'react';
import DashboardNav from '../../components/DashboardNav';
import RevenueOverviewChart from '../../components/charts/RevenueOverviewChart';
import ChartCard from '../../components/ui/ChartCard';
import useFilteredSales, { FilterOptions } from '@/hooks/useFilteredSales';
import FilterPanel from '../../components/FilterPanel';

export default function DashboardPage() {
      const [filters, setFilters] = useState<FilterOptions>({});
     const { data: filteredSales } = useFilteredSales(filters);
  return (
    <div className="space-y-6">
     <DashboardNav />
      <FilterPanel
             filters={filters}
             setFilters={setFilters}
             dataToExport={filteredSales}
             exportFileName="sales_by_overview"
           />
      <ChartCard title="Revenue Over Time">
        <RevenueOverviewChart filters={filters}/>
      </ChartCard>
    </div>
  );
}