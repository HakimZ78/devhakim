import { supabase } from './supabase'
import type { LearningPath, PathStep, Milestone, Certification } from './supabase'

// Initial data from the original journey components
export const INITIAL_LEARNING_PATHS: Omit<LearningPath, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'AI/Healthcare Engineer',
    description: 'Combining healthcare domain knowledge with AI/ML technologies',
    icon: 'Brain',
    color: 'from-purple-500 to-pink-500',
    progress: 65,
    order_index: 1
  },
  {
    title: 'Full-Stack Python',
    description: 'End-to-end web development with Python and modern frameworks',
    icon: 'Code',
    color: 'from-blue-500 to-cyan-500',
    progress: 80,
    order_index: 2
  },
  {
    title: 'Fintech Developer',
    description: 'Specialized in financial technology and trading systems',
    icon: 'DollarSign',
    color: 'from-green-500 to-emerald-500',
    progress: 75,
    order_index: 3
  }
]

export const INITIAL_MILESTONES: Omit<Milestone, 'id' | 'created_at' | 'updated_at'>[] = [
  {
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
    title: 'MSc Computer Science',
    description: 'Complete Master\'s degree in Computer Science with focus on AI/ML',
    target_date: '2025-09-30',
    completed: false,
    progress: 75,
    category: 'Education',
    order_index: 2
  },
  {
    title: 'AWS Solutions Architect',
    description: 'Obtain AWS Solutions Architect Associate certification',
    target_date: '2025-03-15',
    completed: false,
    progress: 40,
    category: 'Technical',
    order_index: 3
  },
  {
    title: 'Portfolio Enhancement',
    description: 'Complete Phase 4 & 5 of portfolio with advanced features',
    target_date: '2025-02-28',
    completed: false,
    progress: 60,
    category: 'Project',
    order_index: 4
  },
  {
    title: 'First Developer Role',
    description: 'Secure first professional software development position',
    target_date: '2025-06-01',
    completed: false,
    progress: 25,
    category: 'Career',
    order_index: 5
  },
  {
    title: 'Open Source Contribution',
    description: 'Make meaningful contributions to 3 open source projects',
    target_date: '2025-04-30',
    completed: false,
    progress: 20,
    category: 'Technical',
    order_index: 6
  }
]

export const INITIAL_CERTIFICATIONS: Omit<Certification, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    title: 'MSc Computer Science',
    provider: 'University of London',
    description: 'Master\'s degree focusing on Machine Learning, AI, and Software Engineering',
    status: 'in_progress',
    expected_date: '2025-09-30',
    skills: ['Machine Learning', 'AI', 'Algorithms', 'Software Engineering', 'Research'],
    order_index: 1
  },
  {
    title: 'AWS Solutions Architect Associate',
    provider: 'Amazon Web Services',
    description: 'Cloud architecture and AWS services expertise',
    status: 'planned',
    expected_date: '2025-03-15',
    skills: ['AWS', 'Cloud Architecture', 'DevOps', 'Security', 'Scalability'],
    order_index: 2
  },
  {
    title: 'PCAP - Certified Associate in Python Programming',
    provider: 'Python Institute',
    description: 'Professional Python programming certification',
    status: 'planned',
    expected_date: '2025-04-30',
    skills: ['Python', 'OOP', 'Data Structures', 'Algorithms'],
    order_index: 3
  },
  {
    title: 'Docker Certified Associate',
    provider: 'Docker Inc.',
    description: 'Container orchestration and Docker expertise',
    status: 'planned',
    expected_date: '2025-05-15',
    skills: ['Docker', 'Containers', 'DevOps', 'Microservices'],
    order_index: 4
  },
  {
    title: 'FastAPI - The Complete Course',
    provider: 'Udemy',
    description: 'Comprehensive FastAPI development from basics to advanced features',
    status: 'completed',
    completion_date: '2024-08-15',
    skills: ['FastAPI', 'Python', 'API Development', 'Authentication', 'Testing'],
    order_index: 5
  },
  {
    title: 'Advanced React Development',
    provider: 'Frontend Masters',
    description: 'Advanced React patterns, performance optimization, and state management',
    status: 'in_progress',
    expected_date: '2025-02-28',
    skills: ['React', 'TypeScript', 'Performance', 'State Management', 'Testing'],
    order_index: 6
  },
  {
    title: 'Machine Learning Specialization',
    provider: 'Coursera',
    description: 'Comprehensive ML course covering algorithms, neural networks, and applications',
    status: 'in_progress',
    expected_date: '2025-04-15',
    skills: ['Machine Learning', 'Neural Networks', 'TensorFlow', 'Python', 'Mathematics'],
    order_index: 7
  },
  {
    title: 'System Design Interview Course',
    provider: 'Educative',
    description: 'Learn to design scalable systems for technical interviews',
    status: 'planned',
    expected_date: '2025-03-30',
    skills: ['System Design', 'Architecture', 'Scalability', 'Databases', 'Microservices'],
    order_index: 8
  }
]

// Function to initialize the database with sample data
export async function initializeDatabase() {
  try {
    console.log('🚀 Initializing database with sample data...')
    
    // Insert learning paths
    const { data: pathsData, error: pathsError } = await supabase
      .from('learning_paths')
      .insert(INITIAL_LEARNING_PATHS)
      .select()
    
    if (pathsError) {
      console.error('Error inserting learning paths:', pathsError)
      return
    }
    
    console.log('✅ Learning paths inserted:', pathsData?.length)
    
    // Insert milestones
    const { data: milestonesData, error: milestonesError } = await supabase
      .from('milestones')
      .insert(INITIAL_MILESTONES)
      .select()
    
    if (milestonesError) {
      console.error('Error inserting milestones:', milestonesError)
      return
    }
    
    console.log('✅ Milestones inserted:', milestonesData?.length)
    
    // Insert certifications
    const { data: certsData, error: certsError } = await supabase
      .from('certifications')
      .insert(INITIAL_CERTIFICATIONS)
      .select()
    
    if (certsError) {
      console.error('Error inserting certifications:', certsError)
      return
    }
    
    console.log('✅ Certifications inserted:', certsData?.length)
    
    // Create path steps for all learning paths with original data
    if (pathsData && pathsData.length > 0) {
      const allSteps: Omit<PathStep, 'id' | 'created_at' | 'updated_at'>[] = []
      
      // AI/Healthcare Engineer steps
      const aiPath = pathsData.find(p => p.title === 'AI/Healthcare Engineer')
      if (aiPath) {
        allSteps.push(
          {
            path_id: aiPath.id,
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
            path_id: aiPath.id,
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
            path_id: aiPath.id,
            title: 'Healthcare AI Applications',
            description: 'Apply AI to healthcare problems',
            skills: ['Medical Imaging', 'NLP', 'Clinical Data', 'Regulatory'],
            completed: false,
            in_progress: true,
            estimated_time: '16 weeks',
            projects: [],
            order_index: 3
          },
          {
            path_id: aiPath.id,
            title: 'AI Model Deployment',
            description: 'Deploy and scale AI applications',
            skills: ['Docker', 'Kubernetes', 'MLOps', 'Cloud Platforms'],
            completed: false,
            in_progress: false,
            estimated_time: '8 weeks',
            projects: [],
            order_index: 4
          }
        )
      }
      
      // Full-Stack Python steps
      const fullStackPath = pathsData.find(p => p.title === 'Full-Stack Python')
      if (fullStackPath) {
        allSteps.push(
          {
            path_id: fullStackPath.id,
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
            path_id: fullStackPath.id,
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
            path_id: fullStackPath.id,
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
            path_id: fullStackPath.id,
            title: 'System Architecture',
            description: 'Design scalable systems',
            skills: ['Microservices', 'Event-driven', 'Caching', 'Security'],
            completed: false,
            in_progress: false,
            estimated_time: '8 weeks',
            projects: [],
            order_index: 4
          }
        )
      }
      
      // Fintech Developer steps
      const fintechPath = pathsData.find(p => p.title === 'Fintech Developer')
      if (fintechPath) {
        allSteps.push(
          {
            path_id: fintechPath.id,
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
            path_id: fintechPath.id,
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
            path_id: fintechPath.id,
            title: 'Blockchain & DeFi',
            description: 'Cryptocurrency and decentralized finance',
            skills: ['Solidity', 'Web3', 'Smart Contracts', 'DeFi Protocols'],
            completed: false,
            in_progress: true,
            estimated_time: '10 weeks',
            projects: [],
            order_index: 3
          },
          {
            path_id: fintechPath.id,
            title: 'Financial Regulations',
            description: 'Compliance and regulatory frameworks',
            skills: ['KYC/AML', 'Risk Management', 'Audit Trails', 'Reporting'],
            completed: false,
            in_progress: false,
            estimated_time: '6 weeks',
            projects: [],
            order_index: 4
          }
        )
      }
      
      if (allSteps.length > 0) {
        const { data: stepsData, error: stepsError } = await supabase
          .from('path_steps')
          .insert(allSteps)
          .select()
        
        if (stepsError) {
          console.error('Error inserting path steps:', stepsError)
        } else {
          console.log('✅ Path steps inserted:', stepsData?.length)
        }
      }
    }
    
    console.log('🎉 Database initialization complete!')
    
  } catch (error) {
    console.error('❌ Database initialization failed:', error)
  }
}

// Function to reset database (useful for testing)
export async function resetDatabase() {
  try {
    console.log('🔄 Resetting database...')
    
    // Delete all data in reverse order of dependencies
    await supabase.from('path_steps').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('certifications').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('milestones').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    await supabase.from('learning_paths').delete().neq('id', '00000000-0000-0000-0000-000000000000')
    
    console.log('✅ Database reset complete!')
    
    // Reinitialize with fresh data
    await initializeDatabase()
    
  } catch (error) {
    console.error('❌ Database reset failed:', error)
  }
}