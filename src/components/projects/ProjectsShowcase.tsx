'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ExternalLink, Github, Calendar, Star, TrendingUp, BookOpen, Briefcase, User } from 'lucide-react';
import { forexAcuityProject } from '@/data/forexacuity-showcase';

interface Project {
  id: string;
  title: string;
  description: string;
  category: 'learning' | 'fintech' | 'business' | 'personal';
  technologies: string[];
  highlights: string[];
  githubUrl?: string;
  liveUrl?: string;
  imageUrl: string;
  featured: boolean;
  completionDate: Date;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'completed' | 'in-progress' | 'planning';
}

// Actual completed projects
const completedProjects: Project[] = [
  {
    id: 'forexacuity',
    title: 'ForexAcuity Analytics Dashboard',
    description: 'Real-time forex analytics dashboard with MT5 integration, WebSocket architecture, and subscription payments.',
    category: 'fintech',
    technologies: ['Next.js', 'Express.js', 'Python', 'WebSockets', 'Stripe'],
    highlights: [
      'Sub-second real-time data updates',
      '£250 lifetime subscription model',
      'Asian Fractal pattern detection'
    ],
    githubUrl: 'https://github.com/yourusername/fx-platform',
    liveUrl: 'https://forexacuity.com',
    imageUrl: '/images/projects/forexacuity-dashboard.png',
    featured: true,
    completionDate: new Date('2024-12-01'),
    difficulty: 'advanced',
    status: 'completed'
  },
  {
    id: 'homeeyeclinic',
    title: 'Home Eye Clinic Website',
    description: 'Professional website for UK-based home eye care service with multi-channel booking system and responsive design.',
    category: 'business',
    technologies: ['Laravel 11', 'Livewire 3', 'PHP 8.2', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
    highlights: [
      'Multi-channel booking system (full form, quick booking, callback)',
      'Email notifications and admin management',
      'Responsive design for elderly user demographic',
      'NHS and private service pricing integration'
    ],
    githubUrl: 'https://github.com/yourusername/homeeyeclinic',
    liveUrl: 'https://homeeyeclinic.co.uk',
    imageUrl: '/images/projects/home-eye-clinic-preview.jpg',
    featured: true,
    completionDate: new Date('2024-09-30'),
    difficulty: 'intermediate',
    status: 'completed'
  },
  {
    id: 'portfolio',
    title: 'DevHakim Portfolio',
    description: 'This portfolio website built with Next.js, showcasing my transition journey and technical projects with interactive features.',
    category: 'personal',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    highlights: [
      'Responsive design system',
      'Interactive skill and timeline editing',
      'localStorage persistence'
    ],
    githubUrl: 'https://github.com/yourusername/devhakim-portfolio',
    liveUrl: 'https://devhakim.com',
    imageUrl: '/images/projects/portfolio-preview.jpg',
    featured: true,
    completionDate: new Date('2025-01-15'),
    difficulty: 'intermediate',
    status: 'in-progress'
  }
];

// Potential future projects (not yet started)
const plannedProjects: Project[] = [
  {
    id: 'fastapi-task-manager',
    title: 'FastAPI Task Manager',
    description: 'A RESTful task management API built with FastAPI, featuring user authentication, task CRUD operations, and data validation.',
    category: 'learning',
    technologies: ['FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Pydantic', 'JWT'],
    highlights: [
      'OpenAPI documentation generation',
      'Async database operations',
      'Comprehensive test coverage'
    ],
    githubUrl: '',
    imageUrl: '/images/projects/task-manager-preview.jpg',
    featured: false,
    completionDate: new Date('2025-03-01'),
    difficulty: 'beginner',
    status: 'planning'
  },
  {
    id: 'healthcare-api',
    title: 'Healthcare Data Management API',
    description: 'RESTful API for healthcare data management with secure authentication and HIPAA compliance considerations.',
    category: 'business',
    technologies: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'JWT'],
    highlights: [
      'HIPAA-compliant data handling patterns',
      'Role-based access control system',
      'Comprehensive audit trail functionality'
    ],
    githubUrl: '',
    imageUrl: '/images/projects/healthcare-api-preview.jpg',
    featured: false,
    completionDate: new Date('2025-04-01'),
    difficulty: 'intermediate',
    status: 'planning'
  },
  {
    id: 'ecommerce-platform',
    title: 'E-commerce Platform MVP',
    description: 'A small business e-commerce solution with product catalog, shopping cart, and payment integration.',
    category: 'business',
    technologies: ['Django', 'React', 'Stripe', 'PostgreSQL', 'Redis'],
    highlights: [
      'Stripe payment integration',
      'Inventory management system',
      'Order tracking functionality'
    ],
    githubUrl: '',
    imageUrl: '/images/projects/ecommerce-preview.jpg',
    featured: false,
    completionDate: new Date('2025-05-01'),
    difficulty: 'intermediate',
    status: 'planning'
  },
  {
    id: 'crypto-tracker',
    title: 'Crypto Price Tracker',
    description: 'Personal cryptocurrency portfolio tracker with real-time price updates and profit/loss calculations.',
    category: 'personal',
    technologies: ['React', 'Node.js', 'Express', 'CoinGecko API', 'Chart.js'],
    highlights: [
      'Real-time price data integration',
      'Portfolio performance analytics',
      'Price alert notifications'
    ],
    githubUrl: '',
    imageUrl: '/images/projects/crypto-tracker-preview.jpg',
    featured: false,
    completionDate: new Date('2025-06-01'),
    difficulty: 'beginner',
    status: 'planning'
  },
  {
    id: 'healthcare-ai',
    title: 'Healthcare AI Assistant',
    description: 'AI-powered chatbot for basic healthcare information using OpenAI API with healthcare domain knowledge.',
    category: 'learning',
    technologies: ['Python', 'OpenAI API', 'Streamlit', 'LangChain', 'Pinecone'],
    highlights: [
      'Healthcare-specific knowledge base',
      'Conversational AI interface',
      'Vector database integration'
    ],
    githubUrl: '',
    imageUrl: '/images/projects/ai-chatbot-preview.jpg',
    featured: false,
    completionDate: new Date('2025-07-01'),
    difficulty: 'advanced',
    status: 'planning'
  }
];

const allProjects: Project[] = [...completedProjects, ...plannedProjects];

const categoryInfo = {
  learning: {
    icon: <BookOpen className="w-5 h-5" />,
    label: 'Learning',
    color: 'from-purple-500 to-pink-500',
    bgColor: 'bg-purple-500/20',
    textColor: 'text-purple-400',
    borderColor: 'border-purple-500/30'
  },
  fintech: {
    icon: <TrendingUp className="w-5 h-5" />,
    label: 'Fintech',
    color: 'from-green-500 to-blue-500',
    bgColor: 'bg-green-500/20',
    textColor: 'text-green-400',
    borderColor: 'border-green-500/30'
  },
  business: {
    icon: <Briefcase className="w-5 h-5" />,
    label: 'Business',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/20',
    textColor: 'text-blue-400',
    borderColor: 'border-blue-500/30'
  },
  personal: {
    icon: <User className="w-5 h-5" />,
    label: 'Personal',
    color: 'from-orange-500 to-red-500',
    bgColor: 'bg-orange-500/20',
    textColor: 'text-orange-400',
    borderColor: 'border-orange-500/30'
  }
};

const difficultyColors = {
  beginner: 'text-green-400',
  intermediate: 'text-yellow-400',
  advanced: 'text-red-400'
};

const statusColors = {
  completed: 'text-green-400',
  'in-progress': 'text-blue-400',
  planning: 'text-yellow-400'
};

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[]>(allProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(allProjects);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'difficulty' | 'alphabetical'>('date');

  // Filter and search projects
  useEffect(() => {
    let filtered = projects;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return b.completionDate.getTime() - a.completionDate.getTime();
        case 'difficulty':
          const diffOrder = { beginner: 1, intermediate: 2, advanced: 3 };
          return diffOrder[b.difficulty] - diffOrder[a.difficulty];
        case 'alphabetical':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [projects, selectedCategory, searchTerm, sortBy]);

  const categoryStats = Object.keys(categoryInfo).map(category => ({
    category,
    count: projects.filter(p => p.category === category).length,
    ...categoryInfo[category as keyof typeof categoryInfo]
  }));

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-4">My Projects</h1>
          <p className="text-xl text-gray-400 mb-8">
            A showcase of projects built during my journey from healthcare to software engineering
          </p>
          
          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {categoryStats.map(({ category, count, icon, label, bgColor, textColor }) => (
              <div key={category} className={`${bgColor} backdrop-blur-sm rounded-lg p-4 border border-slate-600/50`}>
                <div className={`flex items-center justify-center mb-2 ${textColor}`}>
                  {icon}
                </div>
                <div className="text-2xl font-bold text-white">{count}</div>
                <div className="text-sm text-gray-400">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-slate-700/30 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 mb-12">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-600/50 text-gray-300 hover:bg-slate-600'
                }`}
              >
                All ({projects.length})
              </button>
              {Object.entries(categoryInfo).map(([category, { label, icon, textColor }]) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    selectedCategory === category
                      ? `bg-gradient-to-r ${categoryInfo[category as keyof typeof categoryInfo].color} text-white`
                      : 'bg-slate-600/50 text-gray-300 hover:bg-slate-600'
                  }`}
                >
                  <span className={selectedCategory === category ? 'text-white' : textColor}>
                    {icon}
                  </span>
                  <span>{label} ({projects.filter(p => p.category === category).length})</span>
                </button>
              ))}
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as 'date' | 'difficulty' | 'alphabetical')}
              className="px-4 py-3 bg-slate-600/50 text-white rounded-lg border border-slate-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date">Sort by Date</option>
              <option value="difficulty">Sort by Difficulty</option>
              <option value="alphabetical">Sort Alphabetically</option>
            </select>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const categoryStyle = categoryInfo[project.category];
            
            return (
              <div
                key={project.id}
                className="group bg-slate-700/50 backdrop-blur-sm rounded-xl border border-slate-600/50 overflow-hidden hover:border-slate-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                {/* Project Image/Preview */}
                <div className="relative h-48 bg-gradient-to-br from-slate-600 to-slate-700 overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${categoryStyle.color} opacity-20`}></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`p-4 rounded-full bg-gradient-to-r ${categoryStyle.color}`}>
                      <span className="text-white text-2xl">{categoryStyle.icon}</span>
                    </div>
                  </div>
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryStyle.bgColor} ${categoryStyle.textColor} ${categoryStyle.borderColor}`}>
                      {categoryStyle.label}
                    </span>
                    {project.featured && (
                      <span className="flex items-center space-x-1 px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-full text-xs font-medium border border-yellow-500/30">
                        <Star className="w-3 h-3" />
                        <span>Featured</span>
                      </span>
                    )}
                  </div>

                  <div className="absolute top-4 right-4 flex flex-col space-y-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${statusColors[project.status]} bg-slate-700/50`}>
                      {project.status.replace('-', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${difficultyColors[project.difficulty]} bg-slate-700/50`}>
                      {project.difficulty}
                    </span>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-600/50 text-gray-300 rounded text-xs border border-slate-500/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-slate-600/50 text-gray-400 rounded text-xs border border-slate-500/50">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  <ul className="text-xs text-gray-400 mb-4 space-y-1">
                    {project.highlights.slice(0, 2).map((highlight, index) => (
                      <li key={index} className="flex items-center">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mr-2"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Date */}
                  <div className="flex items-center text-xs text-gray-500 mb-4">
                    <Calendar className="w-3 h-3 mr-1" />
                    {project.completionDate.toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'short' 
                    })}
                  </div>

                  {/* Links */}
                  <div className="flex space-x-3">
                    <Link
                      href={`/projects/${project.id}`}
                      className="flex items-center px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      Details
                    </Link>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        className="flex items-center px-3 py-2 bg-slate-600/50 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors duration-200 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Github className="w-4 h-4 mr-2" />
                        Code
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* No Results */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p>Try adjusting your search terms or filters</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-blue-600/20 to-green-600/20 rounded-xl p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-2">Interested in My Work?</h3>
            <p className="text-gray-400 mb-6">
              These projects represent my learning journey and problem-solving approach. 
              Let's discuss how I can contribute to your team.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
              >
                Get In Touch
              </a>
              <a
                href="/commands"
                className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold hover:border-gray-400 hover:text-white transition-colors duration-200"
              >
                View Commands Learned
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}