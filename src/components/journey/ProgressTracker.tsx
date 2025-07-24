'use client';

import { motion } from 'framer-motion';
import { 
  Calendar, 
  Target, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react';

interface Milestone {
  id: string;
  title: string;
  description: string;
  category: 'technical' | 'project' | 'career' | 'education';
  completed: boolean;
  completionDate?: string;
  targetDate?: string;
  progress: number;
  priority: 'high' | 'medium' | 'low';
}

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'short-term' | 'medium-term' | 'long-term';
  targetDate: string;
  progress: number;
  milestones: string[];
}

const milestones: Milestone[] = [
  {
    id: 'forexacuity-v1',
    title: 'ForexAcuity Platform Launch',
    description: 'Built and deployed real-time forex trading platform with Python/FastAPI backend',
    category: 'project',
    completed: true,
    completionDate: '2024-10-15',
    progress: 100,
    priority: 'high'
  },
  {
    id: 'msc-completion',
    title: 'MSc Computer Science',
    description: 'Complete Master\'s degree in Computer Science with focus on AI/ML',
    category: 'education',
    completed: false,
    targetDate: '2025-09-30',
    progress: 75,
    priority: 'high'
  },
  {
    id: 'aws-certification',
    title: 'AWS Solutions Architect',
    description: 'Obtain AWS Solutions Architect Associate certification',
    category: 'technical',
    completed: false,
    targetDate: '2025-03-15',
    progress: 40,
    priority: 'medium'
  },
  {
    id: 'portfolio-v2',
    title: 'Portfolio Enhancement',
    description: 'Complete Phase 4 & 5 of portfolio with advanced features',
    category: 'project',
    completed: false,
    targetDate: '2025-02-28',
    progress: 60,
    priority: 'high'
  },
  {
    id: 'first-dev-role',
    title: 'First Developer Role',
    description: 'Secure first professional software development position',
    category: 'career',
    completed: false,
    targetDate: '2025-06-01',
    progress: 25,
    priority: 'high'
  },
  {
    id: 'open-source',
    title: 'Open Source Contribution',
    description: 'Make meaningful contributions to 3 open source projects',
    category: 'technical',
    completed: false,
    targetDate: '2025-04-30',
    progress: 20,
    priority: 'medium'
  }
];

const currentGoals: Goal[] = [
  {
    id: 'next-3-months',
    title: 'Job Ready (Next 3 Months)',
    description: 'Complete portfolio, practice interviews, and apply for junior developer roles',
    category: 'short-term',
    targetDate: '2025-04-30',
    progress: 70,
    milestones: ['portfolio-v2', 'aws-certification']
  },
  {
    id: 'next-6-months',
    title: 'Professional Developer (6 Months)',
    description: 'Secure first developer role and complete MSc degree',
    category: 'medium-term',
    targetDate: '2025-09-30',
    progress: 45,
    milestones: ['first-dev-role', 'msc-completion']
  },
  {
    id: 'next-year',
    title: 'Senior Track (1 Year)',
    description: 'Build expertise in chosen specialization and contribute to open source',
    category: 'long-term',
    targetDate: '2026-01-31',
    progress: 15,
    milestones: ['open-source']
  }
];

const categoryColors = {
  technical: 'from-blue-500 to-blue-600',
  project: 'from-green-500 to-green-600',
  career: 'from-purple-500 to-purple-600',
  education: 'from-orange-500 to-orange-600'
};

const priorityColors = {
  high: 'border-red-400',
  medium: 'border-yellow-400',
  low: 'border-green-400'
};

const goalTypeColors = {
  'short-term': 'from-green-500 to-emerald-500',
  'medium-term': 'from-blue-500 to-cyan-500',
  'long-term': 'from-purple-500 to-pink-500'
};

export default function ProgressTracker() {
  const completedMilestones = milestones.filter(m => m.completed).length;
  const totalMilestones = milestones.length;
  const overallProgress = Math.round((completedMilestones / totalMilestones) * 100);

  return (
    <div className="space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Overall Progress</p>
              <p className="text-2xl font-bold">{overallProgress}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Completed</p>
              <p className="text-2xl font-bold">{completedMilestones}/{totalMilestones}</p>
            </div>
            <CheckCircle2 className="w-8 h-8 text-green-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Active Goals</p>
              <p className="text-2xl font-bold">{currentGoals.length}</p>
            </div>
            <Target className="w-8 h-8 text-purple-200" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Days Active</p>
              <p className="text-2xl font-bold">365+</p>
            </div>
            <Calendar className="w-8 h-8 text-orange-200" />
          </div>
        </motion.div>
      </div>

      {/* Current Goals */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Target className="w-6 h-6 mr-2 text-blue-400" />
          Current Goals
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {currentGoals.map((goal, index) => (
            <motion.div
              key={goal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:border-slate-600 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${goalTypeColors[goal.category]} mr-3`}>
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white">{goal.title}</h4>
                  <p className="text-sm text-gray-400 capitalize">{goal.category.replace('-', ' ')}</p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">{goal.description}</p>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">Progress</span>
                  <span className="text-blue-400 font-semibold">{goal.progress}%</span>
                </div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <motion.div
                    className={`h-2 rounded-full bg-gradient-to-r ${goalTypeColors[goal.category]}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                  />
                </div>
                <div className="flex items-center text-sm text-gray-400">
                  <Calendar className="w-4 h-4 mr-1" />
                  Target: {new Date(goal.targetDate).toLocaleDateString()}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Milestones */}
      <div>
        <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
          <Star className="w-6 h-6 mr-2 text-yellow-400" />
          Milestones
        </h3>
        <div className="space-y-4">
          {milestones.map((milestone, index) => (
            <motion.div
              key={milestone.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`bg-slate-800/50 rounded-xl p-6 border-l-4 ${priorityColors[milestone.priority]} border border-slate-700`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${categoryColors[milestone.category]} mr-4`}>
                    {milestone.completed ? (
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    ) : (
                      <Clock className="w-5 h-5 text-white" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">{milestone.title}</h4>
                    <p className="text-gray-300">{milestone.description}</p>
                    <div className="flex items-center mt-2 space-x-4 text-sm text-gray-400">
                      <span className="capitalize">{milestone.category}</span>
                      <span className="capitalize">{milestone.priority} priority</span>
                      {milestone.completed && milestone.completionDate && (
                        <span>Completed: {new Date(milestone.completionDate).toLocaleDateString()}</span>
                      )}
                      {!milestone.completed && milestone.targetDate && (
                        <span>Target: {new Date(milestone.targetDate).toLocaleDateString()}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-white mb-1">{milestone.progress}%</div>
                  <div className="w-20 bg-slate-700 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${categoryColors[milestone.category]}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${milestone.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}