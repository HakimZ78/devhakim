// Commands extracted from fx-platform deployment files
// Source: /Users/hakim/Documents/Development/fx-platform/PROJECT SUPPPORT FILES/Deployment/

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
  relatedTo?: 'deployment' | 'debugging' | 'monitoring' | 'security' | 'development' | 'fintech' | 'devops';
  projectSource: string;
  sourceFile?: string;
}

export type CommandCategory = 
  | 'ssh'
  | 'system'
  | 'wine'
  | 'pm2'
  | 'network'
  | 'systemd'
  | 'deployment'
  | 'vnc'
  | 'monitoring'
  | 'security'
  | 'git'
  | 'npm'
  | 'python'
  | 'docker'
  | 'nginx'
  | 'database';

// Basic foundational Linux commands that precede deployment commands
const basicLinuxCommands: Command[] = [
  // Basic Navigation
  {
    id: 'basic-1',
    category: 'system',
    command: 'pwd',
    description: 'Print working directory (show current location)',
    example: 'pwd',
    output: '/home/forexuser',
    dateLearned: new Date('2024-10-01'),
    difficulty: 'beginner',
    tags: ['navigation', 'basics', 'directory'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-2',
    category: 'system',
    command: 'ls -la',
    description: 'List all files and directories with detailed info',
    example: 'ls -la',
    output: 'Shows permissions, owner, size, date for all files including hidden',
    dateLearned: new Date('2024-10-01'),
    difficulty: 'beginner',
    tags: ['navigation', 'files', 'listing'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-3',
    category: 'system',
    command: 'cd /path/to/directory',
    description: 'Change directory to specified path',
    example: 'cd /var/www/fx-platform',
    dateLearned: new Date('2024-10-01'),
    difficulty: 'beginner',
    tags: ['navigation', 'directory', 'basics'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-4',
    category: 'system',
    command: 'mkdir -p /path/to/directory',
    description: 'Create directory and parent directories if needed',
    example: 'mkdir -p ~/Downloads/installers',
    dateLearned: new Date('2024-10-02'),
    difficulty: 'beginner',
    tags: ['files', 'directory', 'creation'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-5',
    category: 'system',
    command: 'chmod +x filename',
    description: 'Make file executable',
    example: 'chmod +x ~/start-mt5.sh',
    dateLearned: new Date('2024-10-03'),
    difficulty: 'beginner',
    tags: ['permissions', 'files', 'executable'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  // Basic File Operations
  {
    id: 'basic-6',
    category: 'system',
    command: 'cp source destination',
    description: 'Copy files or directories',
    example: 'cp .env.example .env.local',
    dateLearned: new Date('2024-10-04'),
    difficulty: 'beginner',
    tags: ['files', 'copy', 'basics'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-7',
    category: 'system',
    command: 'mv source destination',
    description: 'Move or rename files and directories',
    example: 'mv old-file.txt new-file.txt',
    dateLearned: new Date('2024-10-04'),
    difficulty: 'beginner',
    tags: ['files', 'move', 'rename'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-8',
    category: 'system',
    command: 'rm -rf directory',
    description: 'Remove files and directories recursively',
    example: 'rm -rf node_modules/',
    dateLearned: new Date('2024-10-05'),
    difficulty: 'beginner',
    tags: ['files', 'delete', 'recursive'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  // Process Management Basics
  {
    id: 'basic-9',
    category: 'monitoring',
    command: 'ps aux',
    description: 'List all running processes',
    example: 'ps aux | grep node',
    output: 'Shows all processes with CPU, memory usage',
    dateLearned: new Date('2024-10-06'),
    difficulty: 'beginner',
    tags: ['processes', 'monitoring', 'basics'],
    relatedTo: 'monitoring',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-10',
    category: 'monitoring',
    command: 'kill PID',
    description: 'Kill process by process ID',
    example: 'kill 1234',
    dateLearned: new Date('2024-10-06'),
    difficulty: 'beginner',
    tags: ['processes', 'kill', 'management'],
    relatedTo: 'debugging',
    projectSource: 'Linux Basics'
  },
  // Text Processing
  {
    id: 'basic-11',
    category: 'system',
    command: 'cat filename',
    description: 'Display file contents',
    example: 'cat package.json',
    dateLearned: new Date('2024-10-07'),
    difficulty: 'beginner',
    tags: ['files', 'text', 'display'],
    relatedTo: 'debugging',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-12',
    category: 'system',
    command: 'nano filename',
    description: 'Edit file with nano text editor',
    example: 'nano .env.local',
    dateLearned: new Date('2024-10-08'),
    difficulty: 'beginner',
    tags: ['editor', 'text', 'configuration'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-13',
    category: 'system',
    command: 'grep "pattern" filename',
    description: 'Search for text pattern in files',
    example: 'grep "error" /var/log/nginx/error.log',
    dateLearned: new Date('2024-10-09'),
    difficulty: 'beginner',
    tags: ['search', 'text', 'debugging'],
    relatedTo: 'debugging',
    projectSource: 'Linux Basics'
  },
  // Basic System Info
  {
    id: 'basic-14',
    category: 'monitoring',
    command: 'whoami',
    description: 'Display current username',
    example: 'whoami',
    output: 'forexuser',
    dateLearned: new Date('2024-10-10'),
    difficulty: 'beginner',
    tags: ['system', 'user', 'info'],
    relatedTo: 'deployment',
    projectSource: 'Linux Basics'
  },
  {
    id: 'basic-15',
    category: 'system',
    command: 'which command',
    description: 'Find location of command executable',
    example: 'which node',
    output: '/usr/bin/node',
    dateLearned: new Date('2024-10-10'),
    difficulty: 'beginner',
    tags: ['system', 'path', 'commands'],
    relatedTo: 'debugging',
    projectSource: 'Linux Basics'
  }
];

// Additional MT5 VPS troubleshooting commands
const mt5TroubleshootingCommands: Command[] = [
  {
    id: 'mt5-1',
    category: 'system',
    command: 'wget https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe',
    description: 'Download MT5 installer from official source',
    example: 'wget https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe',
    dateLearned: new Date('2024-11-18'),
    difficulty: 'beginner',
    tags: ['download', 'mt5', 'installer'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'MT5 VPS Installation.md'
  },
  {
    id: 'mt5-2',
    category: 'wine',
    command: 'wine reg add "HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion" /v CurrentVersion /t REG_SZ /d "10.0" /f',
    description: 'Configure Wine to emulate Windows 10',
    example: 'wine reg add "HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion" /v CurrentVersion /t REG_SZ /d "10.0" /f',
    dateLearned: new Date('2024-11-19'),
    difficulty: 'advanced',
    tags: ['wine', 'registry', 'windows-emulation'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'MT5 VPS Installation.md'
  },
  {
    id: 'mt5-3',
    category: 'wine',
    command: 'wineserver -k',
    description: 'Stop Wine server and terminate all Wine processes',
    example: 'wineserver -k',
    dateLearned: new Date('2024-11-20'),
    difficulty: 'intermediate',
    tags: ['wine', 'server', 'kill'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'MT5 VPS Installation.md'
  },
  {
    id: 'mt5-4',
    category: 'system',
    command: 'pkill -f wine',
    description: 'Kill all processes containing "wine" in command line',
    example: 'pkill -f wine',
    dateLearned: new Date('2024-11-20'),
    difficulty: 'intermediate',
    tags: ['processes', 'kill', 'wine'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'MT5 VPS Installation.md'
  },
  {
    id: 'mt5-5',
    category: 'wine',
    command: 'rm -rf /home/forexuser/.cache/winetricks',
    description: 'Clear Winetricks cache to fix dependency issues',
    example: 'rm -rf /home/forexuser/.cache/winetricks',
    dateLearned: new Date('2024-11-21'),
    difficulty: 'intermediate',
    tags: ['winetricks', 'cache', 'cleanup'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'MT5 VPS Installation.md'
  },
  {
    id: 'mt5-6',
    category: 'vnc',
    command: 'xwininfo -root -tree',
    description: 'Display X11 window tree and hierarchy',
    example: 'DISPLAY=:1 xwininfo -root -tree',
    dateLearned: new Date('2024-11-22'),
    difficulty: 'advanced',
    tags: ['x11', 'windows', 'debugging'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'MT5 VPS Installation.md'
  },
  {
    id: 'mt5-7',
    category: 'system',
    command: 'export DISPLAY=:1',
    description: 'Set display environment variable for X11 applications',
    example: 'export DISPLAY=:1',
    dateLearned: new Date('2024-11-23'),
    difficulty: 'intermediate',
    tags: ['environment', 'display', 'x11'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'MT5 VPS Installation.md'
  },
  {
    id: 'mt5-8',
    category: 'monitoring',
    command: 'xset q',
    description: 'Query X server settings and verify display connection',
    example: 'DISPLAY=:1 xset q',
    output: 'Shows X server configuration and accessibility',
    dateLearned: new Date('2024-11-24'),
    difficulty: 'intermediate',
    tags: ['x11', 'display', 'verification'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'MT5 VPS Installation.md'
  }
];

export const fxPlatformDeploymentCommands: Command[] = [
  // SSH & Remote Access
  {
    id: 'fx-ssh-1',
    category: 'ssh',
    command: 'ssh -p 2222 forexuser@217.154.33.169',
    description: 'Connect to VPS via SSH on custom port',
    example: 'ssh -p 2222 forexuser@217.154.33.169',
    dateLearned: new Date('2024-11-01'),
    difficulty: 'beginner',
    tags: ['ssh', 'vps', 'remote-access'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple deployment files'
  },
  {
    id: 'fx-ssh-2',
    category: 'ssh',
    command: 'ssh -L 5901:localhost:5900 -p 2222 -N forexuser@217.154.33.169 &',
    description: 'Create SSH tunnel for VNC access',
    example: 'ssh -L 5901:localhost:5900 -p 2222 -N forexuser@217.154.33.169 &',
    dateLearned: new Date('2024-11-05'),
    difficulty: 'intermediate',
    tags: ['ssh', 'tunnel', 'vnc', 'port-forwarding'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'SSH Connections & VNC.md'
  },
  {
    id: 'fx-ssh-3',
    category: 'ssh',
    command: 'ssh-keygen -t ed25519 -C "email@example.com"',
    description: 'Generate SSH key for secure access',
    example: 'ssh-keygen -t ed25519 -C "hakim@devhakim.com"',
    dateLearned: new Date('2024-10-28'),
    difficulty: 'beginner',
    tags: ['ssh', 'security', 'authentication'],
    relatedTo: 'security',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },

  // System Setup & Package Installation
  {
    id: 'fx-sys-1',
    category: 'system',
    command: 'apt update && apt upgrade -y',
    description: 'Update system packages',
    example: 'sudo apt update && sudo apt upgrade -y',
    dateLearned: new Date('2024-10-25'),
    difficulty: 'beginner',
    tags: ['apt', 'system-update', 'ubuntu'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },
  {
    id: 'fx-sys-2',
    category: 'system',
    command: 'dpkg --add-architecture i386',
    description: 'Enable 32-bit architecture for Wine',
    example: 'sudo dpkg --add-architecture i386',
    dateLearned: new Date('2024-11-02'),
    difficulty: 'intermediate',
    tags: ['dpkg', 'architecture', 'wine', '32-bit'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },
  {
    id: 'fx-sys-3',
    category: 'system',
    command: 'curl -fsSL https://deb.nodesource.com/setup_18.x | bash -',
    description: 'Add Node.js repository',
    example: 'curl -fsSL https://deb.nodesource.com/setup_18.x | sudo bash -',
    dateLearned: new Date('2024-10-30'),
    difficulty: 'intermediate',
    tags: ['nodejs', 'repository', 'installation'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },

  // Wine & MetaTrader 5
  {
    id: 'fx-wine-1',
    category: 'wine',
    command: 'winecfg',
    description: 'Configure Wine environment',
    example: 'winecfg',
    dateLearned: new Date('2024-11-03'),
    difficulty: 'beginner',
    tags: ['wine', 'configuration', 'windows-emulation'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-wine-2',
    category: 'wine',
    command: 'winetricks corefonts vcrun2019 msxml6 msxml3',
    description: 'Install Windows dependencies for MT5',
    example: 'winetricks corefonts vcrun2019 msxml6 msxml3',
    dateLearned: new Date('2024-11-04'),
    difficulty: 'intermediate',
    tags: ['winetricks', 'dependencies', 'mt5', 'fonts'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },
  {
    id: 'fx-wine-3',
    category: 'wine',
    command: 'DISPLAY=:1 wine ~/.wine/drive_c/Program\\ Files/MetaTrader\\ 5/terminal64.exe',
    description: 'Start MT5 with virtual display',
    example: 'DISPLAY=:1 wine ~/.wine/drive_c/Program\\ Files/MetaTrader\\ 5/terminal64.exe',
    dateLearned: new Date('2024-11-06'),
    difficulty: 'advanced',
    tags: ['wine', 'mt5', 'display', 'terminal'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },

  // PM2 Process Management
  {
    id: 'fx-pm2-1',
    category: 'pm2',
    command: 'pm2 start server.js --name "forexacuity-api"',
    description: 'Start API server with PM2',
    example: 'pm2 start server.js --name "forexacuity-api"',
    dateLearned: new Date('2024-11-10'),
    difficulty: 'intermediate',
    tags: ['pm2', 'process-management', 'api', 'nodejs'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-pm2-2',
    category: 'pm2',
    command: 'pm2 status',
    description: 'Check all PM2 processes',
    example: 'pm2 status',
    output: 'Lists all running processes with status, CPU, memory usage',
    dateLearned: new Date('2024-11-10'),
    difficulty: 'beginner',
    tags: ['pm2', 'monitoring', 'status'],
    relatedTo: 'monitoring',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-pm2-3',
    category: 'pm2',
    command: 'pm2 logs --lines 50',
    description: 'View PM2 logs with 50 lines',
    example: 'pm2 logs --lines 50',
    dateLearned: new Date('2024-11-12'),
    difficulty: 'beginner',
    tags: ['pm2', 'logs', 'debugging'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Progress.md'
  },
  {
    id: 'fx-pm2-4',
    category: 'pm2',
    command: 'pm2 save && pm2 startup',
    description: 'Configure PM2 autostart on boot',
    example: 'pm2 save && pm2 startup',
    dateLearned: new Date('2024-11-15'),
    difficulty: 'intermediate',
    tags: ['pm2', 'autostart', 'boot', 'production'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },

  // Network & Port Diagnostics
  {
    id: 'fx-net-1',
    category: 'network',
    command: 'sudo ss -tlnp | grep :5000',
    description: 'Check what process is using port 5000',
    example: 'sudo ss -tlnp | grep :5000',
    output: 'Shows process details listening on port 5000',
    dateLearned: new Date('2024-11-08'),
    difficulty: 'intermediate',
    tags: ['networking', 'ports', 'debugging', 'ss'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-net-2',
    category: 'network',
    command: 'sudo lsof -i :3001',
    description: 'Check what\'s using port 3001',
    example: 'sudo lsof -i :3001',
    output: 'Lists processes and connections on port 3001',
    dateLearned: new Date('2024-11-08'),
    difficulty: 'intermediate',
    tags: ['lsof', 'ports', 'debugging'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Progress.md'
  },
  {
    id: 'fx-net-3',
    category: 'network',
    command: 'sudo fuser -k 3001/tcp',
    description: 'Kill process using port 3001',
    example: 'sudo fuser -k 3001/tcp',
    dateLearned: new Date('2024-11-09'),
    difficulty: 'intermediate',
    tags: ['fuser', 'kill', 'ports', 'tcp'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Progress.md'
  },

  // SystemD Services
  {
    id: 'fx-sys-4',
    category: 'systemd',
    command: 'systemctl enable x11-virtual',
    description: 'Enable X11 virtual display service',
    example: 'sudo systemctl enable x11-virtual',
    dateLearned: new Date('2024-11-07'),
    difficulty: 'intermediate',
    tags: ['systemctl', 'x11', 'display', 'service'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },
  {
    id: 'fx-sys-5',
    category: 'systemd',
    command: 'journalctl -u mt5 -f',
    description: 'Follow MT5 service logs in real-time',
    example: 'journalctl -u mt5 -f',
    dateLearned: new Date('2024-11-13'),
    difficulty: 'intermediate',
    tags: ['journalctl', 'logs', 'systemd', 'mt5'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },

  // File Transfer & Deployment
  {
    id: 'fx-deploy-1',
    category: 'deployment',
    command: 'rsync -avz --progress --exclude \'node_modules\' --exclude \'.next\' . forexuser@217.154.33.169:/var/www/fx-platform/',
    description: 'Sync project files to VPS excluding build artifacts',
    example: 'rsync -avz --progress --exclude \'node_modules\' --exclude \'.next\' . forexuser@217.154.33.169:/var/www/fx-platform/',
    dateLearned: new Date('2024-11-14'),
    difficulty: 'advanced',
    tags: ['rsync', 'deployment', 'file-sync', 'exclude'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-deploy-2',
    category: 'deployment',
    command: 'scp -P 2222 file.txt forexuser@217.154.33.169:/path/to/destination',
    description: 'Copy single file to VPS via SCP',
    example: 'scp -P 2222 Acuity-Final.mq5 forexuser@217.154.33.169:~/',
    dateLearned: new Date('2024-11-01'),
    difficulty: 'beginner',
    tags: ['scp', 'file-transfer', 'ssh'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },

  // VNC & Display
  {
    id: 'fx-vnc-1',
    category: 'vnc',
    command: 'Xvfb :1 -screen 0 1024x768x24 -ac +extension GLX +render -noreset &',
    description: 'Start virtual X display for headless GUI apps',
    example: 'Xvfb :1 -screen 0 1024x768x24 -ac +extension GLX +render -noreset &',
    dateLearned: new Date('2024-11-05'),
    difficulty: 'advanced',
    tags: ['xvfb', 'x11', 'virtual-display', 'headless'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },
  {
    id: 'fx-vnc-2',
    category: 'vnc',
    command: 'x11vnc -display :1 -nopw -forever -shared -rfbport 5900 &',
    description: 'Start VNC server on virtual display',
    example: 'x11vnc -display :1 -nopw -forever -shared -rfbport 5900 &',
    dateLearned: new Date('2024-11-05'),
    difficulty: 'advanced',
    tags: ['x11vnc', 'vnc', 'remote-desktop', 'display'],
    relatedTo: 'deployment',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-vnc-3',
    category: 'vnc',
    command: 'DISPLAY=:1 xdpyinfo | head -5',
    description: 'Test X11 display connection',
    example: 'DISPLAY=:1 xdpyinfo | head -5',
    output: 'Shows display information if X11 is working',
    dateLearned: new Date('2024-11-06'),
    difficulty: 'intermediate',
    tags: ['xdpyinfo', 'x11', 'testing', 'display'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'SSH Connections & VNC.md'
  },

  // Monitoring & System Info
  {
    id: 'fx-mon-1',
    category: 'monitoring',
    command: 'htop',
    description: 'Interactive process and system monitor',
    example: 'htop',
    dateLearned: new Date('2024-11-11'),
    difficulty: 'beginner',
    tags: ['htop', 'monitoring', 'processes', 'system'],
    relatedTo: 'monitoring',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-mon-2',
    category: 'monitoring',
    command: 'free -h',
    description: 'Display memory usage in human-readable format',
    example: 'free -h',
    output: 'Shows total, used, free, shared, buff/cache memory',
    dateLearned: new Date('2024-11-11'),
    difficulty: 'beginner',
    tags: ['memory', 'monitoring', 'system'],
    relatedTo: 'monitoring',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-mon-3',
    category: 'monitoring',
    command: 'df -h',
    description: 'Display disk usage in human-readable format',
    example: 'df -h',
    output: 'Shows filesystem sizes, used, available space',
    dateLearned: new Date('2024-11-11'),
    difficulty: 'beginner',
    tags: ['disk', 'monitoring', 'filesystem'],
    relatedTo: 'monitoring',
    projectSource: 'ForexAcuity',
    sourceFile: 'Multiple files'
  },
  {
    id: 'fx-mon-4',
    category: 'monitoring',
    command: 'tail -f /var/log/nginx/error.log',
    description: 'Follow Nginx error logs in real-time',
    example: 'tail -f /var/log/nginx/error.log',
    dateLearned: new Date('2024-11-16'),
    difficulty: 'intermediate',
    tags: ['tail', 'logs', 'nginx', 'debugging'],
    relatedTo: 'debugging',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },

  // Security & Firewall
  {
    id: 'fx-sec-1',
    category: 'security',
    command: 'ufw allow 2222/tcp',
    description: 'Allow SSH on custom port through firewall',
    example: 'sudo ufw allow 2222/tcp',
    dateLearned: new Date('2024-10-29'),
    difficulty: 'beginner',
    tags: ['ufw', 'firewall', 'ssh', 'security'],
    relatedTo: 'security',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },
  {
    id: 'fx-sec-2',
    category: 'security',
    command: 'ufw allow 80/tcp && ufw allow 443/tcp',
    description: 'Allow HTTP and HTTPS through firewall',
    example: 'sudo ufw allow 80/tcp && sudo ufw allow 443/tcp',
    dateLearned: new Date('2024-10-29'),
    difficulty: 'beginner',
    tags: ['ufw', 'firewall', 'http', 'https'],
    relatedTo: 'security',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  },
  {
    id: 'fx-sec-3',
    category: 'security',
    command: 'certbot --nginx -d forexacuity.co.uk -d www.forexacuity.co.uk',
    description: 'Install SSL certificates with Certbot',
    example: 'sudo certbot --nginx -d forexacuity.co.uk -d www.forexacuity.co.uk',
    dateLearned: new Date('2024-11-17'),
    difficulty: 'intermediate',
    tags: ['certbot', 'ssl', 'https', 'nginx'],
    relatedTo: 'security',
    projectSource: 'ForexAcuity',
    sourceFile: 'IONOS-Deployment-Complete.md'
  }
];

// Git commands for version control and collaboration
const gitCommands: Command[] = [
  {
    id: 'git-1',
    category: 'git',
    command: 'git init',
    description: 'Initialize a new Git repository',
    example: 'git init',
    dateLearned: new Date('2024-09-01'),
    difficulty: 'beginner',
    tags: ['git', 'initialization', 'version-control'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-2',
    category: 'git',
    command: 'git clone <repository-url>',
    description: 'Clone a remote repository to local machine',
    example: 'git clone https://github.com/user/repo.git',
    dateLearned: new Date('2024-09-01'),
    difficulty: 'beginner',
    tags: ['git', 'clone', 'remote'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-3',
    category: 'git',
    command: 'git status',
    description: 'Show the working directory status',
    example: 'git status',
    output: 'Shows modified, staged, and untracked files',
    dateLearned: new Date('2024-09-02'),
    difficulty: 'beginner',
    tags: ['git', 'status', 'working-directory'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-4',
    category: 'git',
    command: 'git add .',
    description: 'Stage all changes for commit',
    example: 'git add .',
    dateLearned: new Date('2024-09-02'),
    difficulty: 'beginner',
    tags: ['git', 'staging', 'add'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-5',
    category: 'git',
    command: 'git commit -m "message"',
    description: 'Commit staged changes with a message',
    example: 'git commit -m "Add user authentication feature"',
    dateLearned: new Date('2024-09-02'),
    difficulty: 'beginner',
    tags: ['git', 'commit', 'message'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-6',
    category: 'git',
    command: 'git push origin main',
    description: 'Push commits to remote repository',
    example: 'git push origin main',
    dateLearned: new Date('2024-09-03'),
    difficulty: 'beginner',
    tags: ['git', 'push', 'remote'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-7',
    category: 'git',
    command: 'git pull origin main',
    description: 'Pull latest changes from remote repository',
    example: 'git pull origin main',
    dateLearned: new Date('2024-09-03'),
    difficulty: 'beginner',
    tags: ['git', 'pull', 'sync'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-8',
    category: 'git',
    command: 'git branch',
    description: 'List all branches or create new branch',
    example: 'git branch feature/new-feature',
    dateLearned: new Date('2024-09-05'),
    difficulty: 'intermediate',
    tags: ['git', 'branches', 'workflow'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-9',
    category: 'git',
    command: 'git checkout -b branch-name',
    description: 'Create and switch to new branch',
    example: 'git checkout -b feature/user-profile',
    dateLearned: new Date('2024-09-05'),
    difficulty: 'intermediate',
    tags: ['git', 'checkout', 'branch-creation'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-10',
    category: 'git',
    command: 'git merge branch-name',
    description: 'Merge specified branch into current branch',
    example: 'git merge feature/user-authentication',
    dateLearned: new Date('2024-09-08'),
    difficulty: 'intermediate',
    tags: ['git', 'merge', 'integration'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-11',
    category: 'git',
    command: 'git stash',
    description: 'Temporarily save uncommitted changes',
    example: 'git stash save "work in progress"',
    dateLearned: new Date('2024-09-10'),
    difficulty: 'intermediate',
    tags: ['git', 'stash', 'temporary'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'git-12',
    category: 'git',
    command: 'git reset --hard HEAD~1',
    description: 'Reset to previous commit and discard changes',
    example: 'git reset --hard HEAD~1',
    dateLearned: new Date('2024-09-15'),
    difficulty: 'advanced',
    tags: ['git', 'reset', 'destructive'],
    relatedTo: 'debugging',
    projectSource: 'DevFundamentals'
  }
];

// NPM commands for package management
const npmCommands: Command[] = [
  {
    id: 'npm-1',
    category: 'npm',
    command: 'npm init',
    description: 'Initialize a new npm project',
    example: 'npm init -y',
    dateLearned: new Date('2024-09-01'),
    difficulty: 'beginner',
    tags: ['npm', 'initialization', 'package'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-2',
    category: 'npm',
    command: 'npm install',
    description: 'Install all dependencies from package.json',
    example: 'npm install',
    dateLearned: new Date('2024-09-01'),
    difficulty: 'beginner',
    tags: ['npm', 'install', 'dependencies'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-3',
    category: 'npm',
    command: 'npm install package-name',
    description: 'Install a specific package',
    example: 'npm install express',
    dateLearned: new Date('2024-09-02'),
    difficulty: 'beginner',
    tags: ['npm', 'install', 'package'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-4',
    category: 'npm',
    command: 'npm install --save-dev package-name',
    description: 'Install package as development dependency',
    example: 'npm install --save-dev nodemon',
    dateLearned: new Date('2024-09-03'),
    difficulty: 'intermediate',
    tags: ['npm', 'dev-dependencies', 'development'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-5',
    category: 'npm',
    command: 'npm run script-name',
    description: 'Run npm script defined in package.json',
    example: 'npm run dev',
    dateLearned: new Date('2024-09-04'),
    difficulty: 'beginner',
    tags: ['npm', 'scripts', 'automation'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-6',
    category: 'npm',
    command: 'npm list',
    description: 'List installed packages and their versions',
    example: 'npm list --depth=0',
    dateLearned: new Date('2024-09-05'),
    difficulty: 'beginner',
    tags: ['npm', 'list', 'packages'],
    relatedTo: 'debugging',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-7',
    category: 'npm',
    command: 'npm update',
    description: 'Update all packages to latest versions',
    example: 'npm update',
    dateLearned: new Date('2024-09-08'),
    difficulty: 'intermediate',
    tags: ['npm', 'update', 'maintenance'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-8',
    category: 'npm',
    command: 'npm audit',
    description: 'Check for security vulnerabilities',
    example: 'npm audit --audit-level moderate',
    dateLearned: new Date('2024-09-10'),
    difficulty: 'intermediate',
    tags: ['npm', 'security', 'audit'],
    relatedTo: 'security',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-9',
    category: 'npm',
    command: 'npm cache clean --force',
    description: 'Clear npm cache to fix installation issues',
    example: 'npm cache clean --force',
    dateLearned: new Date('2024-09-12'),
    difficulty: 'intermediate',
    tags: ['npm', 'cache', 'troubleshooting'],
    relatedTo: 'debugging',
    projectSource: 'DevFundamentals'
  },
  {
    id: 'npm-10',
    category: 'npm',
    command: 'npx command',
    description: 'Execute package without installing globally',
    example: 'npx create-react-app my-app',
    dateLearned: new Date('2024-09-15'),
    difficulty: 'intermediate',
    tags: ['npx', 'execution', 'packages'],
    relatedTo: 'development',
    projectSource: 'DevFundamentals'
  }
];

// Python commands for development and scripting
const pythonCommands: Command[] = [
  {
    id: 'py-1',
    category: 'python',
    command: 'python --version',
    description: 'Check Python version',
    example: 'python --version',
    output: 'Python 3.11.5',
    dateLearned: new Date('2024-08-01'),
    difficulty: 'beginner',
    tags: ['python', 'version', 'info'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-2',
    category: 'python',
    command: 'pip install package-name',
    description: 'Install Python package using pip',
    example: 'pip install requests',
    dateLearned: new Date('2024-08-02'),
    difficulty: 'beginner',
    tags: ['pip', 'install', 'packages'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-3',
    category: 'python',
    command: 'pip freeze > requirements.txt',
    description: 'Export installed packages to requirements file',
    example: 'pip freeze > requirements.txt',
    dateLearned: new Date('2024-08-03'),
    difficulty: 'intermediate',
    tags: ['pip', 'requirements', 'export'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-4',
    category: 'python',
    command: 'python -m venv venv',
    description: 'Create virtual environment',
    example: 'python -m venv venv',
    dateLearned: new Date('2024-08-05'),
    difficulty: 'intermediate',
    tags: ['venv', 'virtual-environment', 'isolation'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-5',
    category: 'python',
    command: 'source venv/bin/activate',
    description: 'Activate virtual environment on Unix/macOS',
    example: 'source venv/bin/activate',
    dateLearned: new Date('2024-08-05'),
    difficulty: 'intermediate',
    tags: ['venv', 'activation', 'environment'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-6',
    category: 'python',
    command: 'python script.py',
    description: 'Run Python script',
    example: 'python app.py',
    dateLearned: new Date('2024-08-01'),
    difficulty: 'beginner',
    tags: ['python', 'execution', 'script'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-7',
    category: 'python',
    command: 'python -m http.server 8000',
    description: 'Start simple HTTP server',
    example: 'python -m http.server 8000',
    dateLearned: new Date('2024-08-10'),
    difficulty: 'intermediate',
    tags: ['http', 'server', 'development'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-8',
    category: 'python',
    command: 'pytest',
    description: 'Run Python tests with pytest',
    example: 'pytest tests/',
    dateLearned: new Date('2024-08-15'),
    difficulty: 'intermediate',
    tags: ['testing', 'pytest', 'quality'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-9',
    category: 'python',
    command: 'python -m pip install --upgrade pip',
    description: 'Upgrade pip to latest version',
    example: 'python -m pip install --upgrade pip',
    dateLearned: new Date('2024-08-12'),
    difficulty: 'intermediate',
    tags: ['pip', 'upgrade', 'maintenance'],
    relatedTo: 'development',
    projectSource: 'Python Learning'
  },
  {
    id: 'py-10',
    category: 'python',
    command: 'python -c "import sys; print(sys.path)"',
    description: 'Check Python path configuration',
    example: 'python -c "import sys; print(sys.path)"',
    dateLearned: new Date('2024-08-20'),
    difficulty: 'advanced',
    tags: ['python', 'path', 'debugging'],
    relatedTo: 'debugging',
    projectSource: 'Python Learning'
  }
];

// Docker commands for containerization
const dockerCommands: Command[] = [
  {
    id: 'docker-1',
    category: 'docker',
    command: 'docker --version',
    description: 'Check Docker version',
    example: 'docker --version',
    output: 'Docker version 20.10.17',
    dateLearned: new Date('2024-10-01'),
    difficulty: 'beginner',
    tags: ['docker', 'version', 'info'],
    relatedTo: 'devops',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-2',
    category: 'docker',
    command: 'docker run hello-world',
    description: 'Run a test container to verify Docker installation',
    example: 'docker run hello-world',
    dateLearned: new Date('2024-10-01'),
    difficulty: 'beginner',
    tags: ['docker', 'run', 'test'],
    relatedTo: 'devops',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-3',
    category: 'docker',
    command: 'docker build -t image-name .',
    description: 'Build Docker image from Dockerfile',
    example: 'docker build -t my-app .',
    dateLearned: new Date('2024-10-03'),
    difficulty: 'intermediate',
    tags: ['docker', 'build', 'image'],
    relatedTo: 'devops',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-4',
    category: 'docker',
    command: 'docker run -p 3000:3000 image-name',
    description: 'Run container with port mapping',
    example: 'docker run -p 3000:3000 my-app',
    dateLearned: new Date('2024-10-04'),
    difficulty: 'intermediate',
    tags: ['docker', 'run', 'ports'],
    relatedTo: 'devops',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-5',
    category: 'docker',
    command: 'docker ps',
    description: 'List running containers',
    example: 'docker ps',
    output: 'Shows container ID, image, status, ports',
    dateLearned: new Date('2024-10-05'),
    difficulty: 'beginner',
    tags: ['docker', 'list', 'containers'],
    relatedTo: 'monitoring',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-6',
    category: 'docker',
    command: 'docker stop container-id',
    description: 'Stop running container',
    example: 'docker stop abc123def456',
    dateLearned: new Date('2024-10-06'),
    difficulty: 'beginner',
    tags: ['docker', 'stop', 'management'],
    relatedTo: 'devops',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-7',
    category: 'docker',
    command: 'docker exec -it container-id bash',
    description: 'Execute interactive bash in running container',
    example: 'docker exec -it abc123def456 bash',
    dateLearned: new Date('2024-10-08'),
    difficulty: 'intermediate',
    tags: ['docker', 'exec', 'interactive'],
    relatedTo: 'debugging',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-8',
    category: 'docker',
    command: 'docker-compose up -d',
    description: 'Start services defined in docker-compose.yml in background',
    example: 'docker-compose up -d',
    dateLearned: new Date('2024-10-10'),
    difficulty: 'intermediate',
    tags: ['docker-compose', 'services', 'detached'],
    relatedTo: 'devops',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-9',
    category: 'docker',
    command: 'docker logs container-id',
    description: 'View container logs',
    example: 'docker logs abc123def456',
    dateLearned: new Date('2024-10-12'),
    difficulty: 'beginner',
    tags: ['docker', 'logs', 'debugging'],
    relatedTo: 'debugging',
    projectSource: 'Docker Learning'
  },
  {
    id: 'docker-10',
    category: 'docker',
    command: 'docker system prune -a',
    description: 'Remove all unused containers, images, and networks',
    example: 'docker system prune -a',
    dateLearned: new Date('2024-10-15'),
    difficulty: 'intermediate',
    tags: ['docker', 'cleanup', 'maintenance'],
    relatedTo: 'devops',
    projectSource: 'Docker Learning'
  }
];

// Nginx commands for web server management
const nginxCommands: Command[] = [
  {
    id: 'nginx-1',
    category: 'nginx',
    command: 'nginx -t',
    description: 'Test Nginx configuration syntax',
    example: 'sudo nginx -t',
    output: 'nginx: configuration file /etc/nginx/nginx.conf test is successful',
    dateLearned: new Date('2024-11-01'),
    difficulty: 'beginner',
    tags: ['nginx', 'test', 'configuration'],
    relatedTo: 'deployment',
    projectSource: 'Web Server Setup'
  },
  {
    id: 'nginx-2',
    category: 'nginx',
    command: 'systemctl reload nginx',
    description: 'Reload Nginx configuration without stopping',
    example: 'sudo systemctl reload nginx',
    dateLearned: new Date('2024-11-02'),
    difficulty: 'beginner',
    tags: ['nginx', 'reload', 'configuration'],
    relatedTo: 'deployment',
    projectSource: 'Web Server Setup'
  },
  {
    id: 'nginx-3',
    category: 'nginx',
    command: 'systemctl status nginx',
    description: 'Check Nginx service status',
    example: 'sudo systemctl status nginx',
    output: 'Active: active (running) since...',
    dateLearned: new Date('2024-11-03'),
    difficulty: 'beginner',
    tags: ['nginx', 'status', 'service'],
    relatedTo: 'monitoring',
    projectSource: 'Web Server Setup'
  },
  {
    id: 'nginx-4',
    category: 'nginx',
    command: 'tail -f /var/log/nginx/access.log',
    description: 'Follow Nginx access logs in real-time',
    example: 'tail -f /var/log/nginx/access.log',
    dateLearned: new Date('2024-11-04'),
    difficulty: 'intermediate',
    tags: ['nginx', 'logs', 'monitoring'],
    relatedTo: 'debugging',
    projectSource: 'Web Server Setup'
  },
  {
    id: 'nginx-5',
    category: 'nginx',
    command: 'nginx -s reload',
    description: 'Send reload signal to Nginx master process',
    example: 'sudo nginx -s reload',
    dateLearned: new Date('2024-11-05'),
    difficulty: 'intermediate',
    tags: ['nginx', 'signal', 'reload'],
    relatedTo: 'deployment',
    projectSource: 'Web Server Setup'
  }
];

// Database commands for data management
const databaseCommands: Command[] = [
  {
    id: 'db-1',
    category: 'database',
    command: 'psql -U username -d database',
    description: 'Connect to PostgreSQL database',
    example: 'psql -U postgres -d myapp',
    dateLearned: new Date('2024-09-01'),
    difficulty: 'beginner',
    tags: ['postgresql', 'connect', 'database'],
    relatedTo: 'development',
    projectSource: 'Database Learning'
  },
  {
    id: 'db-2',
    category: 'database',
    command: 'mysqldump -u username -p database > backup.sql',
    description: 'Create MySQL database backup',
    example: 'mysqldump -u root -p myapp > backup.sql',
    dateLearned: new Date('2024-09-05'),
    difficulty: 'intermediate',
    tags: ['mysql', 'backup', 'export'],
    relatedTo: 'deployment',
    projectSource: 'Database Learning'
  },
  {
    id: 'db-3',
    category: 'database',
    command: 'redis-cli',
    description: 'Connect to Redis server',
    example: 'redis-cli',
    dateLearned: new Date('2024-09-10'),
    difficulty: 'beginner',
    tags: ['redis', 'cli', 'cache'],
    relatedTo: 'development',
    projectSource: 'Database Learning'
  },
  {
    id: 'db-4',
    category: 'database',
    command: 'mongo',
    description: 'Connect to MongoDB shell',
    example: 'mongo mongodb://localhost:27017/myapp',
    dateLearned: new Date('2024-09-15'),
    difficulty: 'beginner',
    tags: ['mongodb', 'shell', 'nosql'],
    relatedTo: 'development',
    projectSource: 'Database Learning'
  },
  {
    id: 'db-5',
    category: 'database',
    command: 'pg_dump database > backup.sql',
    description: 'Create PostgreSQL database backup',
    example: 'pg_dump myapp > backup.sql',
    dateLearned: new Date('2024-09-20'),
    difficulty: 'intermediate',
    tags: ['postgresql', 'backup', 'dump'],
    relatedTo: 'deployment',
    projectSource: 'Database Learning'
  }
];

// Combine all commands in learning progression order
export const allCommands: Command[] = [
  ...basicLinuxCommands,
  ...gitCommands,
  ...npmCommands,
  ...pythonCommands,
  ...dockerCommands,
  ...nginxCommands,
  ...databaseCommands,
  ...fxPlatformDeploymentCommands,
  ...mt5TroubleshootingCommands
];

// Group commands by complexity for learning progression
export const commandsByComplexity = {
  beginner: allCommands.filter(cmd => cmd.difficulty === 'beginner'),
  intermediate: allCommands.filter(cmd => cmd.difficulty === 'intermediate'),
  advanced: allCommands.filter(cmd => cmd.difficulty === 'advanced')
};

// Learning progression paths showing command dependencies
export const learningProgression = {
  'Development Fundamentals': {
    order: 1,
    commands: [...gitCommands, ...npmCommands],
    description: 'Essential version control and package management',
    prerequisites: []
  },
  'Linux Basics': {
    order: 2,
    commands: basicLinuxCommands,
    description: 'Essential Linux commands every developer should know',
    prerequisites: ['Development Fundamentals']
  },
  'Programming Languages': {
    order: 3,
    commands: pythonCommands,
    description: 'Python development and scripting essentials',
    prerequisites: ['Linux Basics']
  },
  'Database Management': {
    order: 4,
    commands: databaseCommands,
    description: 'Working with different database systems',
    prerequisites: ['Programming Languages']
  },
  'Containerization': {
    order: 5,
    commands: dockerCommands,
    description: 'Docker and container management',
    prerequisites: ['Database Management']
  },
  'Web Server Management': {
    order: 6,
    commands: nginxCommands,
    description: 'Nginx configuration and management',
    prerequisites: ['Containerization']
  },
  'SSH & Remote Access': {
    order: 7,
    commands: allCommands.filter(cmd => cmd.category === 'ssh'),
    description: 'Secure remote server access and tunneling',
    prerequisites: ['Web Server Management']
  },
  'System Administration': {
    order: 8,
    commands: allCommands.filter(cmd => cmd.category === 'system' && cmd.projectSource !== 'Linux Basics'),
    description: 'Server setup, package management, and configuration',
    prerequisites: ['SSH & Remote Access']
  },
  'Process Management': {
    order: 9,
    commands: allCommands.filter(cmd => cmd.category === 'pm2' || (cmd.category === 'monitoring' && cmd.tags.includes('processes'))),
    description: 'Managing application processes in production',
    prerequisites: ['System Administration']
  },
  'Network Diagnostics': {
    order: 10,
    commands: allCommands.filter(cmd => cmd.category === 'network'),
    description: 'Debugging network and port issues',
    prerequisites: ['Process Management']
  },
  'Advanced Deployment': {
    order: 11,
    commands: [...allCommands.filter(cmd => cmd.category === 'deployment'), ...allCommands.filter(cmd => cmd.category === 'wine'), ...allCommands.filter(cmd => cmd.category === 'vnc')],
    description: 'Complex deployments including Wine/MT5 integration',
    prerequisites: ['Network Diagnostics']
  }
};

// Group by category for organization
export const commandsByCategory = {
  git: allCommands.filter(cmd => cmd.category === 'git'),
  npm: allCommands.filter(cmd => cmd.category === 'npm'),
  python: allCommands.filter(cmd => cmd.category === 'python'),
  docker: allCommands.filter(cmd => cmd.category === 'docker'),
  nginx: allCommands.filter(cmd => cmd.category === 'nginx'),
  database: allCommands.filter(cmd => cmd.category === 'database'),
  ssh: allCommands.filter(cmd => cmd.category === 'ssh'),
  system: allCommands.filter(cmd => cmd.category === 'system'),
  wine: allCommands.filter(cmd => cmd.category === 'wine'),
  pm2: allCommands.filter(cmd => cmd.category === 'pm2'),
  network: allCommands.filter(cmd => cmd.category === 'network'),
  systemd: allCommands.filter(cmd => cmd.category === 'systemd'),
  deployment: allCommands.filter(cmd => cmd.category === 'deployment'),
  vnc: allCommands.filter(cmd => cmd.category === 'vnc'),
  monitoring: allCommands.filter(cmd => cmd.category === 'monitoring'),
  security: allCommands.filter(cmd => cmd.category === 'security')
};