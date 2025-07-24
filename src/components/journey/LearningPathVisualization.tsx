'use client';

import { useState } from 'react';
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
  Play
} from 'lucide-react';

interface PathStep {
  id: string;
  title: string;
  description: string;
  skills: string[];
  completed: boolean;
  inProgress: boolean;
  estimatedTime: string;
  projects?: string[];
}

interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  progress: number;
  steps: PathStep[];
}

const learningPaths: LearningPath[] = [
  {
    id: 'ai-healthcare',
    title: 'AI/Healthcare Engineer',
    description: 'Combining healthcare domain knowledge with AI/ML technologies',
    icon: <Brain className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500',
    progress: 65,
    steps: [
      {
        id: 'python-fundamentals',
        title: 'Python Fundamentals',
        description: 'Master Python programming basics and advanced concepts',
        skills: ['Python', 'OOP', 'Data Structures', 'Algorithms'],
        completed: true,
        inProgress: false,
        estimatedTime: '8 weeks',
        projects: ['ForexAcuity Platform', 'Data Analysis Scripts']
      },
      {
        id: 'machine-learning',
        title: 'Machine Learning',
        description: 'Learn ML algorithms and frameworks',
        skills: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Data Science'],
        completed: true,
        inProgress: false,
        estimatedTime: '12 weeks'
      },
      {
        id: 'healthcare-ai',
        title: 'Healthcare AI Applications',
        description: 'Apply AI to healthcare problems',
        skills: ['Medical Imaging', 'NLP', 'Clinical Data', 'Regulatory'],
        completed: false,
        inProgress: true,
        estimatedTime: '16 weeks'
      },
      {
        id: 'deployment',
        title: 'AI Model Deployment',
        description: 'Deploy and scale AI applications',
        skills: ['Docker', 'Kubernetes', 'MLOps', 'Cloud Platforms'],
        completed: false,
        inProgress: false,
        estimatedTime: '8 weeks'
      }
    ]
  },
  {
    id: 'fullstack',
    title: 'Full-Stack Python',
    description: 'End-to-end web development with Python and modern frameworks',
    icon: <Code className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    progress: 80,
    steps: [
      {
        id: 'backend-apis',
        title: 'Backend & APIs',
        description: 'Build robust APIs with FastAPI and Django',
        skills: ['FastAPI', 'Django', 'PostgreSQL', 'Redis'],
        completed: true,
        inProgress: false,
        estimatedTime: '10 weeks',
        projects: ['ForexAcuity API', 'Portfolio Backend']
      },
      {
        id: 'frontend-frameworks',
        title: 'Frontend Frameworks',
        description: 'Modern frontend development',
        skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
        completed: true,
        inProgress: false,
        estimatedTime: '8 weeks',
        projects: ['Portfolio Website', 'Trading Dashboard']
      },
      {
        id: 'devops-deployment',
        title: 'DevOps & Deployment',
        description: 'Infrastructure and deployment automation',
        skills: ['Docker', 'CI/CD', 'AWS', 'Monitoring'],
        completed: false,
        inProgress: true,
        estimatedTime: '6 weeks'
      },
      {
        id: 'architecture',
        title: 'System Architecture',
        description: 'Design scalable systems',
        skills: ['Microservices', 'Event-driven', 'Caching', 'Security'],
        completed: false,
        inProgress: false,
        estimatedTime: '8 weeks'
      }
    ]
  },
  {
    id: 'fintech',
    title: 'Fintech Developer',
    description: 'Specialized in financial technology and trading systems',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    progress: 75,
    steps: [
      {
        id: 'trading-systems',
        title: 'Trading Systems',
        description: 'Real-time trading platform development',
        skills: ['WebSockets', 'Real-time Data', 'Order Management', 'Risk Management'],
        completed: true,
        inProgress: false,
        estimatedTime: '12 weeks',
        projects: ['ForexAcuity Platform']
      },
      {
        id: 'financial-data',
        title: 'Financial Data & Analytics',
        description: 'Market data processing and analysis',
        skills: ['Market Data APIs', 'Technical Analysis', 'Backtesting', 'Quantitative Analysis'],
        completed: true,
        inProgress: false,
        estimatedTime: '8 weeks'
      },
      {
        id: 'blockchain',
        title: 'Blockchain & DeFi',
        description: 'Cryptocurrency and decentralized finance',
        skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi Protocols'],
        completed: false,
        inProgress: true,
        estimatedTime: '10 weeks'
      },
      {
        id: 'regulatory',
        title: 'Financial Regulations',
        description: 'Compliance and regulatory frameworks',
        skills: ['KYC/AML', 'Risk Management', 'Audit Trails', 'Reporting'],
        completed: false,
        inProgress: false,
        estimatedTime: '6 weeks'
      }
    ]
  }
];

export default function LearningPathVisualization() {
  const [selectedPath, setSelectedPath] = useState<string>(learningPaths[0].id);
  const [selectedStep, setSelectedStep] = useState<string | null>(null);

  const currentPath = learningPaths.find(path => path.id === selectedPath);

  return (
    <div className="space-y-8">
      {/* Path Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {learningPaths.map((path) => (
          <motion.button
            key={path.id}
            onClick={() => setSelectedPath(path.id)}
            className={`p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              selectedPath === path.id
                ? 'border-blue-400 bg-slate-800'
                : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center mb-3">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${path.color} mr-3`}>
                {path.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{path.title}</h3>
              </div>
            </div>
            <p className="text-gray-300 mb-4">{path.description}</p>
            
            {/* Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Progress</span>
                <span className="text-blue-400 font-semibold">{path.progress}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <motion.div
                  className={`h-2 rounded-full bg-gradient-to-r ${path.color}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${path.progress}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Selected Path Details */}
      {currentPath && (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedPath}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-800/50 rounded-xl p-8 border border-slate-700"
          >
            <div className="flex items-center mb-6">
              <div className={`p-4 rounded-lg bg-gradient-to-r ${currentPath.color} mr-4`}>
                {currentPath.icon}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">{currentPath.title}</h2>
                <p className="text-gray-300">{currentPath.description}</p>
              </div>
            </div>

            {/* Path Steps */}
            <div className="space-y-4">
              {currentPath.steps.map((step, index) => (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className={`border rounded-lg p-6 cursor-pointer transition-all duration-300 ${
                    selectedStep === step.id
                      ? 'border-blue-400 bg-slate-700/50'
                      : 'border-slate-600 bg-slate-700/30 hover:border-slate-500'
                  }`}
                  onClick={() => setSelectedStep(selectedStep === step.id ? null : step.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="mr-4">
                        {step.completed ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : step.inProgress ? (
                          <Play className="w-6 h-6 text-blue-400" />
                        ) : (
                          <Circle className="w-6 h-6 text-gray-500" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                        <p className="text-gray-300">{step.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-gray-400">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">{step.estimatedTime}</span>
                      <ChevronRight className={`w-5 h-5 ml-2 transition-transform ${
                        selectedStep === step.id ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </div>

                  <AnimatePresence>
                    {selectedStep === step.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-slate-600"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 mb-2">SKILLS</h4>
                            <div className="flex flex-wrap gap-2">
                              {step.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-3 py-1 bg-slate-600 text-white text-sm rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          {step.projects && (
                            <div>
                              <h4 className="text-sm font-semibold text-gray-400 mb-2">PROJECTS</h4>
                              <div className="space-y-1">
                                {step.projects.map((project) => (
                                  <div key={project} className="text-blue-400 text-sm">
                                    • {project}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}