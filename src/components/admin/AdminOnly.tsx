'use client';

import { useGlobalAdmin } from '@/contexts/GlobalAdminContext';

interface AdminOnlyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export default function AdminOnly({ children, fallback = null }: AdminOnlyProps) {
  const { isAuthenticated } = useGlobalAdmin();

  if (!isAuthenticated) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}