"use client";

import { useState } from "react";
import DashboardNav from "../../components/DashboardNav";
import RevenueOverviewChart from "../../components/charts/RevenueOverviewChart";
import ChartCard from "../../components/ui/ChartCard";
import useFilteredSales from "@/hooks/useFilteredSales";
import FilterPanel from "../../components/FilterPanel";
import { FilterOptions } from "@/lib/types";

export default function DashboardPage() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const { data: filteredSales } = useFilteredSales(filters);
  return (
    <div className="space-y-6">
      <DashboardNav />
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        data={filteredSales}
      />
      <ChartCard title="Revenue Over Time">
        <RevenueOverviewChart filters={filters} />
      </ChartCard>
    </div>
  );
}
