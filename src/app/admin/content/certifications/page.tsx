'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, Plus, Edit3, Trash2, Award, Calendar, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface Certification {
  id?: string;
  title: string;
  provider: string;
  description: string;
  status: 'completed' | 'in_progress' | 'planned';
  completion_date?: string;
  expected_date?: string;
  certificate_url?: string;
  skills: string[];
  order_index: number;
  created_at?: string;
  updated_at?: string;
}

const emptyCertification: Certification = {
  title: '',
  provider: '',
  description: '',
  status: 'planned',
  skills: [],
  order_index: 0
};

const statusOptions = [
  { value: 'completed', label: 'Completed', icon: CheckCircle, color: 'text-green-400' },
  { value: 'in_progress', label: 'In Progress', icon: Clock, color: 'text-blue-400' },
  { value: 'planned', label: 'Planned', icon: AlertCircle, color: 'text-gray-400' }
];

export default function CertificationsAdmin() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    loadCertifications();
  }, []);

  const loadCertifications = async () => {
    try {
      const response = await fetch('/api/journey/certifications');
      const data = await response.json();
      setCertifications(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Error loading certifications:', error);
      setMessage({ type: 'error', text: 'Failed to load certifications' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!editingCert) return;

    // Validate required fields
    if (!editingCert.title.trim()) {
      setMessage({ type: 'error', text: 'Title is required' });
      return;
    }
    
    if (!editingCert.provider.trim()) {
      setMessage({ type: 'error', text: 'Provider is required' });
      return;
    }

    if (!editingCert.description.trim()) {
      setMessage({ type: 'error', text: 'Description is required' });
      return;
    }

    try {
      setSaving(true);
      setMessage(null);

      const method = editingCert.id ? 'PUT' : 'POST';
      const response = await fetch('/api/journey/certifications', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingCert)
      });

      if (!response.ok) throw new Error('Failed to save');
      
      const result = await response.json();
      
      if (result.success) {
        setMessage({ type: 'success', text: `Certification ${editingCert.id ? 'updated' : 'created'} successfully!` });
        await loadCertifications();
        setIsEditing(false);
        setEditingCert(null);
      } else {
        throw new Error(result.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Error saving certification:', error);
      setMessage({ type: 'error', text: error instanceof Error ? error.message : 'Failed to save certification' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this certification?')) return;

    try {
      setSaving(true);
      const response = await fetch(`/api/journey/certifications?id=${id}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        console.log('Certification deleted successfully:', id);
        setMessage({ type: 'success', text: 'Certification deleted successfully!' });
        setCertifications(prev => prev.filter(c => c.id !== id));
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to delete certification' });
      }
    } catch (error) {
      console.error('Error deleting certification:', error);
      setMessage({ type: 'error', text: 'Failed to delete certification' });
    } finally {
      setSaving(false);
    }
  };

  const startEdit = (cert?: Certification) => {
    setEditingCert(cert ? { ...cert } : { ...emptyCertification });
    setIsEditing(true);
    setMessage(null);
    setNewSkill('');
  };

  const addSkill = () => {
    if (newSkill.trim() && editingCert) {
      setEditingCert({
        ...editingCert,
        skills: [...editingCert.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    if (editingCert) {
      setEditingCert({
        ...editingCert,
        skills: editingCert.skills.filter((_, i) => i !== index)
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (isEditing && editingCert) {
    return (
      <div className="min-h-screen bg-slate-900 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditingCert(null);
                }}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Certifications
              </button>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  {editingCert.id ? 'Edit Certification' : 'New Certification'}
                </h1>
                <p className="text-gray-400">Create or edit certification details</p>
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
              {saving ? 'Saving...' : 'Save Certification'}
            </button>
          </div>

          {/* Status Message */}
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
            }`}>
              {message.text}
            </div>
          )}

          {/* Form */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={editingCert.title}
                  onChange={(e) => setEditingCert({ ...editingCert, title: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Python Developer Certificate"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Provider *
                </label>
                <input
                  type="text"
                  value={editingCert.provider}
                  onChange={(e) => setEditingCert({ ...editingCert, provider: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., FreeCodeCamp"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description *
              </label>
              <textarea
                value={editingCert.description}
                onChange={(e) => setEditingCert({ ...editingCert, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Describe what this certification covers..."
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Status
                </label>
                <select
                  value={editingCert.status}
                  onChange={(e) => setEditingCert({ ...editingCert, status: e.target.value as any })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                >
                  {statusOptions.map((status) => (
                    <option key={status.value} value={status.value}>
                      {status.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  {editingCert.status === 'completed' ? 'Completion Date' : 'Expected Date'}
                </label>
                <input
                  type="date"
                  value={editingCert.status === 'completed' ? editingCert.completion_date || '' : editingCert.expected_date || ''}
                  onChange={(e) => {
                    if (editingCert.status === 'completed') {
                      setEditingCert({ ...editingCert, completion_date: e.target.value });
                    } else {
                      setEditingCert({ ...editingCert, expected_date: e.target.value });
                    }
                  }}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Certificate URL
              </label>
              <input
                type="text"
                value={editingCert.certificate_url || ''}
                onChange={(e) => setEditingCert({ ...editingCert, certificate_url: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Link to certificate (if available)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Skills
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
                    className="flex-1 px-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Add a skill..."
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {editingCert.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 bg-slate-700 rounded-full text-sm text-gray-300"
                    >
                      {skill}
                      <button
                        onClick={() => removeSkill(index)}
                        className="ml-2 text-gray-400 hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <Link href="/admin/dashboard" className="text-gray-400 hover:text-white transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-3xl font-bold text-white">Certifications</h1>
            </div>
            <p className="text-gray-400">Manage your certifications and credentials</p>
          </div>
          <button
            onClick={() => startEdit()}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Certification
          </button>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`mb-6 p-4 rounded-lg ${
            message.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
          }`}>
            {message.text}
          </div>
        )}

        {/* Certifications List */}
        <div className="space-y-4">
          {certifications.map((cert) => {
            const statusOption = statusOptions.find(s => s.value === cert.status);
            const StatusIcon = statusOption?.icon || CheckCircle;

            return (
              <div key={cert.id} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 hover:border-slate-600/50 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-semibold text-white">{cert.title}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        cert.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        cert.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                        'bg-gray-500/20 text-gray-400'
                      }`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {statusOption?.label}
                      </span>
                    </div>
                    <p className="text-gray-400 mb-2">{cert.provider}</p>
                    <p className="text-gray-300 mb-3">{cert.description}</p>
                    
                    {cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {cert.skills.map((skill, index) => (
                          <span key={index} className="px-2 py-1 bg-slate-700 rounded text-xs text-gray-300">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      {cert.completion_date && (
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Completed: {new Date(cert.completion_date).toLocaleDateString()}
                        </span>
                      )}
                      {cert.expected_date && cert.status !== 'completed' && (
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Expected: {new Date(cert.expected_date).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    <button
                      onClick={() => startEdit(cert)}
                      className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-400/10 rounded-lg transition-colors"
                      title="Edit certification"
                    >
                      <Edit3 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cert.id!)}
                      disabled={saving}
                      className="p-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 rounded-lg transition-colors disabled:opacity-50"
                      title="Delete certification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {certifications.length === 0 && (
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-12 border border-slate-700/50 text-center">
              <Award className="w-12 h-12 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No certifications yet</p>
              <button
                onClick={() => startEdit()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Certification
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}