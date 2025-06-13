import DashboardNav from '../../../components/DashboardNav';
import ProductComparisonChart from '../../../components/charts/ProductComparisonChart';
import ChartCard from '@/components/ui/ChartCard';

export default function ProductsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-1">
      <DashboardNav />
      <ChartCard title="Product Performance Comparison">
        <ProductComparisonChart />
      </ChartCard>
    </div>
  );
}