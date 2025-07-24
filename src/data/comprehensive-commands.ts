// Comprehensive Commands Database
// Extracted from ForexAcuity deployment and development experience
// Contains deployment, development, and beginner commands

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
  relatedTo?: 'python' | 'fintech' | 'devops' | 'linux' | 'web' | 'general';
  projectSource?: string;
}

export type CommandCategory = 
  | 'git'
  | 'npm'
  | 'python'
  | 'docker'
  | 'ssh'
  | 'nginx'
  | 'systemd'
  | 'bash'
  | 'deployment'
  | 'monitoring'
  | 'security'
  | 'networking'
  | 'database'
  | 'wine'
  | 'pm2'
  | 'ssl'
  | 'backup'
  | 'troubleshooting';

export const comprehensiveCommands: Command[] = [
  // ==================== PROJECT INITIALIZATION ====================
  {
    id: 'init-1',
    category: 'git',
    command: 'git init',
    description: 'Initialize a new Git repository',
    example: 'git init # Creates .git directory in current folder',
    dateLearned: new Date('2024-01-15'),
    difficulty: 'beginner',
    tags: ['git', 'initialization', 'repository'],
    relatedTo: 'general'
  },
  {
    id: 'init-2',
    category: 'git',
    command: 'git clone',
    description: 'Clone a repository from remote URL',
    example: 'git clone https://github.com/username/repo.git',
    dateLearned: new Date('2024-01-15'),
    difficulty: 'beginner',
    tags: ['git', 'clone', 'repository'],
    relatedTo: 'general'
  },
  {
    id: 'init-3',
    category: 'npm',
    command: 'npm init',
    description: 'Initialize a new npm project',
    example: 'npm init -y # Skip questions and use defaults',
    dateLearned: new Date('2024-01-16'),
    difficulty: 'beginner',
    tags: ['npm', 'initialization', 'package.json'],
    relatedTo: 'web'
  },
  {
    id: 'init-4',
    category: 'npm',
    command: 'npx create-next-app',
    description: 'Create new Next.js application',
    example: 'npx create-next-app@latest my-app --typescript --tailwind',
    dateLearned: new Date('2024-01-20'),
    difficulty: 'beginner',
    tags: ['nextjs', 'react', 'initialization'],
    relatedTo: 'web'
  },
  {
    id: 'init-5',
    category: 'python',
    command: 'python -m venv',
    description: 'Create Python virtual environment',
    example: 'python -m venv venv && source venv/bin/activate',
    dateLearned: new Date('2024-01-18'),
    difficulty: 'beginner',
    tags: ['python', 'virtual-environment', 'setup'],
    relatedTo: 'python'
  },

  // ==================== BASIC GIT COMMANDS ====================
  {
    id: 'git-1',
    category: 'git',
    command: 'git status',
    description: 'Show the working directory status',
    example: 'git status # Shows modified, staged, and untracked files',
    dateLearned: new Date('2024-01-15'),
    difficulty: 'beginner',
    tags: ['git', 'status', 'working-directory'],
    relatedTo: 'general'
  },
  {
    id: 'git-2',
    category: 'git',
    command: 'git add',
    description: 'Stage changes for commit',
    example: 'git add . # Stage all changes\ngit add file.txt # Stage specific file',
    dateLearned: new Date('2024-01-15'),
    difficulty: 'beginner',
    tags: ['git', 'staging', 'add'],
    relatedTo: 'general'
  },
  {
    id: 'git-3',
    category: 'git',
    command: 'git commit',
    description: 'Commit staged changes',
    example: 'git commit -m "Add user authentication feature"',
    dateLearned: new Date('2024-01-15'),
    difficulty: 'beginner',
    tags: ['git', 'commit', 'version-control'],
    relatedTo: 'general'
  },
  {
    id: 'git-4',
    category: 'git',
    command: 'git push',
    description: 'Push commits to remote repository',
    example: 'git push origin main # Push to main branch',
    dateLearned: new Date('2024-01-16'),
    difficulty: 'beginner',
    tags: ['git', 'push', 'remote'],
    relatedTo: 'general'
  },
  {
    id: 'git-5',
    category: 'git',
    command: 'git pull',
    description: 'Fetch and merge remote changes',
    example: 'git pull origin main # Pull latest changes from main',
    dateLearned: new Date('2024-01-16'),
    difficulty: 'beginner',
    tags: ['git', 'pull', 'merge'],
    relatedTo: 'general'
  },
  {
    id: 'git-6',
    category: 'git',
    command: 'git log',
    description: 'Show commit history',
    example: 'git log --oneline --graph --all -20',
    dateLearned: new Date('2024-01-20'),
    difficulty: 'intermediate',
    tags: ['git', 'history', 'log'],
    relatedTo: 'general'
  },
  {
    id: 'git-7',
    category: 'git',
    command: 'git branch',
    description: 'List, create, or delete branches',
    example: 'git branch feature/new-login # Create branch\ngit branch -d old-branch # Delete branch',
    dateLearned: new Date('2024-01-25'),
    difficulty: 'intermediate',
    tags: ['git', 'branch', 'workflow'],
    relatedTo: 'general'
  },
  {
    id: 'git-8',
    category: 'git',
    command: 'git checkout',
    description: 'Switch branches or restore files',
    example: 'git checkout feature/new-login # Switch branch\ngit checkout -- file.txt # Restore file',
    dateLearned: new Date('2024-01-25'),
    difficulty: 'intermediate',
    tags: ['git', 'checkout', 'branch'],
    relatedTo: 'general'
  },

  // ==================== NPM COMMANDS ====================
  {
    id: 'npm-1',
    category: 'npm',
    command: 'npm install',
    description: 'Install dependencies from package.json',
    example: 'npm install # Install all dependencies\nnpm install express # Install specific package',
    dateLearned: new Date('2024-01-16'),
    difficulty: 'beginner',
    tags: ['npm', 'install', 'dependencies'],
    relatedTo: 'web'
  },
  {
    id: 'npm-2',
    category: 'npm',
    command: 'npm run',
    description: 'Run scripts defined in package.json',
    example: 'npm run dev # Start development server\nnpm run build # Build for production',
    dateLearned: new Date('2024-01-16'),
    difficulty: 'beginner',
    tags: ['npm', 'scripts', 'development'],
    relatedTo: 'web'
  },
  {
    id: 'npm-3',
    category: 'npm',
    command: 'npm list',
    description: 'List installed packages',
    example: 'npm list --depth=0 # Show top-level packages only',
    dateLearned: new Date('2024-02-01'),
    difficulty: 'beginner',
    tags: ['npm', 'list', 'packages'],
    relatedTo: 'web'
  },
  {
    id: 'npm-4',
    category: 'npm',
    command: 'npm update',
    description: 'Update packages to latest versions',
    example: 'npm update # Update all packages\nnpm update express # Update specific package',
    dateLearned: new Date('2024-02-05'),
    difficulty: 'intermediate',
    tags: ['npm', 'update', 'maintenance'],
    relatedTo: 'web'
  },
  {
    id: 'npm-5',
    category: 'npm',
    command: 'npm audit',
    description: 'Check for security vulnerabilities',
    example: 'npm audit # Show vulnerabilities\nnpm audit fix # Auto-fix issues',
    dateLearned: new Date('2024-02-10'),
    difficulty: 'intermediate',
    tags: ['npm', 'security', 'audit'],
    relatedTo: 'web'
  },

  // ==================== PYTHON COMMANDS ====================
  {
    id: 'python-1',
    category: 'python',
    command: 'pip install',
    description: 'Install Python packages',
    example: 'pip install fastapi # Install specific package\npip install -r requirements.txt # Install from file',
    dateLearned: new Date('2024-01-18'),
    difficulty: 'beginner',
    tags: ['python', 'pip', 'packages'],
    relatedTo: 'python'
  },
  {
    id: 'python-2',
    category: 'python',
    command: 'pip freeze',
    description: 'List installed packages with versions',
    example: 'pip freeze > requirements.txt # Export to file',
    dateLearned: new Date('2024-01-19'),
    difficulty: 'beginner',
    tags: ['python', 'pip', 'requirements'],
    relatedTo: 'python'
  },
  {
    id: 'python-3',
    category: 'python',
    command: 'python -m uvicorn',
    description: 'Run FastAPI server with uvicorn',
    example: 'python -m uvicorn main:app --reload --port 5000',
    dateLearned: new Date('2024-02-15'),
    difficulty: 'intermediate',
    tags: ['python', 'fastapi', 'server'],
    relatedTo: 'python',
    projectSource: 'ForexAcuity'
  },
  {
    id: 'python-4',
    category: 'python',
    command: 'python -m venv',
    description: 'Create virtual environment',
    example: 'python -m venv venv # Create environment',
    dateLearned: new Date('2024-01-18'),
    difficulty: 'beginner',
    tags: ['python', 'virtual-environment'],
    relatedTo: 'python'
  },
  {
    id: 'python-5',
    category: 'python',
    command: 'source venv/bin/activate',
    description: 'Activate virtual environment',
    example: 'source venv/bin/activate # Linux/macOS\nvenv\\Scripts\\activate # Windows',
    dateLearned: new Date('2024-01-18'),
    difficulty: 'beginner',
    tags: ['python', 'virtual-environment', 'activation'],
    relatedTo: 'python'
  },

  // ==================== SSH COMMANDS ====================
  {
    id: 'ssh-1',
    category: 'ssh',
    command: 'ssh',
    description: 'Connect to remote server via SSH',
    example: 'ssh user@server-ip # Basic connection\nssh -p 2222 user@server-ip # Custom port',
    dateLearned: new Date('2024-06-01'),
    difficulty: 'beginner',
    tags: ['ssh', 'remote', 'connection'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'ssh-2',
    category: 'ssh',
    command: 'ssh-keygen',
    description: 'Generate SSH key pair',
    example: 'ssh-keygen -t ed25519 -C "your-email@example.com"',
    dateLearned: new Date('2024-06-02'),
    difficulty: 'intermediate',
    tags: ['ssh', 'keys', 'security'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'ssh-3',
    category: 'ssh',
    command: 'ssh-copy-id',
    description: 'Copy SSH public key to remote server',
    example: 'ssh-copy-id -i ~/.ssh/id_ed25519.pub user@server-ip',
    dateLearned: new Date('2024-06-02'),
    difficulty: 'intermediate',
    tags: ['ssh', 'keys', 'authentication'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'ssh-4',
    category: 'ssh',
    command: 'scp',
    description: 'Secure copy files over SSH',
    example: 'scp -P 2222 local-file.txt user@server-ip:/remote/path/',
    dateLearned: new Date('2024-06-05'),
    difficulty: 'intermediate',
    tags: ['ssh', 'file-transfer', 'scp'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'ssh-5',
    category: 'ssh',
    command: 'rsync',
    description: 'Synchronize files between local and remote',
    example: 'rsync -avz --progress -e "ssh -p 2222" local/ user@server-ip:/remote/',
    dateLearned: new Date('2024-06-06'),
    difficulty: 'advanced',
    tags: ['ssh', 'sync', 'backup'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },

  // ==================== LINUX/BASH COMMANDS ====================
  {
    id: 'bash-1',
    category: 'bash',
    command: 'apt update',
    description: 'Update package repository information',
    example: 'sudo apt update # Update package lists',
    dateLearned: new Date('2024-06-01'),
    difficulty: 'beginner',
    tags: ['linux', 'package-management', 'ubuntu'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'bash-2',
    category: 'bash',
    command: 'apt upgrade',
    description: 'Upgrade installed packages',
    example: 'sudo apt upgrade -y # Upgrade all packages',
    dateLearned: new Date('2024-06-01'),
    difficulty: 'beginner',
    tags: ['linux', 'package-management', 'ubuntu'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'bash-3',
    category: 'bash',
    command: 'apt install',
    description: 'Install packages using apt',
    example: 'sudo apt install -y nginx curl git',
    dateLearned: new Date('2024-06-01'),
    difficulty: 'beginner',
    tags: ['linux', 'package-management', 'installation'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'bash-4',
    category: 'bash',
    command: 'ls',
    description: 'List directory contents',
    example: 'ls -la # Detailed list with hidden files',
    dateLearned: new Date('2024-01-01'),
    difficulty: 'beginner',
    tags: ['bash', 'directory', 'listing'],
    relatedTo: 'general'
  },
  {
    id: 'bash-5',
    category: 'bash',
    command: 'cd',
    description: 'Change directory',
    example: 'cd /var/www # Absolute path\ncd .. # Parent directory',
    dateLearned: new Date('2024-01-01'),
    difficulty: 'beginner',
    tags: ['bash', 'navigation', 'directory'],
    relatedTo: 'general'
  },
  {
    id: 'bash-6',
    category: 'bash',
    command: 'mkdir',
    description: 'Create directories',
    example: 'mkdir -p /var/www/app # Create with parent directories',
    dateLearned: new Date('2024-01-01'),
    difficulty: 'beginner',
    tags: ['bash', 'directory', 'creation'],
    relatedTo: 'general'
  },
  {
    id: 'bash-7',
    category: 'bash',
    command: 'chmod',
    description: 'Change file permissions',
    example: 'chmod +x script.sh # Make executable\nchmod 644 file.txt # Set specific permissions',
    dateLearned: new Date('2024-01-05'),
    difficulty: 'intermediate',
    tags: ['bash', 'permissions', 'security'],
    relatedTo: 'linux'
  },
  {
    id: 'bash-8',
    category: 'bash',
    command: 'chown',
    description: 'Change file ownership',
    example: 'sudo chown user:group file.txt # Change owner and group',
    dateLearned: new Date('2024-01-05'),
    difficulty: 'intermediate',
    tags: ['bash', 'ownership', 'permissions'],
    relatedTo: 'linux'
  },

  // ==================== NGINX COMMANDS ====================
  {
    id: 'nginx-1',
    category: 'nginx',
    command: 'nginx -t',
    description: 'Test nginx configuration',
    example: 'sudo nginx -t # Test configuration syntax',
    dateLearned: new Date('2024-06-10'),
    difficulty: 'intermediate',
    tags: ['nginx', 'configuration', 'testing'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'nginx-2',
    category: 'nginx',
    command: 'systemctl restart nginx',
    description: 'Restart nginx service',
    example: 'sudo systemctl restart nginx',
    dateLearned: new Date('2024-06-10'),
    difficulty: 'beginner',
    tags: ['nginx', 'service', 'restart'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'nginx-3',
    category: 'nginx',
    command: 'systemctl status nginx',
    description: 'Check nginx service status',
    example: 'sudo systemctl status nginx',
    dateLearned: new Date('2024-06-10'),
    difficulty: 'beginner',
    tags: ['nginx', 'service', 'status'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },

  // ==================== SYSTEMD COMMANDS ====================
  {
    id: 'systemd-1',
    category: 'systemd',
    command: 'systemctl enable',
    description: 'Enable service to start on boot',
    example: 'sudo systemctl enable nginx',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'intermediate',
    tags: ['systemd', 'services', 'boot'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'systemd-2',
    category: 'systemd',
    command: 'systemctl start',
    description: 'Start a service',
    example: 'sudo systemctl start nginx',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'beginner',
    tags: ['systemd', 'services', 'start'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'systemd-3',
    category: 'systemd',
    command: 'systemctl stop',
    description: 'Stop a service',
    example: 'sudo systemctl stop nginx',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'beginner',
    tags: ['systemd', 'services', 'stop'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'systemd-4',
    category: 'systemd',
    command: 'journalctl',
    description: 'View service logs',
    example: 'sudo journalctl -u nginx -f # Follow logs\nsudo journalctl -u nginx --since "10 minutes ago"',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'intermediate',
    tags: ['systemd', 'logs', 'debugging'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'systemd-5',
    category: 'systemd',
    command: 'systemctl daemon-reload',
    description: 'Reload systemd configuration',
    example: 'sudo systemctl daemon-reload # After editing service files',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'intermediate',
    tags: ['systemd', 'reload', 'configuration'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },

  // ==================== PM2 COMMANDS ====================
  {
    id: 'pm2-1',
    category: 'pm2',
    command: 'pm2 start',
    description: 'Start application with PM2',
    example: 'pm2 start server.js --name "api" # Start with custom name',
    dateLearned: new Date('2024-06-12'),
    difficulty: 'intermediate',
    tags: ['pm2', 'process-management', 'nodejs'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'pm2-2',
    category: 'pm2',
    command: 'pm2 status',
    description: 'Show all PM2 processes',
    example: 'pm2 status # List all running processes',
    dateLearned: new Date('2024-06-12'),
    difficulty: 'beginner',
    tags: ['pm2', 'status', 'monitoring'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'pm2-3',
    category: 'pm2',
    command: 'pm2 logs',
    description: 'View PM2 application logs',
    example: 'pm2 logs --lines 50 # Last 50 lines\npm2 logs api --lines 20 # Specific app',
    dateLearned: new Date('2024-06-12'),
    difficulty: 'beginner',
    tags: ['pm2', 'logs', 'debugging'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'pm2-4',
    category: 'pm2',
    command: 'pm2 restart',
    description: 'Restart PM2 applications',
    example: 'pm2 restart all # Restart all apps\npm2 restart api # Restart specific app',
    dateLearned: new Date('2024-06-12'),
    difficulty: 'beginner',
    tags: ['pm2', 'restart', 'management'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'pm2-5',
    category: 'pm2',
    command: 'pm2 save',
    description: 'Save PM2 process list',
    example: 'pm2 save # Save current process list',
    dateLearned: new Date('2024-06-13'),
    difficulty: 'intermediate',
    tags: ['pm2', 'save', 'persistence'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'pm2-6',
    category: 'pm2',
    command: 'pm2 startup',
    description: 'Generate startup script for PM2',
    example: 'pm2 startup # Auto-start PM2 on system boot',
    dateLearned: new Date('2024-06-13'),
    difficulty: 'intermediate',
    tags: ['pm2', 'startup', 'boot'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'pm2-7',
    category: 'pm2',
    command: 'pm2 stop',
    description: 'Stop PM2 applications',
    example: 'pm2 stop all # Stop all apps\npm2 stop api # Stop specific app',
    dateLearned: new Date('2024-06-12'),
    difficulty: 'beginner',
    tags: ['pm2', 'stop', 'management'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'pm2-8',
    category: 'pm2',
    command: 'pm2 delete',
    description: 'Delete PM2 applications',
    example: 'pm2 delete all # Delete all apps\npm2 delete api # Delete specific app',
    dateLearned: new Date('2024-06-12'),
    difficulty: 'intermediate',
    tags: ['pm2', 'delete', 'cleanup'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },

  // ==================== NETWORKING/MONITORING COMMANDS ====================
  {
    id: 'net-1',
    category: 'networking',
    command: 'lsof -i',
    description: 'List processes using network ports',
    example: 'lsof -i :3001 # Check what\'s using port 3001\nlsof -i tcp # All TCP connections',
    dateLearned: new Date('2024-06-05'),
    difficulty: 'intermediate',
    tags: ['networking', 'ports', 'debugging'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'net-2',
    category: 'networking',
    command: 'ss -tlnp',
    description: 'Show listening ports and processes',
    example: 'sudo ss -tlnp | grep :80 # Check port 80\nsudo ss -tlnp | grep -E "3001|3002|5000"',
    dateLearned: new Date('2024-06-05'),
    difficulty: 'intermediate',
    tags: ['networking', 'ports', 'monitoring'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'net-3',
    category: 'networking',
    command: 'netstat -tlnp',
    description: 'Display network connections',
    example: 'sudo netstat -tlnp | grep :3002',
    dateLearned: new Date('2024-06-05'),
    difficulty: 'intermediate',
    tags: ['networking', 'connections', 'monitoring'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'net-4',
    category: 'networking',
    command: 'curl',
    description: 'Test HTTP endpoints',
    example: 'curl http://localhost:3001 # Test API\ncurl -I https://domain.com # Headers only',
    dateLearned: new Date('2024-02-01'),
    difficulty: 'beginner',
    tags: ['networking', 'http', 'testing'],
    relatedTo: 'web'
  },
  {
    id: 'net-5',
    category: 'networking',
    command: 'nslookup',
    description: 'Look up DNS information',
    example: 'nslookup domain.com # Check DNS resolution',
    dateLearned: new Date('2024-06-15'),
    difficulty: 'intermediate',
    tags: ['networking', 'dns', 'troubleshooting'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },

  // ==================== MONITORING COMMANDS ====================
  {
    id: 'mon-1',
    category: 'monitoring',
    command: 'htop',
    description: 'Interactive process viewer',
    example: 'htop # Better than top, interactive UI',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'beginner',
    tags: ['monitoring', 'processes', 'performance'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'mon-2',
    category: 'monitoring',
    command: 'free -h',
    description: 'Show memory usage in human readable format',
    example: 'free -h # Memory usage with MB/GB units',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'beginner',
    tags: ['monitoring', 'memory', 'system'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'mon-3',
    category: 'monitoring',
    command: 'df -h',
    description: 'Show disk space usage',
    example: 'df -h # Disk usage in human readable format',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'beginner',
    tags: ['monitoring', 'disk', 'storage'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'mon-4',
    category: 'monitoring',
    command: 'uptime',
    description: 'Show system uptime and load',
    example: 'uptime # System uptime and load average',
    dateLearned: new Date('2024-06-08'),
    difficulty: 'beginner',
    tags: ['monitoring', 'uptime', 'load'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'mon-5',
    category: 'monitoring',
    command: 'iotop',
    description: 'Monitor disk I/O usage',
    example: 'sudo iotop # Real-time disk I/O monitoring',
    dateLearned: new Date('2024-06-20'),
    difficulty: 'intermediate',
    tags: ['monitoring', 'io', 'disk'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'mon-6',
    category: 'monitoring',
    command: 'nethogs',
    description: 'Monitor network usage per process',
    example: 'sudo nethogs # Network usage by process',
    dateLearned: new Date('2024-06-20'),
    difficulty: 'intermediate',
    tags: ['monitoring', 'network', 'bandwidth'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },

  // ==================== SSL/SECURITY COMMANDS ====================
  {
    id: 'ssl-1',
    category: 'ssl',
    command: 'certbot',
    description: 'Generate SSL certificates with Let\'s Encrypt',
    example: 'sudo certbot --nginx -d domain.com -d www.domain.com',
    dateLearned: new Date('2024-06-15'),
    difficulty: 'intermediate',
    tags: ['ssl', 'certificates', 'security'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'ssl-2',
    category: 'ssl',
    command: 'certbot renew',
    description: 'Renew SSL certificates',
    example: 'sudo certbot renew --dry-run # Test renewal\nsudo certbot renew --quiet # Renew silently',
    dateLearned: new Date('2024-06-15'),
    difficulty: 'intermediate',
    tags: ['ssl', 'renewal', 'automation'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'ssl-3',
    category: 'ssl',
    command: 'certbot certificates',
    description: 'List installed SSL certificates',
    example: 'sudo certbot certificates # Show all certificates',
    dateLearned: new Date('2024-06-15'),
    difficulty: 'intermediate',
    tags: ['ssl', 'certificates', 'management'],
    relatedTo: 'web',
    projectSource: 'IONOS Deployment'
  },

  // ==================== SECURITY/FIREWALL COMMANDS ====================
  {
    id: 'sec-1',
    category: 'security',
    command: 'ufw',
    description: 'Uncomplicated Firewall management',
    example: 'sudo ufw enable # Enable firewall\nsudo ufw allow 80/tcp # Allow HTTP',
    dateLearned: new Date('2024-06-18'),
    difficulty: 'intermediate',
    tags: ['security', 'firewall', 'ports'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'sec-2',
    category: 'security',
    command: 'ufw status',
    description: 'Check firewall status and rules',
    example: 'sudo ufw status verbose # Detailed firewall status',
    dateLearned: new Date('2024-06-18'),
    difficulty: 'beginner',
    tags: ['security', 'firewall', 'status'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'sec-3',
    category: 'security',
    command: 'fail2ban-client',
    description: 'Manage fail2ban intrusion prevention',
    example: 'sudo fail2ban-client status # Show jail status\nsudo fail2ban-client status sshd',
    dateLearned: new Date('2024-06-19'),
    difficulty: 'advanced',
    tags: ['security', 'intrusion-prevention', 'ssh'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },

  // ==================== WINE/METATRADER COMMANDS ====================
  {
    id: 'wine-1',
    category: 'wine',
    command: 'winecfg',
    description: 'Configure Wine settings',
    example: 'winecfg # Open Wine configuration GUI',
    dateLearned: new Date('2024-06-20'),
    difficulty: 'intermediate',
    tags: ['wine', 'configuration', 'windows'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'wine-2',
    category: 'wine',
    command: 'winetricks',
    description: 'Install Windows dependencies in Wine',
    example: 'winetricks corefonts vcrun2019 # Install common dependencies',
    dateLearned: new Date('2024-06-20'),
    difficulty: 'intermediate',
    tags: ['wine', 'dependencies', 'windows'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'wine-3',
    category: 'wine',
    command: 'wine',
    description: 'Run Windows applications in Wine',
    example: 'wine setup.exe # Run Windows installer\nDISPLAY=:1 wine terminal64.exe',
    dateLearned: new Date('2024-06-20'),
    difficulty: 'intermediate',
    tags: ['wine', 'windows', 'applications'],
    relatedTo: 'devops',
    projectSource: 'IONOS Deployment'
  },

  // ==================== BACKUP COMMANDS ====================
  {
    id: 'backup-1',
    category: 'backup',
    command: 'tar',
    description: 'Create and extract tar archives',
    example: 'tar -czf backup.tar.gz /var/www # Create compressed backup\ntar -xzf backup.tar.gz # Extract backup',
    dateLearned: new Date('2024-06-25'),
    difficulty: 'intermediate',
    tags: ['backup', 'archive', 'compression'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'backup-2',
    category: 'backup',
    command: 'crontab',
    description: 'Schedule automated tasks',
    example: 'crontab -e # Edit cron jobs\ncrontab -l # List cron jobs\n0 2 * * * /usr/local/bin/backup.sh',
    dateLearned: new Date('2024-06-25'),
    difficulty: 'intermediate',
    tags: ['backup', 'automation', 'scheduling'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },

  // ==================== TROUBLESHOOTING COMMANDS ====================
  {
    id: 'trouble-1',
    category: 'troubleshooting',
    command: 'kill',
    description: 'Terminate processes by PID',
    example: 'kill -9 1234 # Force kill process\nkill $(lsof -t -i:3001) # Kill process on port',
    dateLearned: new Date('2024-06-05'),
    difficulty: 'intermediate',
    tags: ['troubleshooting', 'processes', 'kill'],
    relatedTo: 'linux'
  },
  {
    id: 'trouble-2',
    category: 'troubleshooting',
    command: 'fuser',
    description: 'Find and kill processes using files/ports',
    example: 'sudo fuser -k 3001/tcp # Kill processes using port 3001',
    dateLearned: new Date('2024-06-05'),
    difficulty: 'intermediate',
    tags: ['troubleshooting', 'ports', 'processes'],
    relatedTo: 'linux',
    projectSource: 'IONOS Deployment'
  },
  {
    id: 'trouble-3',
    category: 'troubleshooting',
    command: 'ps aux',
    description: 'List all running processes',
    example: 'ps aux | grep node # Find Node.js processes\nps aux | head -20',
    dateLearned: new Date('2024-02-01'),
    difficulty: 'beginner',
    tags: ['troubleshooting', 'processes', 'monitoring'],
    relatedTo: 'linux'
  },
  {
    id: 'trouble-4',
    category: 'troubleshooting',
    command: 'tail -f',
    description: 'Follow log files in real-time',
    example: 'tail -f /var/log/nginx/error.log # Follow nginx errors\ntail -f app.log',
    dateLearned: new Date('2024-02-05'),
    difficulty: 'beginner',
    tags: ['troubleshooting', 'logs', 'monitoring'],
    relatedTo: 'linux'
  },

  // ==================== DOCKER COMMANDS ====================
  {
    id: 'docker-1',
    category: 'docker',
    command: 'docker ps',
    description: 'List running containers',
    example: 'docker ps # Running containers\ndocker ps -a # All containers',
    dateLearned: new Date('2024-03-01'),
    difficulty: 'beginner',
    tags: ['docker', 'containers', 'listing'],
    relatedTo: 'devops'
  },
  {
    id: 'docker-2',
    category: 'docker',
    command: 'docker build',
    description: 'Build Docker image from Dockerfile',
    example: 'docker build -t myapp:latest . # Build image with tag',
    dateLearned: new Date('2024-03-02'),
    difficulty: 'intermediate',
    tags: ['docker', 'build', 'images'],
    relatedTo: 'devops'
  },
  {
    id: 'docker-3',
    category: 'docker',
    command: 'docker run',
    description: 'Run container from image',
    example: 'docker run -p 3000:3000 myapp # Run with port mapping',
    dateLearned: new Date('2024-03-02'),
    difficulty: 'intermediate',
    tags: ['docker', 'run', 'containers'],
    relatedTo: 'devops'
  },
  {
    id: 'docker-4',
    category: 'docker',
    command: 'docker-compose up',
    description: 'Start services defined in docker-compose.yml',
    example: 'docker-compose up -d # Start in detached mode',
    dateLearned: new Date('2024-03-05'),
    difficulty: 'intermediate',
    tags: ['docker', 'compose', 'orchestration'],
    relatedTo: 'devops'
  },
  {
    id: 'docker-5',
    category: 'docker',
    command: 'docker logs',
    description: 'View container logs',
    example: 'docker logs container-name # View logs\ndocker logs -f container-name # Follow logs',
    dateLearned: new Date('2024-03-03'),
    difficulty: 'beginner',
    tags: ['docker', 'logs', 'debugging'],
    relatedTo: 'devops'
  }
];

// Utility functions for filtering and searching
export const getCommandsByCategory = (category: CommandCategory) => 
  comprehensiveCommands.filter(cmd => cmd.category === category);

export const getCommandsByDifficulty = (difficulty: 'beginner' | 'intermediate' | 'advanced') => 
  comprehensiveCommands.filter(cmd => cmd.difficulty === difficulty);

export const getCommandsByProject = (project: string) => 
  comprehensiveCommands.filter(cmd => cmd.projectSource === project);

export const searchCommands = (query: string) => 
  comprehensiveCommands.filter(cmd => 
    cmd.command.toLowerCase().includes(query.toLowerCase()) ||
    cmd.description.toLowerCase().includes(query.toLowerCase()) ||
    cmd.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

// Learning progression paths
export const learningPaths = {
  beginner: [
    'git-1', 'git-2', 'git-3', 'git-4', 'git-5',
    'npm-1', 'npm-2', 'npm-3',
    'python-1', 'python-2', 'python-4', 'python-5',
    'bash-4', 'bash-5', 'bash-6'
  ],
  deployment: [
    'ssh-1', 'ssh-2', 'ssh-3', 'ssh-4',
    'bash-1', 'bash-2', 'bash-3',
    'nginx-1', 'nginx-2', 'nginx-3',
    'systemd-1', 'systemd-2', 'systemd-3'
  ],
  production: [
    'pm2-1', 'pm2-2', 'pm2-3', 'pm2-4', 'pm2-5',
    'ssl-1', 'ssl-2', 'ssl-3',
    'sec-1', 'sec-2', 'mon-1', 'mon-2', 'mon-3'
  ],
  troubleshooting: [
    'net-1', 'net-2', 'net-4',
    'trouble-1', 'trouble-2', 'trouble-3', 'trouble-4',
    'systemd-4', 'pm2-3'
  ]
};

export default comprehensiveCommands;