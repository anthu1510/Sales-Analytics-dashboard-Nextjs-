"use client";

import { useState } from "react";
import DashboardNav from "../../../components/DashboardNav";
import ProductComparisonChart from "../../../components/charts/ProductComparisonChart";
import ChartCard from "@/components/ui/ChartCard";
import useFilteredSales from "@/hooks/useFilteredSales";
import FilterPanel from "../../../components/FilterPanel";
import { FilterOptions } from "@/lib/types";

export default function ProductsPage() {
  const [filters, setFilters] = useState<FilterOptions>({});
  const { data: filteredSales } = useFilteredSales(filters);

  return (
    <div className="grid gap-6 md:grid-cols-1">
      <DashboardNav />
      <FilterPanel
        filters={filters}
        setFilters={setFilters}
        data={filteredSales}
      />
      <ChartCard title="Product Performance Comparison">
        <ProductComparisonChart  filters={filters}/>
      </ChartCard>
    </div>
  );
}
