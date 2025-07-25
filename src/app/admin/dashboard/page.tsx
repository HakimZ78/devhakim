'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  FileText, 
  Briefcase, 
  BookOpen, 
  Clock, 
  Code2, 
  Command, 
  Settings,
  LogOut,
  ExternalLink
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useGlobalAdmin } from '@/contexts/GlobalAdminContext';

interface DashboardStats {
  projects: number;
  skills: number;
  timeline: number;
  templates: number;
  commands: number;
}

export default function AdminDashboard() {
  const { logout } = useGlobalAdmin();
  const router = useRouter();
  const [stats, setStats] = useState<DashboardStats>({
    projects: 0,
    skills: 0,
    timeline: 0,
    templates: 0,
    commands: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const [projectsRes, skillsRes, timelineRes, templatesRes, commandsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/skills/categories'),
        fetch('/api/journey'),
        fetch('/api/templates'),
        fetch('/api/commands')
      ]);

      // Handle each response individually with error checking
      let projects = { success: false, data: [] };
      let skills = { success: false, data: [] };
      let timeline = { success: false, data: [] };
      let templates = { success: false, data: [] };
      let commands = { success: false, data: [] };

      if (projectsRes.ok) {
        try {
          projects = await projectsRes.json();
        } catch (e) {
          console.error('Failed to parse projects response:', e);
        }
      }

      if (skillsRes.ok) {
        try {
          skills = await skillsRes.json();
        } catch (e) {
          console.error('Failed to parse skills response:', e);
        }
      }

      if (timelineRes.ok) {
        try {
          timeline = await timelineRes.json();
        } catch (e) {
          console.error('Failed to parse timeline response:', e);
        }
      }

      if (templatesRes.ok) {
        try {
          templates = await templatesRes.json();
        } catch (e) {
          console.error('Failed to parse templates response:', e);
        }
      }

      if (commandsRes.ok) {
        try {
          commands = await commandsRes.json();
        } catch (e) {
          console.error('Failed to parse commands response:', e);
        }
      }

      setStats({
        projects: projects.success ? projects.data.length : 0,
        skills: skills.success ? skills.data.length : 0,
        timeline: timeline.success ? timeline.data.length : 0,
        templates: templates.success ? templates.data.length : 0,
        commands: commands.success ? commands.data.length : 0
      });
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const dashboardCards = [
    {
      title: 'Hero Content',
      description: 'Edit your name, roles, and introduction',
      icon: <FileText className="w-6 h-6" />,
      href: '/admin/content/hero',
      color: 'from-blue-500 to-blue-600',
      stats: '1 section'
    },
    {
      title: 'Projects',
      description: 'Manage your portfolio projects',
      icon: <Briefcase className="w-6 h-6" />,
      href: '/admin/content/projects',
      color: 'from-green-500 to-green-600',
      stats: loading ? 'Loading...' : `${stats.projects} projects`
    },
    {
      title: 'Skills',
      description: 'Update your technical skills and progress',
      icon: <Code2 className="w-6 h-6" />,
      href: '/admin/content/skills',
      color: 'from-purple-500 to-purple-600',
      stats: loading ? 'Loading...' : `${stats.skills} categories`
    },
    {
      title: 'Timeline',
      description: 'Edit your journey timeline events',
      icon: <Clock className="w-6 h-6" />,
      href: '/admin/content/timeline',
      color: 'from-orange-500 to-orange-600',
      stats: loading ? 'Loading...' : `${stats.timeline} events`
    },
    {
      title: 'Templates',
      description: 'Manage code templates',
      icon: <BookOpen className="w-6 h-6" />,
      href: '/admin/content/templates',
      color: 'from-pink-500 to-pink-600',
      stats: loading ? 'Loading...' : `${stats.templates} templates`
    },
    {
      title: 'Commands',
      description: 'Update command reference',
      icon: <Command className="w-6 h-6" />,
      href: '/admin/content/commands',
      color: 'from-indigo-500 to-indigo-600',
      stats: loading ? 'Loading...' : `${stats.commands} commands`
    }
  ];

  const handleLogout = () => {
    logout();
    router.push('/admin');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Admin Header */}
      <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                <LayoutDashboard className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-sm text-gray-400">Manage your portfolio content</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                target="_blank"
                className="flex items-center px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 hover:text-white transition-colors"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-white mb-2">Welcome back, Hakim!</h2>
          <p className="text-gray-400">
            Select a content section below to start editing your portfolio.
          </p>
        </motion.div>

        {/* Content Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {dashboardCards.map((card, index) => (
            <motion.div
              key={card.href}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Link
                href={card.href}
                className="block group bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 hover:border-slate-600 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 bg-gradient-to-r ${card.color} rounded-lg`}>
                    <span className="text-white">{card.icon}</span>
                  </div>
                  <span className="text-sm text-gray-400">{card.stats}</span>
                </div>
                
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-gray-400 text-sm">
                  {card.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 bg-slate-800/30 rounded-xl p-6 border border-slate-700"
        >
          <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/admin/settings"
              className="flex items-center px-4 py-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group"
            >
              <Settings className="w-5 h-5 text-gray-400 group-hover:text-white mr-3" />
              <span className="text-gray-300 group-hover:text-white">Site Settings</span>
            </Link>
            <button
              onClick={() => window.location.reload()}
              className="flex items-center px-4 py-3 bg-slate-700/50 rounded-lg hover:bg-slate-700 transition-colors group"
            >
              <LayoutDashboard className="w-5 h-5 text-gray-400 group-hover:text-white mr-3" />
              <span className="text-gray-300 group-hover:text-white">Refresh Data</span>
            </button>
          </div>
        </motion.div>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Portfolio Admin Panel v1.0</p>
        </div>
      </main>
    </div>
  );
}