'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Code, 
  DollarSign, 
  ChevronRight, 
  Clock, 
  Target,
  CheckCircle,
  Circle,
  Play,
  BookOpen,
  TrendingUp,
  Zap
} from 'lucide-react';

interface PathStep {
  id: string;
  path_id: string;
  title: string;
  description: string;
  skills: string[];
  completed: boolean;
  in_progress: boolean;
  estimated_time: string;
  projects?: string[];
  order_index: number;
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  order_index: number;
  path_steps?: PathStep[];
}

const iconMap: { [key: string]: JSX.Element } = {
  'Brain': <Brain className="w-6 h-6" />,
  'Code': <Code className="w-6 h-6" />,
  'DollarSign': <DollarSign className="w-6 h-6" />,
  'BookOpen': <BookOpen className="w-6 h-6" />,
  'TrendingUp': <TrendingUp className="w-6 h-6" />,
  'Zap': <Zap className="w-6 h-6" />
};

export default function LearningPathVisualization() {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchLearningPaths();
  }, []);

  const fetchLearningPaths = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/journey/learning-paths');
      if (!response.ok) throw new Error('Failed to fetch learning paths');
      const data = await response.json();
      setLearningPaths(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setLearningPaths([]);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (iconName: string) => {
    return iconMap[iconName] || <BookOpen className="w-6 h-6" />;
  };

  const getStepIcon = (step: PathStep) => {
    if (step.completed) return <CheckCircle className="w-5 h-5 text-green-400" />;
    if (step.in_progress) return <Play className="w-5 h-5 text-blue-400" />;
    return <Circle className="w-5 h-5 text-gray-500" />;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-400 mb-4">Error loading learning paths: {error}</p>
        <button 
          onClick={fetchLearningPaths}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Learning Paths Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {learningPaths.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`relative bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 cursor-pointer transition-all duration-300 ${
              selectedPath === path.id ? 'ring-2 ring-blue-500' : 'hover:border-slate-600'
            }`}
            onClick={() => setSelectedPath(selectedPath === path.id ? null : path.id)}
          >
            {/* Icon and Title */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-3 bg-gradient-to-br ${path.color} rounded-lg`}>
                  {getIcon(path.icon)}
                </div>
                <div>
                  <h3 className="font-semibold text-white text-lg">{path.title}</h3>
                  <p className="text-sm text-gray-400">
                    {path.path_steps?.length || 0} steps
                  </p>
                </div>
              </div>
              <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                selectedPath === path.id ? 'rotate-90' : ''
              }`} />
            </div>

            {/* Description */}
            <p className="text-gray-300 text-sm mb-4">{path.description}</p>

            {/* Progress Bar */}
            <div className="mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-gray-400">Progress</span>
                <span className="text-xs font-medium text-white">{path.progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${path.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={`h-2 bg-gradient-to-r ${path.color} rounded-full`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Path Details */}
      <AnimatePresence>
        {selectedPath && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6"
          >
            {(() => {
              const path = learningPaths.find(p => p.id === selectedPath);
              if (!path) return null;

              return (
                <>
                  <h4 className="text-xl font-semibold text-white mb-4 flex items-center">
                    <Target className="w-6 h-6 text-blue-400 mr-2" />
                    Learning Path Steps
                  </h4>
                  
                  {path.path_steps && path.path_steps.length > 0 ? (
                    <div className="space-y-4">
                      {path.path_steps.sort((a, b) => a.order_index - b.order_index).map((step, stepIndex) => (
                        <motion.div
                          key={step.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: stepIndex * 0.1 }}
                          className={`p-4 rounded-lg border ${
                            step.completed 
                              ? 'bg-green-900/20 border-green-700/50' 
                              : step.in_progress
                              ? 'bg-blue-900/20 border-blue-700/50'
                              : 'bg-slate-700/50 border-slate-600/50'
                          }`}
                        >
                          <div className="flex items-start space-x-3">
                            {getStepIcon(step)}
                            <div className="flex-1">
                              <h5 className="font-medium text-white mb-1">{step.title}</h5>
                              <p className="text-sm text-gray-300 mb-2">{step.description}</p>
                              
                              <div className="flex items-center space-x-4 text-xs text-gray-400">
                                <span className="flex items-center">
                                  <Clock className="w-3 h-3 mr-1" />
                                  {step.estimated_time}
                                </span>
                                {step.skills && step.skills.length > 0 && (
                                  <span>{step.skills.length} skills</span>
                                )}
                                {step.projects && step.projects.length > 0 && (
                                  <span>{step.projects.length} projects</span>
                                )}
                              </div>

                              {/* Skills */}
                              {step.skills && step.skills.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {step.skills.map((skill, skillIndex) => (
                                    <span
                                      key={skillIndex}
                                      className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded text-xs"
                                    >
                                      {skill}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-400 text-center py-8">
                      No steps defined for this learning path yet.
                    </p>
                  )}
                </>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {learningPaths.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No learning paths added yet.</p>
        </div>
      )}
    </div>
  );
}