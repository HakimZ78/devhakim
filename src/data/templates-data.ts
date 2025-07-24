export interface CodeTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  language: string;
  filename: string;
  content: string;
  tags: string[];
  featured: boolean;
  order_index?: number;
}

export const templatesData: CodeTemplate[] = [
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
    featured: true,
    order_index: 1
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
    featured: true,
    order_index: 2
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
    featured: true,
    order_index: 3
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
    featured: false,
    order_index: 4
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
    featured: false,
    order_index: 5
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
    featured: false,
    order_index: 6
  },
  {
    id: 'fastapi-main',
    title: 'FastAPI Main Application',
    description: 'FastAPI application setup with middleware, routers, and error handling',
    category: 'server',
    language: 'python',
    filename: 'main.py',
    content: `from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.trustedhost import TrustedHostMiddleware
from fastapi.responses import JSONResponse
import uvicorn
from contextlib import asynccontextmanager
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    logger.info("Application startup")
    yield
    # Shutdown
    logger.info("Application shutdown")

app = FastAPI(
    title="Your API",
    description="API built with FastAPI",
    version="1.0.0",
    lifespan=lifespan
)

# Security middleware
app.add_middleware(
    TrustedHostMiddleware, 
    allowed_hosts=["localhost", "127.0.0.1", "*.yourdomain.com"]
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World", "status": "running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": "1.0.0"}

# Error handlers
@app.exception_handler(HTTPException)
async def http_exception_handler(request, exc):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "detail": exc.detail,
            "status_code": exc.status_code
        }
    )

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
        log_level="info"
    )`,
    tags: ['fastapi', 'python', 'api', 'server'],
    featured: false,
    order_index: 7
  }
];

// Helper functions
export function getAllTemplates(): CodeTemplate[] {
  return templatesData.sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
}

export function getFeaturedTemplates(): CodeTemplate[] {
  return templatesData.filter(template => template.featured)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
}

export function getTemplatesByCategory(category: string): CodeTemplate[] {
  return templatesData.filter(template => template.category === category)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
}

export function getTemplateByLanguage(language: string): CodeTemplate[] {
  return templatesData.filter(template => template.language === language)
    .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
}

export function getTemplateById(id: string): CodeTemplate | undefined {
  return templatesData.find(template => template.id === id);
}