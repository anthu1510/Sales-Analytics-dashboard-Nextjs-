import { useEffect, useState } from "react";
import { SalesRecord } from "@/lib/types";

export interface FilterOptions {
  dateRange?: [string, string]; // format: 'YYYY-MM-DD'
  region?: string;
  productCategory?: string;
  salesRep?: string;
}

export default function useFilteredSales(filters: FilterOptions = {}) {
  const [data, setData] = useState<SalesRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/sales");
        const json = await res.json();
        let records: SalesRecord[] = json.data;

        // Filter by region
        if (filters.region) {
          records = records.filter(
            (record) => record.Region === filters.region
          );
        }

        // Filter by product category
        if (filters.productCategory) {
          records = records.filter(
            (record) => record.Product_Category === filters.productCategory
          );
        }

        // Filter by sales rep
        if (filters.salesRep) {
          records = records.filter(
            (record) => record.Sales_Rep === filters.salesRep
          );
        }

        // Filter by date range
        if (filters.dateRange) {
          const [start, end] = filters.dateRange.map((d) => new Date(d));
          records = records.filter((record) => {
            const [day, month, year] = record.Date.split("-");
            const recordDate = new Date(`${year}-${month}-${day}`);
            return recordDate >= start && recordDate <= end;
          });
        }

        setData(records);
      } catch (err) {
        setError("Failed to load sales data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [JSON.stringify(filters)]);

  return { data, loading, error };
}
