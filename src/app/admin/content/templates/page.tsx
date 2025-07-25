'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Edit3, Trash2, Code, BookOpen, Tag, Copy } from 'lucide-react';
import Link from 'next/link';

interface CodeTemplate {
  id?: string
  title: string
  description: string
  category: string
  language: string
  filename: string
  content: string
  tags: string[]
  featured: boolean
  order_index: number
  created_at?: string
  updated_at?: string
}

const emptyTemplate: CodeTemplate = {
  title: '',
  description: '',
  category: 'component',
  language: 'typescript',
  filename: '',
  content: '',
  tags: [],
  featured: false,
  order_index: 0
}

const categoryOptions = [
  'component',
  'server',
  'config',
  'utility'
]

const languageOptions = [
  'typescript',
  'javascript',
  'python',
  'sql',
  'dockerfile',
  'json',
  'bash',
  'text'
]

export default function TemplatesContentAdmin() {
  const [templates, setTemplates] = useState<CodeTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<CodeTemplate | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/templates');
      const result = await response.json();
      
      if (result.success && result.data) {
        setTemplates(Array.isArray(result.data) ? result.data : []);
      } else {
        console.error('Failed to load templates:', result);
        setMessage({ type: 'error', text: 'Failed to load templates' });
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      setMessage({ type: 'error', text: 'Failed to load templates' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingTemplate) return;

    try {
      setSaving(true);
      setMessage(null);

      console.log('=== FRONTEND SAVE TEMPLATE OPERATION ===');
      console.log('Saving template:', editingTemplate);

      const method = editingTemplate.id ? 'PUT' : 'POST';
      const response = await fetch('/api/templates', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingTemplate),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Save result:', result);
      
      if (result.success && result.data) {
        console.log('Save successful. Received data:', result.data);
        setMessage({ type: 'success', text: `Template ${editingTemplate.id ? 'updated' : 'created'} successfully!` });
        
        // Update templates list
        if (editingTemplate.id) {
          setTemplates(prev => prev.map(t => t.id === editingTemplate.id ? result.data : t));
        } else {
          setTemplates(prev => [...prev, result.data]);
        }
        
        setIsEditing(false);
        setEditingTemplate(null);
      } else {
        console.error('Save failed:', result);
        setMessage({ type: 'error', text: result.error || 'Failed to save template' });
      }
    } catch (error) {
      console.error('Error saving template:', error);
      setMessage({ type: 'error', text: 'Failed to save template' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/templates?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Template deleted successfully!' });
        setTemplates(prev => prev.filter(t => t.id !== id));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete template' });
      }
    } catch (error) {
      console.error('Error deleting template:', error);
      setMessage({ type: 'error', text: 'Failed to delete template' });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (template?: CodeTemplate) => {
    setEditingTemplate(template ? { ...template } : { ...emptyTemplate });
    setIsEditing(true);
    setMessage(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingTemplate(null);
    setMessage(null);
  };

  const addTag = () => {
    if (!editingTemplate) return;
    setEditingTemplate({ 
      ...editingTemplate, 
      tags: [...editingTemplate.tags, ''] 
    });
  };

  const updateTag = (index: number, value: string) => {
    if (!editingTemplate) return;
    const newTags = [...editingTemplate.tags];
    newTags[index] = value;
    setEditingTemplate({ ...editingTemplate, tags: newTags });
  };

  const removeTag = (index: number) => {
    if (!editingTemplate) return;
    setEditingTemplate({ 
      ...editingTemplate, 
      tags: editingTemplate.tags.filter((_, i) => i !== index) 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading templates...</p>
        </div>
      </div>
    );
  }

  if (isEditing && editingTemplate) {
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
                Back to Templates
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingTemplate.id ? 'Edit Template' : 'New Template'}
                </h1>
                <p className="text-gray-400">Manage code template details</p>
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
              {saving ? 'Saving...' : 'Save Template'}
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
            {/* Basic Information */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                <Code className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Template Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Template Title
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.title}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Express.js Server Setup"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editingTemplate.category}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, category: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {categoryOptions.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Language
                  </label>
                  <select
                    value={editingTemplate.language}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, language: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {languageOptions.map((language) => (
                      <option key={language} value={language}>
                        {language.charAt(0).toUpperCase() + language.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Filename
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.filename}
                    onChange={(e) => setEditingTemplate({ ...editingTemplate, filename: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., server.js"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={editingTemplate.featured}
                    onChange={(e) => setEditingTemplate({ 
                      ...editingTemplate, 
                      featured: e.target.checked
                    })}
                    className="w-4 h-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="featured" className="text-sm font-medium text-gray-300">
                    Featured Template
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingTemplate.description}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Brief description of what this template does..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Code Content
                </label>
                <textarea
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate({ ...editingTemplate, content: e.target.value })}
                  rows={12}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none font-mono text-sm"
                  placeholder="Paste your code template here..."
                />
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <div className="flex items-center space-x-2">
                  <Tag className="w-5 h-5 text-green-400" />
                  <h2 className="text-xl font-semibold text-white">Tags</h2>
                </div>
                <button
                  onClick={addTag}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                >
                  Add Tag
                </button>
              </div>

              <div className="space-y-3">
                {editingTemplate.tags.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => updateTag(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., react, express, api"
                    />
                    <button
                      onClick={() => removeTag(index)}
                      className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                      title="Remove tag"
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

  // Main Templates Management View
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
              <h1 className="text-2xl font-bold text-white">Templates Management</h1>
              <p className="text-gray-400">Manage your code templates and snippets</p>
            </div>
          </div>
          <button
            onClick={() => startEdit()}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Template
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

        {/* Templates List */}
        <div className="space-y-6">
          {templates.map((template) => (
            <div key={template.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{template.title}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                      {template.category}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      {template.language}
                    </span>
                    {template.featured && (
                      <span className="px-2 py-1 text-xs rounded-full bg-yellow-500/20 text-yellow-400">
                        Featured
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 mb-3">{template.description}</p>
                  
                  <div className="mb-4">
                    <code className="text-xs text-blue-400 bg-slate-900/50 px-2 py-1 rounded">
                      {template.filename}
                    </code>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {template.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-slate-700/50 text-gray-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => startEdit(template)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                    title="Edit template"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(template.id!)}
                    disabled={saving}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete template"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {templates.length === 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <BookOpen className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Templates Yet</h3>
              <p className="text-gray-400 mb-6">Start by creating your first code template</p>
              <button
                onClick={() => startEdit()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create First Template
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}