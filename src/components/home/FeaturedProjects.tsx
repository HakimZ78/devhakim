'use client';

import { ExternalLink, Zap, TrendingUp, BookOpen, User } from 'lucide-react';
import Link from 'next/link';

const featuredProjects = [
  {
    id: 'forexacuity',
    title: 'ForexAcuity Analytics Dashboard',
    category: 'fintech',
    description: 'Real-time forex analytics dashboard with MT5 integration, WebSocket architecture, and subscription payments.',
    technologies: ['Next.js', 'Express.js', 'Python', 'WebSockets', 'Stripe'],
    highlights: [
      'Sub-second real-time data updates',
      '£250 lifetime subscription model',
      'Asian Fractal pattern detection'
    ],
    metrics: {
      lines: '15,000+',
      apis: '25',
      latency: '<50ms'
    },
    image: '/images/forexacuity-preview.jpg',
    liveUrl: 'https://forexacuity.co.uk',
    icon: <TrendingUp className="w-6 h-6" />,
    color: 'from-green-500 to-blue-500'
  },
  {
    id: 'homeeyeclinic',
    title: 'Home Eye Clinic Website',
    category: 'business',
    description: 'Professional website for UK-based home eye care service with multi-channel booking system and responsive design.',
    technologies: ['Laravel 11', 'Livewire 3', 'PHP 8.2', 'MySQL', 'Tailwind CSS'],
    highlights: [
      'Multi-channel booking system',
      'Responsive design for elderly users',
      'Email notifications & admin management'
    ],
    metrics: {
      bookings: '50+',
      uptime: '99.9%',
      users: 'All ages'
    },
    image: '/images/home-eye-clinic-preview.jpg',
    liveUrl: 'https://homeeyeclinic.co.uk',
    icon: <User className="w-6 h-6" />,
    color: 'from-teal-500 to-blue-500'
  },
  {
    id: 'portfolio',
    title: 'DevHakim Portfolio',
    category: 'personal',
    description: 'This portfolio website built with Next.js, showcasing my transition journey and technical projects with interactive features.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
    highlights: [
      'Responsive design system',
      'Admin content management',
      'Real-time updates'
    ],
    metrics: {
      pages: '8',
      components: '25+',
      features: 'CMS'
    },  
    image: '/images/portfolio-preview.jpg',
    liveUrl: 'https://devhakim.com',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'learning-dashboard',
    title: 'Full-Stack Learning Dashboard',
    category: 'learning',
    description: 'Interactive dashboard tracking my journey from healthcare to software engineering with progress metrics.',
    technologies: ['React', 'Python', 'FastAPI', 'PostgreSQL', 'Chart.js'],
    highlights: [
      'Progress tracking across multiple paths',
      'Command reference database',
      'Project timeline visualization'
    ],
    metrics: {
      commands: '100+',
      projects: '12',
      hours: '800+'
    },
    image: '/images/learning-dashboard-preview.jpg',
    icon: <BookOpen className="w-6 h-6" />,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'healthcare-api',
    title: 'Healthcare Data API',
    category: 'business',
    description: 'RESTful API for healthcare data management with secure authentication and HIPAA compliance considerations.',
    technologies: ['Django', 'DRF', 'PostgreSQL', 'Redis', 'JWT'],
    highlights: [
      'HIPAA-compliant data handling',
      'Role-based access control',
      'Audit trail functionality'
    ],
    metrics: {
      endpoints: '40+',
      models: '15',
      tests: '90%'
    },
    image: '/images/healthcare-api-preview.jpg',
    icon: <Zap className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500'
  },
  {
    id: 'portfolio',
    title: 'DevHakim Portfolio',
    category: 'personal',
    description: 'This portfolio website built with Next.js, showcasing my transition journey and technical projects.',
    technologies: ['Next.js', 'TypeScript', 'Tailwind', 'Framer Motion'],
    highlights: [
      'Responsive design system',
      'Interactive command table',
      'Journey timeline visualization'
    ],
    metrics: {
      pages: '6',
      components: '20+',
      performance: '95+'
    },
    image: '/images/portfolio-preview.jpg',
    icon: <User className="w-6 h-6" />,
    color: 'from-orange-500 to-red-500'
  }
];

const categoryColors = {
  fintech: 'bg-green-500/20 text-green-400 border-green-500/30',
  learning: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  business: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  personal: 'bg-orange-500/20 text-orange-400 border-orange-500/30'
};

export default function FeaturedProjects() {
  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Featured Projects</h2>
          <p className="text-xl text-gray-400 mb-8">
            Real-world applications demonstrating full-stack development and fintech expertise
          </p>
          <Link 
            href="/projects"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
          >
            View All Projects
            <ExternalLink className="ml-2 w-4 h-4" />
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="group bg-slate-700/30 backdrop-blur-sm rounded-xl border border-slate-600/50 overflow-hidden hover:border-slate-500/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
            >
              {/* Project Image/Preview */}
              <div className="relative h-48 bg-gradient-to-br from-slate-600 to-slate-700 overflow-hidden">
                <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`}></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${project.color}`}>
                    <span className="text-white">{project.icon}</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[project.category as keyof typeof categoryColors]}`}>
                    {project.category}
                  </span>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 bg-slate-600/50 text-gray-300 rounded text-sm border border-slate-500/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Highlights */}
                <ul className="text-sm text-gray-400 mb-4 space-y-1">
                  {project.highlights.map((highlight, highlightIndex) => (
                    <li key={highlightIndex} className="flex items-center">
                      <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Metrics */}
                <div className="flex justify-between items-center mb-4 p-3 bg-slate-600/30 rounded-lg">
                  {Object.entries(project.metrics).map(([key, value], metricIndex) => (
                    <div key={metricIndex} className="text-center">
                      <div className="text-lg font-bold text-white">{value}</div>
                      <div className="text-xs text-gray-400 capitalize">{key}</div>
                    </div>
                  ))}
                </div>

                {/* Links */}
                <div className="flex space-x-3">
                  {project.liveUrl && (
                    <a 
                      href={project.liveUrl}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}