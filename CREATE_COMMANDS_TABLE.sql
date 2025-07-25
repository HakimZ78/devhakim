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