import { ReactNode } from 'react';

export default function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="w-full bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      {children}
    </div>
  );
}