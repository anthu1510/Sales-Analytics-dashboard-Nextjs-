import { ReactNode } from 'react';
import Header from '../../components/layout/Header';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="p-4">{children}</main>
    </div>
  );
}