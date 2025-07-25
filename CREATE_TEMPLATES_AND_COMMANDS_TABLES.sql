-- Create both templates and commands tables

-- ===============================
-- CODE TEMPLATES TABLE
-- ===============================

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
);

-- ===============================
-- COMMANDS TABLE
-- ===============================

-- Create commands table
CREATE TABLE IF NOT EXISTS commands (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  command TEXT NOT NULL,
  category TEXT NOT NULL,
  project_source TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public can read commands" ON commands FOR SELECT USING (true);
CREATE POLICY "Authenticated can modify commands" ON commands FOR ALL USING (auth.role() = 'authenticated');

-- Insert default commands
INSERT INTO commands (title, description, command, category, project_source, tags, order_index) VALUES
(
  'Start Development Server',
  'Start the Next.js development server with hot reloading',
  'npm run dev',
  'development',
  'Portfolio',
  ARRAY['nextjs', 'development', 'server'],
  1
),
(
  'Build Production',
  'Build the application for production deployment',
  'npm run build',
  'deployment',
  'Portfolio',
  ARRAY['nextjs', 'build', 'production'],
  2
),
(
  'Install Dependencies',
  'Install all project dependencies from package.json',
  'npm install',
  'setup',
  'General',
  ARRAY['npm', 'dependencies', 'setup'],
  3
),
(
  'Docker Build',
  'Build Docker image for the application',
  'docker build -t portfolio .',
  'docker',
  'Portfolio',
  ARRAY['docker', 'build', 'container'],
  4
),
(
  'Check Types',
  'Run TypeScript type checking',
  'npm run type-check',
  'development',
  'Portfolio',
  ARRAY['typescript', 'types', 'check'],
  5
),
(
  'Run Tests',
  'Execute the test suite',
  'npm test',
  'testing',
  'Portfolio',
  ARRAY['testing', 'jest', 'unit'],
  6
),
(
  'Lint Code',
  'Run ESLint to check code quality and style',
  'npm run lint',
  'development',
  'Portfolio',
  ARRAY['eslint', 'linting', 'code-quality'],
  7
),
(
  'Format Code',
  'Format code with Prettier',
  'npm run format',
  'development',
  'Portfolio',
  ARRAY['prettier', 'formatting', 'code-style'],
  8
),
(
  'Database Migration',
  'Run database migrations',
  'npm run db:migrate',
  'database',
  'Portfolio',
  ARRAY['database', 'migration', 'schema'],
  9
),
(
  'Start Database',
  'Start local PostgreSQL database with Docker',
  'docker run --name postgres -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres',
  'database',
  'General',
  ARRAY['postgresql', 'docker', 'database'],
  10
),
(
  'View Container Logs',
  'View logs from a Docker container',
  'docker logs -f <container_name>',
  'docker',
  'General',
  ARRAY['docker', 'logs', 'debugging'],
  11
),
(
  'Kill Port Process',
  'Kill process running on specific port (macOS/Linux)',
  'lsof -ti:3000 | xargs kill -9',
  'system',
  'General',
  ARRAY['port', 'process', 'kill', 'system'],
  12
),
(
  'WebSocket Server',
  'Start WebSocket server for real-time data',
  'node server/websocket.js',
  'server',
  'ForexAcuity',
  ARRAY['websocket', 'server', 'realtime'],
  13
),
(
  'Python Virtual Environment',
  'Create and activate Python virtual environment',
  'python -m venv venv && source venv/bin/activate',
  'python',
  'ForexAcuity',
  ARRAY['python', 'venv', 'environment'],
  14
),
(
  'Install Python Requirements',
  'Install Python dependencies from requirements.txt',
  'pip install -r requirements.txt',
  'python',
  'ForexAcuity',
  ARRAY['python', 'pip', 'dependencies'],
  15
);