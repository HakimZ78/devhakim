export interface PathStep {
  id: string;
  path_id: string;
  title: string;
  description: string;
  skills: string[];
  completed: boolean;
  in_progress: boolean;
  estimated_time: string;
  projects: string[];
  order_index: number;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  progress: number;
  order_index: number;
  path_steps?: PathStep[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  target_date: string;
  completed: boolean;
  completion_date?: string;
  progress: number;
  category: string;
  order_index: number;
}

export interface Certification {
  id: string;
  title: string;
  provider: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  completion_date?: string;
  expected_date?: string;
  skills: string[];
  order_index: number;
}

export const journeyData = {
  learningPaths: [
    {
      id: 'ai-healthcare',
      title: 'AI/Healthcare Engineer',
      description: 'Combining healthcare domain knowledge with AI/ML technologies',
      icon: 'Brain',
      color: 'from-purple-500 to-pink-500',
      progress: 65,
      order_index: 1,
      path_steps: [
        {
          id: 'ai-python-basics',
          path_id: 'ai-healthcare',
          title: 'Python Fundamentals',
          description: 'Master Python programming basics and advanced concepts',
          skills: ['Python', 'OOP', 'Data Structures', 'Algorithms'],
          completed: true,
          in_progress: false,
          estimated_time: '8 weeks',
          projects: ['ForexAcuity Platform', 'Data Analysis Scripts'],
          order_index: 1
        },
        {
          id: 'ai-ml-basics',
          path_id: 'ai-healthcare',
          title: 'Machine Learning',
          description: 'Learn ML algorithms and frameworks',
          skills: ['Scikit-learn', 'TensorFlow', 'PyTorch', 'Data Science'],
          completed: true,
          in_progress: false,
          estimated_time: '12 weeks',
          projects: [],
          order_index: 2
        },
        {
          id: 'ai-healthcare-apps',
          path_id: 'ai-healthcare',
          title: 'Healthcare AI Applications',
          description: 'Apply AI to healthcare problems',
          skills: ['Medical Imaging', 'NLP', 'Clinical Data', 'Regulatory'],
          completed: false,
          in_progress: true,
          estimated_time: '16 weeks',
          projects: ['Healthcare AI Assistant'],
          order_index: 3
        },
        {
          id: 'ai-deployment',
          path_id: 'ai-healthcare',
          title: 'AI Model Deployment',
          description: 'Deploy and scale AI applications',
          skills: ['Docker', 'Kubernetes', 'MLOps', 'Cloud Platforms'],
          completed: false,
          in_progress: false,
          estimated_time: '8 weeks',
          projects: [],
          order_index: 4
        }
      ]
    },
    {
      id: 'fullstack-python',
      title: 'Full-Stack Python',
      description: 'End-to-end web development with Python and modern frameworks',
      icon: 'Code',
      color: 'from-blue-500 to-cyan-500',
      progress: 80,
      order_index: 2,
      path_steps: [
        {
          id: 'fs-backend',
          path_id: 'fullstack-python',
          title: 'Backend & APIs',
          description: 'Build robust APIs with FastAPI and Django',
          skills: ['FastAPI', 'Django', 'PostgreSQL', 'Redis'],
          completed: true,
          in_progress: false,
          estimated_time: '10 weeks',
          projects: ['ForexAcuity API', 'Portfolio Backend'],
          order_index: 1
        },
        {
          id: 'fs-frontend',
          path_id: 'fullstack-python',
          title: 'Frontend Frameworks',
          description: 'Modern frontend development',
          skills: ['React', 'Next.js', 'TypeScript', 'Tailwind'],
          completed: true,
          in_progress: false,
          estimated_time: '8 weeks',
          projects: ['Portfolio Website', 'Trading Dashboard'],
          order_index: 2
        },
        {
          id: 'fs-devops',  
          path_id: 'fullstack-python',
          title: 'DevOps & Deployment',
          description: 'Infrastructure and deployment automation',
          skills: ['Docker', 'CI/CD', 'AWS', 'Monitoring'],
          completed: false,
          in_progress: true,
          estimated_time: '6 weeks',
          projects: [],
          order_index: 3
        },
        {
          id: 'fs-architecture',
          path_id: 'fullstack-python',
          title: 'System Architecture',
          description: 'Design scalable systems',
          skills: ['Microservices', 'Event-driven', 'Caching', 'Security'],
          completed: false,
          in_progress: false,
          estimated_time: '8 weeks',
          projects: [],
          order_index: 4
        }
      ]
    },
    {
      id: 'fintech',
      title: 'Fintech Developer',
      description: 'Specialized in financial technology and trading systems',
      icon: 'DollarSign',
      color: 'from-green-500 to-emerald-500',
      progress: 75,
      order_index: 3,
      path_steps: [
        {
          id: 'ft-trading',
          path_id: 'fintech',
          title: 'Trading Systems',
          description: 'Real-time trading platform development',
          skills: ['WebSockets', 'Real-time Data', 'Order Management', 'Risk Management'],
          completed: true,
          in_progress: false,
          estimated_time: '12 weeks',
          projects: ['ForexAcuity Platform'],
          order_index: 1
        },
        {
          id: 'ft-analytics',
          path_id: 'fintech',
          title: 'Financial Data & Analytics',
          description: 'Market data processing and analysis',
          skills: ['Market Data APIs', 'Technical Analysis', 'Backtesting', 'Quantitative Analysis'],
          completed: true,
          in_progress: false,
          estimated_time: '8 weeks',
          projects: [],
          order_index: 2
        },
        {
          id: 'ft-blockchain',
          path_id: 'fintech',
          title: 'Blockchain & DeFi',
          description: 'Cryptocurrency and decentralized finance',
          skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi Protocols'],
          completed: false,
          in_progress: true,
          estimated_time: '10 weeks',
          projects: ['Crypto Portfolio Tracker'],
          order_index: 3
        },
        {
          id: 'ft-compliance',
          path_id: 'fintech',
          title: 'Financial Regulations',
          description: 'Compliance and regulatory frameworks',
          skills: ['KYC/AML', 'Risk Management', 'Audit Trails', 'Reporting'],
          completed: false,
          in_progress: false,
          estimated_time: '6 weeks',
          projects: [],
          order_index: 4
        }
      ]
    }
  ] as LearningPath[],

  milestones: [
    {
      id: 'forexacuity-launch',
      title: 'ForexAcuity Platform Launch',
      description: 'Built and deployed real-time forex trading platform with Python/FastAPI backend',
      target_date: '2024-10-15',
      completed: true,
      completion_date: '2024-10-15',
      progress: 100,
      category: 'Project',
      order_index: 1
    },
    {
      id: 'msc-completion',
      title: 'MSc Computer Science',
      description: 'Complete Masters degree in Computer Science with focus on AI/ML',
      target_date: '2025-09-30',
      completed: false,
      progress: 75,
      category: 'Education',
      order_index: 2
    },
    {
      id: 'aws-cert',
      title: 'AWS Solutions Architect',
      description: 'Obtain AWS Solutions Architect Associate certification',
      target_date: '2025-03-15',
      completed: false,
      progress: 40,
      category: 'Technical',
      order_index: 3
    },
    {
      id: 'portfolio-enhancement',
      title: 'Portfolio Enhancement',
      description: 'Complete Phase 4 & 5 of portfolio with advanced features',
      target_date: '2025-02-28',
      completed: false,
      progress: 60,
      category: 'Project',
      order_index: 4
    },
    {
      id: 'first-role',
      title: 'First Developer Role',
      description: 'Secure first professional software development position',
      target_date: '2025-06-01',
      completed: false,
      progress: 25,
      category: 'Career',
      order_index: 5
    }
  ] as Milestone[],

  certifications: [
    {
      id: 'msc-cs',
      title: 'MSc Computer Science',
      provider: 'University of London',
      description: 'Masters degree focusing on Machine Learning, AI, and Software Engineering',
      status: 'in_progress' as const,
      expected_date: '2025-09-30',
      skills: ['Machine Learning', 'AI', 'Algorithms', 'Software Engineering', 'Research'],
      order_index: 1
    },
    {
      id: 'aws-saa',
      title: 'AWS Solutions Architect Associate',
      provider: 'Amazon Web Services',
      description: 'Cloud architecture and AWS services expertise',
      status: 'planned' as const,
      expected_date: '2025-03-15',
      skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security', 'Scalability'],
      order_index: 2
    },
    {
      id: 'pcap',
      title: 'PCAP - Certified Associate in Python Programming',
      provider: 'Python Institute',
      description: 'Professional Python programming certification',
      status: 'planned' as const,
      expected_date: '2025-04-30',
      skills: ['Python', 'OOP', 'Data Structures', 'Algorithms'],
      order_index: 3
    },
    {
      id: 'fastapi-course',
      title: 'FastAPI - The Complete Course',
      provider: 'Udemy',
      description: 'Comprehensive FastAPI development from basics to advanced features',
      status: 'completed' as const,
      completion_date: '2024-08-15',
      skills: ['FastAPI', 'Python', 'API Development', 'Authentication', 'Testing'],
      order_index: 5
    }
  ] as Certification[]
};

// Helper functions for managing journey data
export function getLearningPaths(): LearningPath[] {
  return journeyData.learningPaths.sort((a, b) => a.order_index - b.order_index);
}

export function getMilestones(): Milestone[] {
  return journeyData.milestones.sort((a, b) => a.order_index - b.order_index);
}

export function getCertifications(): Certification[] {
  return journeyData.certifications.sort((a, b) => a.order_index - b.order_index);
}

export function getPathSteps(pathId: string): PathStep[] {
  const path = journeyData.learningPaths.find(p => p.id === pathId);
  return path?.path_steps?.sort((a, b) => a.order_index - b.order_index) || [];
}

export function addPathStep(pathId: string, step: Omit<PathStep, 'id' | 'path_id'>): PathStep {
  const newStep: PathStep = {
    ...step,
    id: `step-${Date.now()}`,
    path_id: pathId
  };
  
  const path = journeyData.learningPaths.find(p => p.id === pathId);
  if (path) {
    if (!path.path_steps) path.path_steps = [];
    path.path_steps.push(newStep);
  }
  
  return newStep;
}

export function updatePathStep(stepId: string, updates: Partial<PathStep>): void {
  for (const path of journeyData.learningPaths) {
    if (path.path_steps) {
      const stepIndex = path.path_steps.findIndex(s => s.id === stepId);
      if (stepIndex !== -1) {
        path.path_steps[stepIndex] = { ...path.path_steps[stepIndex], ...updates };
        break;
      }
    }
  }
}

export function deletePathStep(stepId: string): void {
  for (const path of journeyData.learningPaths) {
    if (path.path_steps) {
      path.path_steps = path.path_steps.filter(s => s.id !== stepId);
    }
  }
}

export function deleteMilestone(milestoneId: string): void {
  journeyData.milestones = journeyData.milestones.filter(m => m.id !== milestoneId);
}

export function deleteCertification(certId: string): void {
  journeyData.certifications = journeyData.certifications.filter(c => c.id !== certId);
}