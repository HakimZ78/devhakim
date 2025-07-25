'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Edit3, Trash2, Command, Terminal, Tag, Copy } from 'lucide-react';
import Link from 'next/link';

interface CommandItem {
  id?: string
  title: string
  description: string
  command: string
  category: string
  project_source: string
  tags: string[]
  order_index: number
  created_at?: string
  updated_at?: string
}

const emptyCommand: CommandItem = {
  title: '',
  description: '',
  command: '',
  category: 'development',
  project_source: 'General',
  tags: [],
  order_index: 0
}

const categoryOptions = [
  'development',
  'deployment',
  'testing',
  'docker',
  'database',
  'server',
  'python',
  'system',
  'setup'
]

const projectSourceOptions = [
  'General',
  'Portfolio',
  'ForexAcuity',
  'Personal Learning'
]

export default function CommandsContentAdmin() {
  const [commands, setCommands] = useState<CommandItem[]>([]);
  const [editingCommand, setEditingCommand] = useState<CommandItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadCommands();
  }, []);

  const loadCommands = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/commands');
      const result = await response.json();
      
      if (result.success && result.data) {
        setCommands(Array.isArray(result.data) ? result.data : []);
      } else {
        console.error('Failed to load commands:', result);
        setMessage({ type: 'error', text: 'Failed to load commands' });
      }
    } catch (error) {
      console.error('Error loading commands:', error);
      setMessage({ type: 'error', text: 'Failed to load commands' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingCommand) return;

    try {
      setSaving(true);
      setMessage(null);

      console.log('=== FRONTEND SAVE COMMAND OPERATION ===');
      console.log('Saving command:', editingCommand);

      const method = editingCommand.id ? 'PUT' : 'POST';
      const response = await fetch('/api/commands', {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingCommand),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Save result:', result);
      
      if (result.success && result.data) {
        console.log('Save successful. Received data:', result.data);
        setMessage({ type: 'success', text: `Command ${editingCommand.id ? 'updated' : 'created'} successfully!` });
        
        // Update commands list
        if (editingCommand.id) {
          setCommands(prev => prev.map(c => c.id === editingCommand.id ? result.data : c));
        } else {
          setCommands(prev => [...prev, result.data]);
        }
        
        setIsEditing(false);
        setEditingCommand(null);
      } else {
        console.error('Save failed:', result);
        setMessage({ type: 'error', text: result.error || 'Failed to save command' });
      }
    } catch (error) {
      console.error('Error saving command:', error);
      setMessage({ type: 'error', text: 'Failed to save command' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this command?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/commands?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: 'Command deleted successfully!' });
        setCommands(prev => prev.filter(c => c.id !== id));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete command' });
      }
    } catch (error) {
      console.error('Error deleting command:', error);
      setMessage({ type: 'error', text: 'Failed to delete command' });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (command?: CommandItem) => {
    setEditingCommand(command ? { ...command } : { ...emptyCommand });
    setIsEditing(true);
    setMessage(null);
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditingCommand(null);
    setMessage(null);
  };

  const addTag = () => {
    if (!editingCommand) return;
    setEditingCommand({ 
      ...editingCommand, 
      tags: [...editingCommand.tags, ''] 
    });
  };

  const updateTag = (index: number, value: string) => {
    if (!editingCommand) return;
    const newTags = [...editingCommand.tags];
    newTags[index] = value;
    setEditingCommand({ ...editingCommand, tags: newTags });
  };

  const removeTag = (index: number) => {
    if (!editingCommand) return;
    setEditingCommand({ 
      ...editingCommand, 
      tags: editingCommand.tags.filter((_, i) => i !== index) 
    });
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setMessage({ type: 'success', text: 'Command copied to clipboard!' });
      setTimeout(() => setMessage(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading commands...</p>
        </div>
      </div>
    );
  }

  if (isEditing && editingCommand) {
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
                Back to Commands
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingCommand.id ? 'Edit Command' : 'New Command'}
                </h1>
                <p className="text-gray-400">Manage command details and usage</p>
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
              {saving ? 'Saving...' : 'Save Command'}
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
                <Terminal className="w-5 h-5 text-blue-400" />
                <h2 className="text-xl font-semibold text-white">Command Information</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Command Title
                  </label>
                  <input
                    type="text"
                    value={editingCommand.title}
                    onChange={(e) => setEditingCommand({ ...editingCommand, title: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Start Development Server"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={editingCommand.category}
                    onChange={(e) => setEditingCommand({ ...editingCommand, category: e.target.value })}
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
                    Project Source
                  </label>
                  <select
                    value={editingCommand.project_source}
                    onChange={(e) => setEditingCommand({ ...editingCommand, project_source: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  >
                    {projectSourceOptions.map((source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Description
                </label>
                <textarea
                  value={editingCommand.description}
                  onChange={(e) => setEditingCommand({ ...editingCommand, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Brief description of what this command does..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Command
                </label>
                <input
                  type="text"
                  value={editingCommand.command}
                  onChange={(e) => setEditingCommand({ ...editingCommand, command: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none font-mono"
                  placeholder="e.g., npm run dev"
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
                {editingCommand.tags.map((tag, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="text"
                      value={tag}
                      onChange={(e) => updateTag(index, e.target.value)}
                      className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., docker, npm, development"
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

            {/* Preview */}
            <div className="space-y-6">
              <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
                <Command className="w-5 h-5 text-purple-400" />
                <h2 className="text-xl font-semibold text-white">Preview</h2>
              </div>

              <div className="bg-slate-700/50 rounded-lg p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-1">
                      {editingCommand.title || 'Command Title'}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3">
                      {editingCommand.description || 'Command description will appear here...'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 ml-4">
                    <span className="px-2 py-1 text-xs rounded bg-blue-500/20 text-blue-400">
                      {editingCommand.category}
                    </span>
                    <span className="px-2 py-1 text-xs rounded bg-green-500/20 text-green-400">
                      {editingCommand.project_source}
                    </span>
                  </div>
                </div>
                
                <div className="bg-slate-900/50 rounded p-3 mb-3">
                  <code className="text-green-400 font-mono text-sm">
                    {editingCommand.command || '# command will appear here'}
                  </code>
                </div>

                {editingCommand.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {editingCommand.tags.filter(tag => tag.trim()).map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-slate-600/50 text-gray-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Commands Management View
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
              <h1 className="text-2xl font-bold text-white">Commands Management</h1>
              <p className="text-gray-400">Manage your command reference and documentation</p>
            </div>
          </div>
          <button
            onClick={() => startEdit()}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Command
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

        {/* Commands List */}
        <div className="space-y-6">
          {commands.map((command) => (
            <div key={command.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-semibold text-white">{command.title}</h3>
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400">
                      {command.category}
                    </span>
                    <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400">
                      {command.project_source}
                    </span>
                  </div>
                  
                  <p className="text-gray-400 mb-3">{command.description}</p>
                  
                  <div className="bg-slate-900/50 rounded p-3 mb-3 flex items-center justify-between">
                    <code className="text-green-400 font-mono text-sm">{command.command}</code>
                    <button
                      onClick={() => copyToClipboard(command.command)}
                      className="p-1 text-gray-400 hover:text-white transition-colors"
                      title="Copy command"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {command.tags.map((tag, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-slate-700/50 text-gray-300 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex items-center space-x-2 ml-4">
                  <button
                    onClick={() => startEdit(command)}
                    className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                    title="Edit command"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(command.id!)}
                    disabled={saving}
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                    title="Delete command"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}

          {commands.length === 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <Terminal className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Commands Yet</h3>
              <p className="text-gray-400 mb-6">Start by creating your first command reference</p>
              <button
                onClick={() => startEdit()}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Create First Command
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}