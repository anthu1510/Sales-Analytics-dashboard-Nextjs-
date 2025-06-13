import DashboardNav from '../../../components/DashboardNav';
import SalesRepLeaderboard from '../../../components/charts/SalesRepLeaderboard';
import ChartCard from '@/components/ui/ChartCard';

export default function RepsPage() {
  return (
    <div className="grid gap-6 md:grid-cols-1">
      <DashboardNav />
      <ChartCard title="Sales Rep Leaderboard">
        <SalesRepLeaderboard />
      </ChartCard>
    </div>
  );
}