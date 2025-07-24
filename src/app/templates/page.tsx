'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Search, Filter, Code, FileText, Settings, Zap, Eye } from 'lucide-react';
import { getAllTemplates, getFeaturedTemplates, CodeTemplate } from '@/data/templates-data';
import TemplateModal from '@/components/templates/TemplateModal';

const templates = getAllTemplates();

const categories = ['all', 'server', 'config', 'component', 'utility'];
const languages = ['all', 'javascript', 'typescript', 'python', 'json', 'bash', 'dockerfile', 'text'];

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<CodeTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesLanguage = selectedLanguage === 'all' || template.language === selectedLanguage;
    
    return matchesSearch && matchesCategory && matchesLanguage;
  });

  const featuredTemplates = filteredTemplates.filter(t => t.featured);
  const otherTemplates = filteredTemplates.filter(t => !t.featured);

  const copyToClipboard = async (content: string, id: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadTemplate = (template: CodeTemplate) => {
    const element = document.createElement('a');
    const file = new Blob([template.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = template.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const openModal = (template: CodeTemplate) => {
    setSelectedTemplate(template);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTemplate(null);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'server': return <Zap className="w-4 h-4" />;
      case 'config': return <Settings className="w-4 h-4" />;
      case 'component': return <Code className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Code <span className="text-blue-400">Templates</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Starter templates and boilerplate code from my projects. Copy, modify, and use in your own work.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div 
          className="mb-8 space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search templates..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Category and Language Filters */}
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-slate-800/50 border border-slate-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-400"
            >
              {languages.map(language => (
                <option key={language} value={language}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Featured Templates */}
        {featuredTemplates.length > 0 && (
          <motion.section 
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">Featured Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredTemplates.map((template, index) => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  onCopy={copyToClipboard}
                  onDownload={downloadTemplate}
                  onView={openModal}
                  isCopied={copiedId === template.id}
                  getCategoryIcon={getCategoryIcon}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {/* All Templates */}
        {otherTemplates.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6">All Templates</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherTemplates.map((template, index) => (
                <TemplateCard 
                  key={template.id}
                  template={template}
                  onCopy={copyToClipboard}
                  onDownload={downloadTemplate}
                  onView={openModal}
                  isCopied={copiedId === template.id}
                  getCategoryIcon={getCategoryIcon}
                  index={index}
                />
              ))}
            </div>
          </motion.section>
        )}

        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-400 mb-2">No templates found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>

      {/* Template Modal */}
      <TemplateModal
        template={selectedTemplate}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </main>
  );
}

interface TemplateCardProps {
  template: CodeTemplate;
  onCopy: (content: string, id: string) => void;
  onDownload: (template: CodeTemplate) => void;
  onView: (template: CodeTemplate) => void;
  isCopied: boolean;
  getCategoryIcon: (category: string) => React.ReactElement;
  index: number;
}

function TemplateCard({ template, onCopy, onDownload, onView, isCopied, getCategoryIcon, index }: TemplateCardProps) {
  return (
    <motion.div
      className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 hover:border-slate-600 transition-colors"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-2">
          {getCategoryIcon(template.category)}
          <span className="text-xs text-gray-400 uppercase tracking-wide">
            {template.category}
          </span>
        </div>
        <span className="text-xs bg-slate-700 text-gray-300 px-2 py-1 rounded">
          {template.language}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{template.title}</h3>
      <p className="text-gray-400 text-sm mb-4 line-clamp-2">{template.description}</p>
      
      <div className="mb-4">
        <code className="text-xs text-blue-400 bg-slate-900/50 px-2 py-1 rounded">
          {template.filename}
        </code>
      </div>

      <div className="flex flex-wrap gap-1 mb-4">
        {template.tags.map(tag => (
          <span key={tag} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
            {tag}
          </span>
        ))}
      </div>

      <div className="flex space-x-2">
        <button
          onClick={() => onView(template)}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
        
        <button
          onClick={() => onCopy(template.content, template.id)}
          className="flex items-center justify-center px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span className="sr-only">{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
        
        <button
          onClick={() => onDownload(template)}
          className="flex items-center justify-center px-3 py-2 bg-slate-700 text-gray-300 text-sm rounded hover:bg-slate-600 transition-colors"
        >
          <Download className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}