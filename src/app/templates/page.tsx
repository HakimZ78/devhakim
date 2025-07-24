'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Download, Search, Filter, Code, FileText, Settings, Zap } from 'lucide-react';

interface CodeTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  filename: string;
  content: string;
  tags: string[];
  featured: boolean;
}

const templates: CodeTemplate[] = [
  {
    id: 'express-server',
    title: 'Express.js Server',
    description: 'Basic Express.js server setup with middleware, routes, and error handling',
    category: 'server',
    language: 'javascript',
    filename: 'server.js',
    content: `const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Server is running' });
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(\`Server running on port \${PORT}\`);
});`,
    tags: ['express', 'server', 'middleware', 'api'],
    featured: true
  },
  {
    id: 'package-json',
    title: 'Package.json Template',
    description: 'Standard package.json configuration for Node.js projects',
    category: 'config',
    language: 'json',
    filename: 'package.json',
    content: `{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "Project description here",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "test:watch": "jest --watch",
    "build": "npm run build",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  },
  "keywords": ["keyword1", "keyword2"],
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "helmet": "^6.0.0",
    "dotenv": "^16.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.0.0",
    "eslint": "^8.0.0"
  },
  "engines": {
    "node": ">=18.0.0",
    "npm": ">=8.0.0"
  }
}`,
    tags: ['config', 'npm', 'package', 'dependencies'],
    featured: true
  },
  {
    id: 'react-component',
    title: 'React Component Template',
    description: 'TypeScript React component with props interface and modern hooks',
    category: 'component',
    language: 'typescript',
    filename: 'Component.tsx',
    content: `import React, { useState, useEffect } from 'react';

interface ComponentProps {
  title: string;
  description?: string;
  onAction?: (data: any) => void;
  className?: string;
}

export const Component: React.FC<ComponentProps> = ({
  title,
  description,
  onAction,
  className = ''
}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Component initialization logic
    console.log('Component mounted');
    
    return () => {
      // Cleanup logic
      console.log('Component unmounted');
    };
  }, []);

  const handleAction = async () => {
    setLoading(true);
    try {
      // Perform action
      const result = await performAction();
      setData(result);
      onAction?.(result);
    } catch (error) {
      console.error('Action failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={\`component-wrapper \${className}\`}>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      
      <button 
        onClick={handleAction}
        disabled={loading}
        className="action-button"
      >
        {loading ? 'Loading...' : 'Perform Action'}
      </button>
      
      {data && (
        <div className="data-display">
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

// Helper function
async function performAction(): Promise<any> {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, timestamp: Date.now() });
    }, 1000);
  });
}

export default Component;`,
    tags: ['react', 'typescript', 'component', 'hooks'],
    featured: true
  },
  {
    id: 'env-template',
    title: 'Environment Variables',
    description: 'Template for environment configuration files',
    category: 'config',
    language: 'bash',
    filename: '.env',
    content: `# Application Configuration
NODE_ENV=development
PORT=3000
HOST=localhost

# Database Configuration
DATABASE_URL=postgresql://username:password@localhost:5432/database_name
REDIS_URL=redis://localhost:6379

# API Keys (Never commit real keys!)
API_KEY=your_api_key_here
SECRET_KEY=your_secret_key_here
JWT_SECRET=your_jwt_secret_here

# External Services
STRIPE_SECRET_KEY=sk_test_your_stripe_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Frontend URLs
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

# Feature Flags
ENABLE_LOGGING=true
ENABLE_RATE_LIMITING=false
DEBUG_MODE=true`,
    tags: ['config', 'environment', 'secrets', 'variables'],
    featured: false
  },
  {
    id: 'dockerfile',
    title: 'Dockerfile Template',
    description: 'Multi-stage Dockerfile for Node.js applications',
    category: 'config',
    language: 'dockerfile',
    filename: 'Dockerfile',
    content: `# Multi-stage Dockerfile for Node.js application
# Stage 1: Build stage
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application (if needed)
RUN npm run build

# Stage 2: Production stage
FROM node:18-alpine AS production

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package*.json ./
COPY --from=builder --chown=nextjs:nodejs /app/dist ./dist

# Switch to non-root user
USER nextjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:3000/health || exit 1

# Start application
CMD ["npm", "start"]`,
    tags: ['docker', 'container', 'deployment', 'config'],
    featured: false
  },
  {
    id: 'gitignore',
    title: '.gitignore Template',
    description: 'Comprehensive .gitignore for Node.js and web projects',
    category: 'config',
    language: 'text',
    filename: '.gitignore',
    content: `# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Production builds
dist/
build/
.next/
out/

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# IDE files
.vscode/
.idea/
*.swp
*.swo
*~

# OS files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Logs
logs/
*.log

# Runtime data
pids/
*.pid
*.seed
*.pid.lock

# Coverage directory used by tools like istanbul
coverage/
.nyc_output/

# Dependency directories
jspm_packages/

# TypeScript cache
*.tsbuildinfo

# Optional npm cache directory
.npm

# Optional REPL history
.node_repl_history

# Output of 'npm pack'
*.tgz

# Yarn Integrity file
.yarn-integrity

# parcel-bundler cache (https://parceljs.org/)
.cache
.parcel-cache

# Next.js build output
.next

# Nuxt.js build / generate output
.nuxt

# Storybook build outputs
.out
.storybook-out

# Temporary folders
tmp/
temp/`,
    tags: ['config', 'git', 'ignore', 'files'],
    featured: false
  }
];

const categories = ['all', 'server', 'config', 'component', 'utility'];
const languages = ['all', 'javascript', 'typescript', 'json', 'bash', 'dockerfile', 'text'];

export default function Templates() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLanguage, setSelectedLanguage] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

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
    </main>
  );
}

interface TemplateCardProps {
  template: CodeTemplate;
  onCopy: (content: string, id: string) => void;
  onDownload: (template: CodeTemplate) => void;
  isCopied: boolean;
  getCategoryIcon: (category: string) => JSX.Element;
  index: number;
}

function TemplateCard({ template, onCopy, onDownload, isCopied, getCategoryIcon, index }: TemplateCardProps) {
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
          onClick={() => onCopy(template.content, template.id)}
          className="flex-1 flex items-center justify-center space-x-2 px-3 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
        >
          <Copy className="w-4 h-4" />
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
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