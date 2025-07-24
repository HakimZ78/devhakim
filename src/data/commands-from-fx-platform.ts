// Commands learned from building ForexAcuity
// Extracted from fx-platform development experience

export interface Command {
  id: string;
  category: CommandCategory;
  command: string;
  description: string;
  example: string;
  output?: string;
  dateLearned: Date;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  relatedTo?: 'python' | 'fintech' | 'devops' | 'general';
  projectSource?: string;
}

export type CommandCategory = 
  | 'npm'
  | 'git'
  | 'python'
  | 'docker'
  | 'database'
  | 'testing'
  | 'deployment'
  | 'debugging'
  | 'fintech'
  | 'websocket';

export const fxPlatformCommands: Command[] = [
  // NPM & Monorepo Commands
  {
    id: 'fx-1',
    category: 'npm',
    command: 'npm run install:all',
    description: 'Install dependencies for all services in monorepo',
    example: 'cd fx-platform && npm run install:all',
    dateLearned: new Date('2024-10-01'),
    difficulty: 'intermediate',
    tags: ['monorepo', 'setup', 'dependencies'],
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-2',
    category: 'npm',
    command: 'npm run dev',
    description: 'Start all services concurrently (frontend, API, proxy)',
    example: 'npm run dev # Starts on ports 3002, 3001, 5000',
    dateLearned: new Date('2024-10-02'),
    difficulty: 'beginner',
    tags: ['development', 'monorepo', 'concurrent'],
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-3',
    category: 'npm',
    command: 'npm run dev:frontend',
    description: 'Start only Next.js frontend service',
    example: 'npm run dev:frontend # Runs on http://localhost:3002',
    dateLearned: new Date('2024-10-03'),
    difficulty: 'beginner',
    tags: ['frontend', 'nextjs', 'development'],
    projectSource: 'ForexAcuity'
  },
  
  // Python/FastAPI Commands
  {
    id: 'fx-4',
    category: 'python',
    command: 'uvicorn main:app --reload --port 5000',
    description: 'Start FastAPI server with hot reload',
    example: 'cd proxy && uvicorn main:app --reload --port 5000',
    dateLearned: new Date('2024-10-15'),
    difficulty: 'intermediate',
    tags: ['fastapi', 'api', 'development'],
    relatedTo: 'python',
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-5',
    category: 'python',
    command: 'pip install -r requirements.txt',
    description: 'Install Python dependencies from requirements file',
    example: 'cd proxy && pip install -r requirements.txt',
    dateLearned: new Date('2024-10-14'),
    difficulty: 'beginner',
    tags: ['python', 'dependencies', 'setup'],
    relatedTo: 'python',
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-6',
    category: 'python',
    command: 'pip freeze > requirements.txt',
    description: 'Export current Python dependencies to requirements file',
    example: 'pip freeze > requirements.txt',
    dateLearned: new Date('2024-10-14'),
    difficulty: 'beginner',
    tags: ['python', 'dependencies', 'export'],
    relatedTo: 'python',
    projectSource: 'ForexAcuity'
  },
  
  // WebSocket Testing Commands
  {
    id: 'fx-7',
    category: 'websocket',
    command: 'wscat -c ws://localhost:3001',
    description: 'Connect to WebSocket server for testing',
    example: 'wscat -c ws://localhost:3001 # Then send: {"type":"subscribe","channel":"signals"}',
    dateLearned: new Date('2024-11-01'),
    difficulty: 'intermediate',
    tags: ['websocket', 'testing', 'debugging'],
    relatedTo: 'fintech',
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-8',
    category: 'python',
    command: 'python -m websockets ws://localhost:8765',
    description: 'Test WebSocket connection using Python websockets module',
    example: 'python -m websockets ws://localhost:8765',
    dateLearned: new Date('2024-11-02'),
    difficulty: 'intermediate',
    tags: ['websocket', 'python', 'testing'],
    relatedTo: 'python',
    projectSource: 'ForexAcuity'
  },
  
  // Database Commands
  {
    id: 'fx-9',
    category: 'database',
    command: 'npx supabase db push',
    description: 'Apply database migrations to Supabase',
    example: 'npx supabase db push --linked',
    dateLearned: new Date('2024-10-20'),
    difficulty: 'intermediate',
    tags: ['supabase', 'database', 'migrations'],
    relatedTo: 'fintech',
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-10',
    category: 'database',
    command: 'npx supabase gen types typescript',
    description: 'Generate TypeScript types from Supabase schema',
    example: 'npx supabase gen types typescript > src/types/supabase.ts',
    dateLearned: new Date('2024-10-21'),
    difficulty: 'intermediate',
    tags: ['supabase', 'typescript', 'codegen'],
    projectSource: 'ForexAcuity'
  },
  
  // Git Commands for Monorepo
  {
    id: 'fx-11',
    category: 'git',
    command: 'git add -A && git commit -m "feat: message"',
    description: 'Stage all changes and commit with conventional message',
    example: 'git add -A && git commit -m "feat: add WebSocket connection handler"',
    dateLearned: new Date('2024-10-05'),
    difficulty: 'beginner',
    tags: ['git', 'version-control', 'conventional-commits'],
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-12',
    category: 'git',
    command: 'git log --oneline --graph --all',
    description: 'View condensed git history with branch visualization',
    example: 'git log --oneline --graph --all -20',
    dateLearned: new Date('2024-10-06'),
    difficulty: 'intermediate',
    tags: ['git', 'history', 'visualization'],
    projectSource: 'ForexAcuity'
  },
  
  // Testing Commands
  {
    id: 'fx-13',
    category: 'testing',
    command: 'npm run test -- --watch',
    description: 'Run tests in watch mode for TDD',
    example: 'npm run test -- --watch src/utils/',
    dateLearned: new Date('2024-11-10'),
    difficulty: 'intermediate',
    tags: ['testing', 'jest', 'tdd'],
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-14',
    category: 'testing',
    command: 'curl -X POST http://localhost:3001/api/webhook/stripe',
    description: 'Test webhook endpoint with curl',
    example: 'curl -X POST http://localhost:3001/api/webhook/stripe -H "Content-Type: application/json" -d \'{"type":"payment_intent.succeeded"}\'',
    dateLearned: new Date('2024-11-15'),
    difficulty: 'advanced',
    tags: ['testing', 'api', 'webhooks', 'curl'],
    relatedTo: 'fintech',
    projectSource: 'ForexAcuity'
  },
  
  // Debugging Commands
  {
    id: 'fx-15',
    category: 'debugging',
    command: 'lsof -i :3001',
    description: 'Find process using specific port',
    example: 'lsof -i :3001 # Find what\'s using port 3001',
    dateLearned: new Date('2024-10-25'),
    difficulty: 'intermediate',
    tags: ['debugging', 'ports', 'processes'],
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-16',
    category: 'debugging',
    command: 'kill -9 $(lsof -t -i:3001)',
    description: 'Kill process on specific port',
    example: 'kill -9 $(lsof -t -i:3001) # Force kill process on port 3001',
    dateLearned: new Date('2024-10-25'),
    difficulty: 'intermediate',
    tags: ['debugging', 'ports', 'processes'],
    projectSource: 'ForexAcuity'
  },
  
  // Environment & Configuration
  {
    id: 'fx-17',
    category: 'npm',
    command: 'cp .env.example .env.local',
    description: 'Copy environment template for local development',
    example: 'cp .env.example .env.local && nano .env.local',
    dateLearned: new Date('2024-10-01'),
    difficulty: 'beginner',
    tags: ['configuration', 'environment', 'setup'],
    projectSource: 'ForexAcuity'
  },
  
  // Build & Production Commands
  {
    id: 'fx-18',
    category: 'npm',
    command: 'npm run build',
    description: 'Build all services for production',
    example: 'npm run build && npm run start',
    dateLearned: new Date('2024-12-01'),
    difficulty: 'intermediate',
    tags: ['production', 'build', 'deployment'],
    projectSource: 'ForexAcuity'
  },
  
  // Docker Commands (learned for deployment)
  {
    id: 'fx-19',
    category: 'docker',
    command: 'docker-compose up -d',
    description: 'Start all services in detached mode',
    example: 'docker-compose up -d # Run in background',
    dateLearned: new Date('2024-12-05'),
    difficulty: 'intermediate',
    tags: ['docker', 'deployment', 'containers'],
    relatedTo: 'devops',
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-20',
    category: 'docker',
    command: 'docker-compose logs -f api',
    description: 'Follow logs for specific service',
    example: 'docker-compose logs -f api # Stream API logs',
    dateLearned: new Date('2024-12-05'),
    difficulty: 'intermediate',
    tags: ['docker', 'debugging', 'logs'],
    relatedTo: 'devops',
    projectSource: 'ForexAcuity'
  },
  
  // Fintech Specific Commands
  {
    id: 'fx-21',
    category: 'fintech',
    command: 'stripe listen --forward-to localhost:3001/api/webhook/stripe',
    description: 'Forward Stripe webhooks to local development',
    example: 'stripe listen --forward-to localhost:3001/api/webhook/stripe',
    dateLearned: new Date('2024-11-20'),
    difficulty: 'advanced',
    tags: ['stripe', 'webhooks', 'payments', 'development'],
    relatedTo: 'fintech',
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-22',
    category: 'fintech',
    command: 'stripe trigger payment_intent.succeeded',
    description: 'Trigger test Stripe webhook event',
    example: 'stripe trigger payment_intent.succeeded --override payment_intent:metadata.userId=test123',
    dateLearned: new Date('2024-11-21'),
    difficulty: 'advanced',
    tags: ['stripe', 'testing', 'webhooks', 'payments'],
    relatedTo: 'fintech',
    projectSource: 'ForexAcuity'
  },
  
  // Performance & Monitoring
  {
    id: 'fx-23',
    category: 'npm',
    command: 'npm run analyze',
    description: 'Analyze Next.js bundle size',
    example: 'npm run analyze # Opens bundle analyzer',
    dateLearned: new Date('2024-11-25'),
    difficulty: 'intermediate',
    tags: ['performance', 'optimization', 'nextjs'],
    projectSource: 'ForexAcuity'
  },
  {
    id: 'fx-24',
    category: 'debugging',
    command: 'npx next info',
    description: 'Display Next.js environment information',
    example: 'npx next info # Shows versions and config',
    dateLearned: new Date('2024-10-10'),
    difficulty: 'beginner',
    tags: ['nextjs', 'debugging', 'environment'],
    projectSource: 'ForexAcuity'
  }
];

// Group commands by learning progression
export const commandsByPhase = {
  setup: ['fx-1', 'fx-2', 'fx-3', 'fx-5', 'fx-17'],
  development: ['fx-4', 'fx-11', 'fx-12', 'fx-13'],
  integration: ['fx-7', 'fx-8', 'fx-9', 'fx-10', 'fx-21'],
  debugging: ['fx-15', 'fx-16', 'fx-20', 'fx-24'],
  production: ['fx-18', 'fx-19', 'fx-23']
};