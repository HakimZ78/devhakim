'use client';

import { usePathname } from 'next/navigation';
import Navigation from './Navigation';
import Footer from './Footer';
import AdminModeIndicator from '@/components/admin/AdminModeIndicator';

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  // Check if we're on an admin route
  const isAdminRoute = pathname.startsWith('/admin');

  if (isAdminRoute) {
    // Admin routes don't need the main site navigation and footer
    return <>{children}</>;
  }

  // Regular pages get the full layout + admin mode indicator
  return (
    <>
      <Navigation />
      {children}
      <Footer />
      <AdminModeIndicator />
    </>
  );
}