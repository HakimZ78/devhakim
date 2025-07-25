'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Edit3, Trash2, Briefcase, ExternalLink, Calendar, Star, Tag } from 'lucide-react';
import Link from 'next/link';

interface Project {
  id?: string
  slug: string
  title: string
  description: string
  category: 'learning' | 'fintech' | 'business' | 'personal'
  technologies: string[]
  highlights: string[]
  live_url?: string
  image_url?: string
  featured: boolean
  completion_date?: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  status: 'completed' | 'in-progress' | 'planning'
  overview?: string
  problem_statement?: string
  solution?: string
  challenges?: any[]
  key_learnings?: string[]
  future_enhancements?: string[]
  gallery?: any[]
  order_index: number
  created_at?: string
  updated_at?: string
}

const emptyProject: Project = {
  slug: '',
  title: '',
  description: '',
  category: 'personal',
  technologies: [],
  highlights: [],
  live_url: '',
  image_url: '',
  featured: false,
  completion_date: '',
  difficulty: 'intermediate',
  status: 'planning',
  overview: '',
  problem_statement: '',
  solution: '',
  challenges: [],
  key_learnings: [],
  future_enhancements: [],
  gallery: [],
  order_index: 0
}

export default function ProjectsContentAdmin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/projects');
      const result = await response.json();
      
      if (result.success && result.data) {
        setProjects(Array.isArray(result.data) ? result.data : []);
      } else {
        console.error('Failed to load projects:', result);
        setMessage({ type: 'error', text: 'Failed to load projects' });
      }
    } catch (error) {
      console.error('Error loading projects:', error);
      setMessage({ type: 'error', text: 'Failed to load projects' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingProject) return;

    try {
      setSaving(true);
      setMessage(null);

      console.log('=== FRONTEND SAVE OPERATION ===');
      console.log('Saving project:', editingProject);

      const method = editingProject.id ? 'PUT' : 'POST';
      const response = await fetch('/api/projects', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingProject),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Save result:', result);
      
      if (result.success && result.data) {
        console.log('Save successful. Received data:', result.data);
        setMessage({ type: 'success', text: `Project ${editingProject.id ? 'updated' : 'created'} successfully!` });
        
        // Update projects list
        if (editingProject.id) {
          setProjects(prev => prev.map(p => p.id === editingProject.id ? result.data : p));
        } else {
          setProjects(prev => [...prev, result.data]);
        }
        
        setIsEditing(false);
        setEditingProject(null);
      } else {
        console.error('Save failed:', result);
        setMessage({ type: 'error', text: result.error || 'Failed to save project' });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      setMessage({ type: 'error', text: 'Failed to save project' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Project deleted successfully!' });
        setProjects(prev => prev.filter(p => p.id !== id));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete project' });
      }
    } catch (error) {
      console.error('Error deleting project:', error);
      setMessage({ type: 'error', text: 'Failed to delete project' });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (project?: Project) => {
    setEditingProject(project ? { ...project } : { ...emptyProject });
    setIsEditing(true);
    setMessage(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingProject(null);
    setMessage(null);
  };

  const addTechnology = () => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, technologies: [...editingProject.technologies, ''] });
  };

  const updateTechnology = (index: number, value: string) => {
    if (!editingProject) return;
    const newTech = [...editingProject.technologies];
    newTech[index] = value;
    setEditingProject({ ...editingProject, technologies: newTech });
  };

  const removeTechnology = (index: number) => {
    if (!editingProject) return;
    setEditingProject({ 
      ...editingProject, 
      technologies: editingProject.technologies.filter((_, i) => i !== index) 
    });
  };

  const addHighlight = () => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, highlights: [...editingProject.highlights, ''] });
  };

  const updateHighlight = (index: number, value: string) => {
    if (!editingProject) return;
    const newHighlights = [...editingProject.highlights];
    newHighlights[index] = value;
    setEditingProject({ ...editingProject, highlights: newHighlights });
  };

  const removeHighlight = (index: number) => {
    if (!editingProject) return;
    setEditingProject({ 
      ...editingProject, 
      highlights: editingProject.highlights.filter((_, i) => i !== index) 
    });
  };

  const addKeyLearning = () => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, key_learnings: [...(editingProject.key_learnings || []), ''] });
  };

  const updateKeyLearning = (index: number, value: string) => {
    if (!editingProject) return;
    const newLearnings = [...(editingProject.key_learnings || [])];
    newLearnings[index] = value;
    setEditingProject({ ...editingProject, key_learnings: newLearnings });
  };

  const removeKeyLearning = (index: number) => {
    if (!editingProject) return;
    setEditingProject({ 
      ...editingProject, 
      key_learnings: (editingProject.key_learnings || []).filter((_, i) => i !== index) 
    });
  };

  const addFutureEnhancement = () => {
    if (!editingProject) return;
    setEditingProject({ ...editingProject, future_enhancements: [...(editingProject.future_enhancements || []), ''] });
  };

  const updateFutureEnhancement = (index: number, value: string) => {
    if (!editingProject) return;
    const newEnhancements = [...(editingProject.future_enhancements || [])];
    newEnhancements[index] = value;
    setEditingProject({ ...editingProject, future_enhancements: newEnhancements });
  };

  const removeFutureEnhancement = (index: number) => {
    if (!editingProject) return;
    setEditingProject({ 
      ...editingProject, 
      future_enhancements: (editingProject.future_enhancements || []).filter((_, i) => i !== index) 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading projects...</p>
        </div>
      </div>
    );
  }

  if (isEditing && editingProject) {
    return (
      <div className="min-h-screen bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={cancelEdit}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Projects
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingProject.id ? 'Edit Project' : 'New Project'}
                </h1>
                <p className="text-gray-400">Manage project details and content</p>
              </div>
            </div>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Save className="w-4 h-4 mr-2" />
              )}
              {saving ? 'Saving...' : 'Save Project'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' 
                ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
                : 'bg-red-500/10 border border-red-500/20 text-red-400'
            }`}>
              {message.text}
            </div>
          )}

          {/* Edit Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 space-y-8">
            {/* Basic Info */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                <Briefcase className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Basic Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Project Title
                  </label>
                  <input
                    type="text"
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., ForexAcuity Analytics Dashboard"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Slug
                  </label>
                  <input
                    type="text"
                    value={editingProject.slug}
                    onChange={(e) => setEditingProject({ ...editingProject, slug: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., forexacuity"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="learning">Learning</option>
                    <option value="fintech">Fintech</option>
                    <option value="business">Business</option>
                    <option value="personal">Personal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Status
                  </label>
                  <select
                    value={editingProject.status}
                    onChange={(e) => setEditingProject({ ...editingProject, status: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="planning">Planning</option>
                    <option value="in-progress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Difficulty
                  </label>
                  <select
                    value={editingProject.difficulty}
                    onChange={(e) => setEditingProject({ ...editingProject, difficulty: e.target.value as any })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Completion Date
                  </label>
                  <input
                    type="date"
                    value={editingProject.completion_date}
                    onChange={(e) => setEditingProject({ ...editingProject, completion_date: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={editingProject.live_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={editingProject.image_url || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, image_url: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="/images/projects/..."
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={editingProject.featured}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                  Featured Project
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingProject.description}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Brief project description..."
                />
              </div>
            </div>

            {/* Technologies */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Technologies</h2>
                </div>
                <button
                  onClick={addTechnology}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Add Technology
                </button>
              </div>

              <div className="space-y-3">
                {editingProject.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => updateTechnology(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., Next.js"
                    />
                    <button
                      onClick={() => removeTechnology(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                      title="Remove technology"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  <h2 className="text-xl font-semibold text-white">Project Highlights</h2>
                </div>
                <button
                  onClick={addHighlight}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors text-sm"
                >
                  Add Highlight
                </button>
              </div>

              <div className="space-y-3">
                {editingProject.highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={highlight}
                      onChange={(e) => updateHighlight(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., Sub-second real-time data updates"
                    />
                    <button
                      onClick={() => removeHighlight(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                      title="Remove highlight"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Detailed Content */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                <Edit3 className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Detailed Content</h2>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Overview
                </label>
                <textarea
                  value={editingProject.overview}
                  onChange={(e) => setEditingProject({ ...editingProject, overview: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Comprehensive project overview..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Problem Statement
                </label>
                <textarea
                  value={editingProject.problem_statement}
                  onChange={(e) => setEditingProject({ ...editingProject, problem_statement: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="What problem does this project solve?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Solution
                </label>
                <textarea
                  value={editingProject.solution}
                  onChange={(e) => setEditingProject({ ...editingProject, solution: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="How did you solve the problem?"
                />
              </div>
            </div>

            {/* Key Learnings */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Briefcase className="w-5 h-5 text-blue-400" />
                  <h2 className="text-xl font-semibold text-white">Key Learnings</h2>
                </div>
                <button
                  onClick={addKeyLearning}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                >
                  Add Learning
                </button>
              </div>

              <div className="space-y-3">
                {(editingProject.key_learnings || []).map((learning, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={learning}
                      onChange={(e) => updateKeyLearning(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="What did you learn from this project?"
                    />
                    <button
                      onClick={() => removeKeyLearning(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                      title="Remove learning"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Future Enhancements */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-indigo-400" />
                  <h2 className="text-xl font-semibold text-white">Future Enhancements</h2>
                </div>
                <button
                  onClick={addFutureEnhancement}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
                >
                  Add Enhancement
                </button>
              </div>

              <div className="space-y-3">
                {(editingProject.future_enhancements || []).map((enhancement, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={enhancement}
                      onChange={(e) => updateFutureEnhancement(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="Planned future improvement..."
                    />
                    <button
                      onClick={() => removeFutureEnhancement(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                      title="Remove enhancement"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Projects List View
  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/dashboard"
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back to Dashboard
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-white">Projects Management</h1>
              <p className="text-gray-400">Manage your portfolio projects</p>
            </div>
          </div>
          <button
            onClick={() => startEdit()}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Project
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' 
              ? 'bg-green-500/10 border border-green-500/20 text-green-400' 
              : 'bg-red-500/10 border border-red-500/20 text-red-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                    {project.featured && (
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    )}
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                      project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                      project.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-red-500/20 text-red-400'
                    }`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Tag className="w-4 h-4 mr-1" />
                      {project.category}
                    </span>
                    {project.completion_date && (
                      <span className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.completion_date}
                      </span>
                    )}
                    {project.live_url && (
                      <a
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-blue-400 hover:text-blue-300"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        Live Site
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.technologies.slice(0, 5).map((tech, index) => (
                      <span key={index} className="px-2 py-1 bg-slate-700/50 text-gray-300 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 5 && (
                      <span className="px-2 py-1 bg-slate-700/50 text-gray-400 text-xs rounded">
                        +{project.technologies.length - 5} more
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => startEdit(project)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                    title="Edit project"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id!)}
                    disabled={saving}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {projects.length === 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <Briefcase className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Projects Yet</h3>
              <p className="text-gray-400 mb-6">Start by creating your first project</p>
              <button
                onClick={() => startEdit()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create First Project
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}