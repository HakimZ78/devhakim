'use client';

import { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, User, Link as LinkIcon, Mail, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface HeroContent {
  id?: string
  name: string
  subtitle: string
  roles: string[]
  description: string
  primary_cta_text: string
  primary_cta_link: string
  secondary_cta_text: string
  secondary_cta_link: string
  linkedin_url: string
  email: string
}

export default function HeroContentAdmin() {
  const [heroContent, setHeroContent] = useState<HeroContent>({
    name: '',
    subtitle: '',
    roles: [],
    description: '',
    primary_cta_text: '',
    primary_cta_link: '',
    secondary_cta_text: '',
    secondary_cta_link: '',
    linkedin_url: '',
    email: ''
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    loadHeroContent();
  }, []);

  const loadHeroContent = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/hero');
      const result = await response.json();
      
      
      if (result.success && result.data) {
        setHeroContent(result.data);
      } else {
        console.error('Failed to load hero content:', result);
        setMessage({ type: 'error', text: 'Failed to load hero content' });
      }
    } catch (error) {
      console.error('Error loading hero content:', error);
      setMessage({ type: 'error', text: 'Failed to load hero content' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setMessage(null);

      console.log('=== FRONTEND SAVE OPERATION ===');
      console.log('Saving hero content:', heroContent);
      console.log('Name being sent:', heroContent.name);

      const response = await fetch('/api/hero', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(heroContent),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Save result:', result);
      
      if (result.success && result.data) {
        console.log('Save successful. Received data:', result.data);
        console.log('Name in received data:', result.data.name);
        setMessage({ type: 'success', text: 'Hero content saved successfully!' });
        setHeroContent(result.data);
        console.log('State updated with received data');
      } else {
        console.error('Save failed:', result);
        setMessage({ type: 'error', text: result.error || 'Failed to save hero content' });
      }
    } catch (error) {
      console.error('Error saving hero content:', error);
      setMessage({ type: 'error', text: 'Failed to save hero content' });
    } finally {
      setSaving(false);
    }
  };

  const handleRoleChange = (index: number, value: string) => {
    const newRoles = [...heroContent.roles];
    newRoles[index] = value;
    setHeroContent({ ...heroContent, roles: newRoles });
  };

  const addRole = () => {
    setHeroContent({ ...heroContent, roles: [...heroContent.roles, ''] });
  };

  const removeRole = (index: number) => {
    const newRoles = heroContent.roles.filter((_, i) => i !== index);
    setHeroContent({ ...heroContent, roles: newRoles });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-400 mx-auto mb-4" />
          <p className="text-gray-400">Loading hero content...</p>
        </div>
      </div>
    );
  }

  // Safety check - if heroContent is still null, show error state
  if (!heroContent) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-400 mb-4">Failed to load hero content</p>
          <button 
            onClick={loadHeroContent}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-4xl mx-auto">
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
              <h1 className="text-2xl font-bold text-white">Hero Content</h1>
              <p className="text-gray-400">Manage your homepage hero section</p>
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
            {saving ? 'Saving...' : 'Save Changes'}
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

        {/* Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-8 border border-slate-700/50 space-y-8">
          {/* Personal Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
              <User className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Personal Information</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={heroContent.name}
                  onChange={(e) => setHeroContent({ ...heroContent, name: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={heroContent.subtitle}
                  onChange={(e) => setHeroContent({ ...heroContent, subtitle: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., Healthcare → Tech Transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Description
              </label>
              <textarea
                value={heroContent.description}
                onChange={(e) => setHeroContent({ ...heroContent, description: e.target.value })}
                rows={6}
                className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                placeholder="Your professional story and background..."
              />
            </div>
          </div>

          {/* Rotating Roles */}
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <div className="flex items-center space-x-2">
                <User className="w-5 h-5 text-green-400" />
                <h2 className="text-xl font-semibold text-white">Rotating Roles</h2>
              </div>
              <button
                onClick={addRole}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
              >
                Add Role
              </button>
            </div>

            <div className="space-y-3">
              {heroContent.roles.map((role, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <input
                    type="text"
                    value={role}
                    onChange={(e) => handleRoleChange(index, e.target.value)}
                    className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Full-Stack Developer"
                  />
                  <button
                    onClick={() => removeRole(index)}
                    className="px-3 py-3 text-red-400 hover:text-red-300 transition-colors"
                    title="Remove role"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Call-to-Action Buttons */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
              <LinkIcon className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-semibold text-white">Call-to-Action Buttons</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Primary Button Text
                </label>
                <input
                  type="text"
                  value={heroContent.primary_cta_text}
                  onChange={(e) => setHeroContent({ ...heroContent, primary_cta_text: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., View My Projects"
                />
                <input
                  type="text"
                  value={heroContent.primary_cta_link}
                  onChange={(e) => setHeroContent({ ...heroContent, primary_cta_link: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., #projects"
                />
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-medium text-gray-300">
                  Secondary Button Text
                </label>
                <input
                  type="text"
                  value={heroContent.secondary_cta_text}
                  onChange={(e) => setHeroContent({ ...heroContent, secondary_cta_text: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., My Learning Journey"
                />
                <input
                  type="text"
                  value={heroContent.secondary_cta_link}
                  onChange={(e) => setHeroContent({ ...heroContent, secondary_cta_link: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="e.g., #journey"
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
              <Linkedin className="w-5 h-5 text-blue-400" />
              <h2 className="text-xl font-semibold text-white">Social Links</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={heroContent.email}
                  onChange={(e) => setHeroContent({ ...heroContent, email: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  <Linkedin className="w-4 h-4 inline mr-2" />
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={heroContent.linkedin_url}
                  onChange={(e) => setHeroContent({ ...heroContent, linkedin_url: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="https://linkedin.com/in/your-profile"
                />
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <div className="flex items-center space-x-2 pb-4 border-b border-slate-700">
              <User className="w-5 h-5 text-yellow-400" />
              <h2 className="text-xl font-semibold text-white">Preview</h2>
            </div>

            <div className="bg-slate-700/30 rounded-lg p-6 border border-slate-600/30">
              <div className="text-center">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Hi, I'm <span className="text-blue-400">{heroContent.name || 'Your Name'}</span>
                </h1>
                <h2 className="text-lg text-gray-300 mb-4">{heroContent.subtitle || 'Your Subtitle'}</h2>
                <div className="text-gray-400 mb-6">
                  Aiming for: <span className="text-blue-400 font-semibold">
                    {heroContent.roles[0] || 'Your First Role'}
                  </span>
                </div>
                <p className="text-gray-400 leading-relaxed mb-6 max-w-2xl mx-auto">
                  {heroContent.description || 'Your description will appear here...'}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold">
                    {heroContent.primary_cta_text || 'Primary CTA'}
                  </button>
                  <button className="px-6 py-3 border-2 border-gray-600 text-gray-300 rounded-lg font-semibold">
                    {heroContent.secondary_cta_text || 'Secondary CTA'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}