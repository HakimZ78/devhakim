'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Filter, ExternalLink, Calendar, Star, TrendingUp, BookOpen, Briefcase, User } from 'lucide-react';
import { forexAcuityProject } from '@/data/forexacuity-showcase';

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'learning' | 'fintech' | 'business' | 'personal';
  technologies: string[];
  highlights: string[];
  live_url?: string;
  image_url: string;
  featured: boolean;
  completion_date: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  status: 'completed' | 'in-progress' | 'planning';
}

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

const statusInfo = {
  completed: { label: 'Completed', color: 'text-green-400', bg: 'bg-green-500/20' },
  'in-progress': { label: 'In Progress', color: 'text-blue-400', bg: 'bg-blue-500/20' },
  planning: { label: 'Planning', color: 'text-gray-400', bg: 'bg-gray-500/20' }
};

const difficultyInfo = {
  beginner: { label: 'Beginner', color: 'text-green-400' },
  intermediate: { label: 'Intermediate', color: 'text-yellow-400' },
  advanced: { label: 'Advanced', color: 'text-red-400' }
};

export default function ProjectsShowcase() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const result = await response.json();
      
      if (result.success) {
        setProjects(result.data);
        setFilteredProjects(result.data);
      } else {
        console.error('Failed to load projects:', result.error);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let filtered = projects;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(project => project.category === selectedCategory);
    }

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(project => project.status === selectedStatus);
    }

    setFilteredProjects(filtered);
  }, [searchTerm, selectedCategory, selectedStatus, projects]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400 mx-auto mb-4"></div>
            <p className="text-gray-400">Loading projects...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            My Projects
          </h1>
          <p className="text-xl text-gray-400 mb-8 max-w-3xl mx-auto">
            A collection of projects showcasing my journey from healthcare to software engineering, 
            featuring real-world applications in fintech, business solutions, and learning experiments.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 mb-8 border border-slate-700/50">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects, technologies..."
                className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <select
                className="pl-10 pr-8 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none appearance-none"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="all">All Categories</option>
                <option value="fintech">Fintech</option>
                <option value="business">Business</option>
                <option value="personal">Personal</option>
                <option value="learning">Learning</option>
              </select>
            </div>

            {/* Status Filter */}
            <div className="relative">
              <select
                className="px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none appearance-none"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="in-progress">In Progress</option>
                <option value="planning">Planning</option>
              </select>
            </div>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-400">
            Showing {filteredProjects.length} of {projects.length} projects
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => {
            const categoryData = categoryInfo[project.category];
            const statusData = statusInfo[project.status];
            const difficultyData = difficultyInfo[project.difficulty];

            return (
              <div
                key={project.id}
                className="group bg-slate-800/30 backdrop-blur-sm rounded-xl border border-slate-700/50 overflow-hidden hover:border-slate-600/50 transition-all duration-300 hover:transform hover:scale-[1.02]"
              >
                {/* Project Preview */}
                <div className={`h-48 bg-gradient-to-br ${categoryData.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20"></div>
                  <div className="absolute top-4 left-4 flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${categoryData.bgColor} ${categoryData.textColor} border ${categoryData.borderColor}`}>
                      {categoryData.label}
                    </span>
                    {project.featured && (
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 rounded-full text-xs font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusData.bg} ${statusData.color}`}>
                      {statusData.label}
                    </span>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                      <span className="text-white text-2xl">{categoryData.icon}</span>
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-slate-700/50 text-gray-300 rounded text-xs border border-slate-600/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-slate-600/50 text-gray-400 rounded text-xs">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Highlights */}
                  <ul className="text-sm text-gray-400 mb-4 space-y-1">
                    {project.highlights.slice(0, 2).map((highlight, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2 mt-2 flex-shrink-0"></span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Footer */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(project.completion_date).toLocaleDateString('en-GB', {
                        year: 'numeric',
                        month: 'short'
                      })}
                    </span>
                    <span className={difficultyData.color}>
                      {difficultyData.label}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                    >
                      Learn More
                    </Link>
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                      >
                        <ExternalLink className="w-3 h-3 mr-1" />
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p>Try adjusting your search terms or filters.</p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedStatus('all');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Clear Filters
            </button>
          </div>
        )}

        {/* Special Feature: ForexAcuity Deep Dive */}
        {filteredProjects.some(p => p.id === 'forexacuity') && (
          <div className="mt-16 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-xl p-8 border border-green-500/20">
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-white mb-2">Featured: ForexAcuity Deep Dive</h3>
              <p className="text-gray-400">
                Explore the complete development journey of my flagship fintech project
              </p>
            </div>
            <div className="flex justify-center">
              <Link
                href="/projects/forexacuity"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                View Complete Case Study
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}