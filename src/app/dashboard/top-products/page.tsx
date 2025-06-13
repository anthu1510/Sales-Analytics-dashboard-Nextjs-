import DashboardNav from "../../../components/DashboardNav";
import TopProductsChart from "../../../components/charts/TopProductsChart";
import ChartCard from "../../../components/ui/ChartCard";

export default function TopProductsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-1">
      <DashboardNav />
      <ChartCard title="Growth by month">
        <TopProductsChart />
      </ChartCard>
    </div>
  );
}
