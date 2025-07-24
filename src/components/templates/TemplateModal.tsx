'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Download, Code, FileText, Settings, Zap } from 'lucide-react';
import { CodeTemplate } from '@/data/templates-data';

interface TemplateModalProps {
  template: CodeTemplate | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TemplateModal({ template, isOpen, onClose }: TemplateModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const copyToClipboard = async () => {
    if (!template) return;
    
    try {
      await navigator.clipboard.writeText(template.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const downloadTemplate = () => {
    if (!template) return;
    
    const element = document.createElement('a');
    const file = new Blob([template.content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = template.filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'server': return <Zap className="w-4 h-4" />;
      case 'config': return <Settings className="w-4 h-4" />;
      case 'component': return <Code className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getLanguageColor = (language: string) => {
    switch (language) {
      case 'javascript': return 'bg-yellow-500/20 text-yellow-300';
      case 'typescript': return 'bg-blue-500/20 text-blue-300';
      case 'python': return 'bg-green-500/20 text-green-300';
      case 'json': return 'bg-orange-500/20 text-orange-300';
      case 'dockerfile': return 'bg-cyan-500/20 text-cyan-300';
      case 'bash': return 'bg-gray-500/20 text-gray-300';
      default: return 'bg-slate-500/20 text-slate-300';
    }
  };

  if (!template) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="bg-slate-800 border border-slate-700 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-700">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    {getCategoryIcon(template.category)}
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      {template.category}
                    </span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${getLanguageColor(template.language)}`}>
                    {template.language}
                  </span>
                </div>
                
                <button
                  onClick={onClose}
                  className="p-2 text-gray-400 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-auto">
                <div className="p-6">
                  {/* Template Info */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white mb-2">{template.title}</h2>
                    <p className="text-gray-400 mb-4">{template.description}</p>
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <code className="text-sm text-blue-400 bg-slate-900/50 px-3 py-1 rounded">
                        {template.filename}
                      </code>
                      <div className="flex flex-wrap gap-1">
                        {template.tags.map(tag => (
                          <span key={tag} className="text-xs bg-blue-600/20 text-blue-300 px-2 py-1 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-3 mb-6">
                      <button
                        onClick={copyToClipboard}
                        className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Copy className="w-4 h-4" />
                        <span>{copied ? 'Copied!' : 'Copy Code'}</span>
                      </button>
                      
                      <button
                        onClick={downloadTemplate}
                        className="flex items-center space-x-2 px-4 py-2 bg-slate-700 text-gray-300 rounded-lg hover:bg-slate-600 transition-colors"
                      >
                        <Download className="w-4 h-4" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                  {/* Code Block */}
                  <div className="bg-slate-900/50 border border-slate-600 rounded-lg overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-700/30 border-b border-slate-600">
                      <span className="text-sm text-gray-400">{template.filename}</span>
                      <span className={`text-xs px-2 py-1 rounded ${getLanguageColor(template.language)}`}>
                        {template.language}
                      </span>
                    </div>
                    <div className="p-4 overflow-x-auto">
                      <pre className="text-sm text-gray-300 whitespace-pre-wrap">
                        <code>{template.content}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}