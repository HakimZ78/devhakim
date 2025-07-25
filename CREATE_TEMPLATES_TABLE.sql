-- Create code_templates table
CREATE TABLE IF NOT EXISTS code_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL,
  language TEXT NOT NULL,
  filename TEXT NOT NULL,
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE code_templates ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read code_templates" ON code_templates FOR SELECT USING (true);
CREATE POLICY "Authenticated can modify code_templates" ON code_templates FOR ALL USING (auth.role() = 'authenticated');

-- Insert default templates
INSERT INTO code_templates (title, description, category, language, filename, content, tags, featured, order_index) VALUES
(
  'Express.js Server',
  'Basic Express.js server setup with middleware, routes, and error handling',
  'server',
  'javascript',
  'server.js',
  'const express = require(''express'');
const cors = require(''cors'');
const helmet = require(''helmet'');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get(''/'', (req, res) => {
  res.json({ message: ''Server is running'' });
});

app.get(''/api/health'', (req, res) => {
  res.json({ status: ''OK'', timestamp: new Date().toISOString() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: ''Something went wrong!'' });
});

// 404 handler
app.use(''*'', (req, res) => {
  res.status(404).json({ error: ''Not Found'' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});',
  ARRAY['express', 'node', 'server', 'api'],
  true,
  1
),
(
  'Next.js API Route',
  'TypeScript API route template with error handling and type safety',
  'component',
  'typescript',
  'route.ts',
  'import { NextRequest, NextResponse } from ''next/server''

interface ApiResponse {
  success: boolean
  data?: any
  error?: string
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get(''id'')
    
    // Your logic here
    const data = { message: ''Hello World'', id }
    
    return NextResponse.json({
      success: true,
      data
    } as ApiResponse)
    
  } catch (error) {
    console.error(''API error:'', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : ''Unknown error''
    } as ApiResponse, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    if (!body.name) {
      return NextResponse.json({
        success: false,
        error: ''Name is required''
      } as ApiResponse, { status: 400 })
    }
    
    // Your logic here
    const result = { id: Date.now(), ...body }
    
    return NextResponse.json({
      success: true,
      data: result
    } as ApiResponse)
    
  } catch (error) {
    console.error(''API error:'', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : ''Unknown error''
    } as ApiResponse, { status: 500 })
  }
}',
  ARRAY['nextjs', 'api', 'typescript', 'route'],
  true,
  2
),
(
  'React Component',
  'Modern React component with TypeScript and props interface',
  'component',
  'typescript',
  'Component.tsx',
  'import { useState } from ''react''
import { motion } from ''framer-motion''

interface ComponentProps {
  title: string
  description?: string
  onAction?: () => void
}

export default function Component({ title, description, onAction }: ComponentProps) {
  const [isActive, setIsActive] = useState(false)

  const handleClick = () => {
    setIsActive(!isActive)
    onAction?.()
  }

  return (
    <motion.div
      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
        isActive ? ''bg-blue-100 border-blue-300'' : ''bg-gray-50 border-gray-200''
      }`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
    >
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      {description && (
        <p className="text-gray-600 mt-1">{description}</p>
      )}
    </motion.div>
  )
}',
  ARRAY['react', 'component', 'typescript', 'framer-motion'],
  true,
  3
),
(
  'Docker Configuration',
  'Multi-stage Dockerfile for Node.js applications with optimization',
  'config',
  'dockerfile',
  'Dockerfile',
  '# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["npm", "start"]',
  ARRAY['docker', 'nodejs', 'deployment', 'alpine'],
  false,
  4
),
(
  'Database Schema',
  'PostgreSQL table creation with constraints and indexes',
  'config',
  'sql',
  'schema.sql',
  '-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  published BOOLEAN DEFAULT false,
  author_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Indexes
CREATE INDEX idx_posts_author_id ON posts(author_id);
CREATE INDEX idx_posts_published ON posts(published);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view own profile" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Anyone can view published posts" ON posts FOR SELECT USING (published = true);
CREATE POLICY "Authors can manage own posts" ON posts FOR ALL USING (auth.uid() = author_id);',
  ARRAY['postgresql', 'database', 'schema', 'rls'],
  false,
  5
),
(
  'Environment Variables',
  'Environment configuration template with documentation',
  'config',
  'text',
  '.env.example',
  '# Database
DATABASE_URL=postgresql://username:password@localhost:5432/dbname
POSTGRES_PASSWORD=your_postgres_password

# Authentication
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# External APIs
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email Service
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# Storage
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_S3_BUCKET_NAME=your-bucket-name
AWS_REGION=us-east-1

# Redis (optional)
REDIS_URL=redis://localhost:6379

# Application
NODE_ENV=development
PORT=3000
APP_URL=http://localhost:3000',
  ARRAY['environment', 'config', 'secrets', 'setup'],
  false,
  6
),
(
  'Python Data Processing',
  'Data processing script with pandas and error handling',
  'utility',
  'python',
  'data_processor.py',
  'import pandas as pd
import numpy as np
from typing import Optional, Dict, Any
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class DataProcessor:
    """
    A utility class for common data processing operations
    """
    
    def __init__(self, data_source: str):
        self.data_source = data_source
        self.df: Optional[pd.DataFrame] = None
    
    def load_data(self) -> bool:
        """Load data from various sources"""
        try:
            if self.data_source.endswith(''.csv''):
                self.df = pd.read_csv(self.data_source)
            elif self.data_source.endswith(''.json''):
                self.df = pd.read_json(self.data_source)
            elif self.data_source.endswith(''.xlsx''):
                self.df = pd.read_excel(self.data_source)
            else:
                raise ValueError(f"Unsupported file format: {self.data_source}")
            
            logger.info(f"Loaded {len(self.df)} rows from {self.data_source}")
            return True
            
        except Exception as e:
            logger.error(f"Error loading data: {e}")
            return False
    
    def clean_data(self) -> Dict[str, Any]:
        """Clean and preprocess the data"""
        if self.df is None:
            raise ValueError("No data loaded")
        
        initial_rows = len(self.df)
        
        # Remove duplicates
        self.df = self.df.drop_duplicates()
        
        # Handle missing values
        numeric_columns = self.df.select_dtypes(include=[np.number]).columns
        self.df[numeric_columns] = self.df[numeric_columns].fillna(self.df[numeric_columns].median())
        
        # Handle categorical missing values
        categorical_columns = self.df.select_dtypes(include=[''object'']).columns
        self.df[categorical_columns] = self.df[categorical_columns].fillna(''Unknown'')
        
        final_rows = len(self.df)
        
        stats = {
            ''initial_rows'': initial_rows,
            ''final_rows'': final_rows,
            ''rows_removed'': initial_rows - final_rows,
            ''columns'': len(self.df.columns)
        }
        
        logger.info(f"Data cleaning complete: {stats}")
        return stats
    
    def get_summary(self) -> Dict[str, Any]:
        """Get data summary statistics"""
        if self.df is None:
            raise ValueError("No data loaded")
        
        return {
            ''shape'': self.df.shape,
            ''columns'': list(self.df.columns),
            ''dtypes'': self.df.dtypes.to_dict(),
            ''missing_values'': self.df.isnull().sum().to_dict(),
            ''numeric_summary'': self.df.describe().to_dict()
        }

# Example usage
if __name__ == "__main__":
    processor = DataProcessor("data.csv")
    
    if processor.load_data():
        stats = processor.clean_data()
        summary = processor.get_summary()
        
        print("Processing complete!")
        print(f"Final dataset: {summary[''shape'']}")
',
  ARRAY['python', 'pandas', 'data-processing', 'utility'],
  false,
  7
);