'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { label: 'Overview', href: '/dashboard' },
  { label: 'Region Sales', href: '/dashboard/region' },
  { label: 'Product Comparison', href: '/dashboard/products' },
  { label: 'Sales Reps', href: '/dashboard/reps' },
  { label: 'Monthly Growth', href: '/dashboard/growth' },
  { label: 'Top Products', href: '/dashboard/top-products' }
];

export default function DashboardNav() {
  const pathname = usePathname();

  return (
    <nav className="flex flex-wrap gap-2 sm:gap-4 p-4 bg-gray-100 rounded-md mb-6">
      {navItems.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={clsx(
            'px-3 py-1 rounded-md text-sm font-medium',
            pathname === href ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
