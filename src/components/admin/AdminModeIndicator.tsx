'use client';

import { motion } from 'framer-motion';
import { Shield, Settings, LogOut } from 'lucide-react';
import { useGlobalAdmin } from '@/contexts/GlobalAdminContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminModeIndicator() {
  const { isAuthenticated, logout } = useGlobalAdmin();
  const router = useRouter();

  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.refresh();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-20 right-6 z-50"
    >
      <div className="bg-blue-600/90 backdrop-blur-sm border border-blue-500/50 rounded-lg px-4 py-2 shadow-lg">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-white" />
            <span className="text-white text-sm font-medium">Admin Mode</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Link
              href="/admin/dashboard"
              className="p-1 text-white/80 hover:text-white transition-colors duration-200"
              title="Admin Dashboard"
            >
              <Settings className="w-4 h-4" />
            </Link>
            <button
              onClick={handleLogout}
              className="p-1 text-white/80 hover:text-white transition-colors duration-200"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}