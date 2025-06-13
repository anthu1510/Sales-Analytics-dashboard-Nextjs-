import DashboardNav from '../../../components/DashboardNav';
import GrowthRateChart from '../../../components/charts/GrowthRateChart';
import ChartCard from '../../../components/ui/ChartCard';

export default function GrowthPage() {
  return (
    <div className="grid gap-6 md:grid-cols-1">
      <DashboardNav />
      <ChartCard title="Growth by month">
        <GrowthRateChart />
      </ChartCard>
    </div>
  );
}