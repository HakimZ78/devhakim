INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Print working directory (show current location)', 'Print working directory (show current location)', 'pwd', 'system', 'Linux Basics', '{"navigation","basics","directory"}', 1);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('List all files and directories with detailed info', 'List all files and directories with detailed info', 'ls -la', 'system', 'Linux Basics', '{"navigation","files","listing"}', 2);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Change directory to specified path', 'Change directory to specified path', 'cd /path/to/directory', 'system', 'Linux Basics', '{"navigation","directory","basics"}', 3);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Create directory and parent directories if needed', 'Create directory and parent directories if needed', 'mkdir -p /path/to/directory', 'system', 'Linux Basics', '{"files","directory","creation"}', 4);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Make file executable', 'Make file executable', 'chmod +x filename', 'system', 'Linux Basics', '{"permissions","files","executable"}', 5);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Copy files or directories', 'Copy files or directories', 'cp source destination', 'system', 'Linux Basics', '{"files","copy","basics"}', 6);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Move or rename files and directories', 'Move or rename files and directories', 'mv source destination', 'system', 'Linux Basics', '{"files","move","rename"}', 7);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Remove files and directories recursively', 'Remove files and directories recursively', 'rm -rf directory', 'system', 'Linux Basics', '{"files","delete","recursive"}', 8);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('List all running processes', 'List all running processes', 'ps aux', 'monitoring', 'Linux Basics', '{"processes","monitoring","basics"}', 9);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Kill process by process ID', 'Kill process by process ID', 'kill PID', 'monitoring', 'Linux Basics', '{"processes","kill","management"}', 10);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Display file contents', 'Display file contents', 'cat filename', 'system', 'Linux Basics', '{"files","text","display"}', 11);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Edit file with nano text editor', 'Edit file with nano text editor', 'nano filename', 'system', 'Linux Basics', '{"editor","text","configuration"}', 12);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Search for text pattern in files', 'Search for text pattern in files', 'grep "pattern" filename', 'system', 'Linux Basics', '{"search","text","debugging"}', 13);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Display current username', 'Display current username', 'whoami', 'monitoring', 'Linux Basics', '{"system","user","info"}', 14);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Find location of command executable', 'Find location of command executable', 'which command', 'system', 'Linux Basics', '{"system","path","commands"}', 15);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Download MetaTrader 5 installer from official source', 'Download MetaTrader 5 installer from official source', 'wget https://download.mql5.com/cdn/web/metaquotes.software.corp/mt5/mt5setup.exe', 'system', 'ForexAcuity', '{"download","mt5","installer"}', 16);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Configure Wine to emulate Windows 10', 'Configure Wine to emulate Windows 10', 'wine reg add "HKEY_LOCAL_MACHINE\\Software\\Microsoft\\Windows NT\\CurrentVersion" /v CurrentVersion /t REG_SZ /d "10.0" /f', 'wine', 'ForexAcuity', '{"wine","registry","windows-emulation"}', 17);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Stop Wine server and terminate all Wine processes', 'Stop Wine server and terminate all Wine processes', 'wineserver -k', 'wine', 'ForexAcuity', '{"wine","server","kill"}', 18);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Kill all processes containing "wine" in command line', 'Kill all processes containing "wine" in command line', 'pkill -f wine', 'system', 'ForexAcuity', '{"processes","kill","wine"}', 19);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Clear Winetricks cache to fix dependency issues', 'Clear Winetricks cache to fix dependency issues', 'rm -rf /home/username/.cache/winetricks', 'wine', 'ForexAcuity', '{"winetricks","cache","cleanup"}', 20);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Display X11 window tree and hierarchy', 'Display X11 window tree and hierarchy', 'xwininfo -root -tree', 'vnc', 'ForexAcuity', '{"x11","windows","debugging"}', 21);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Set display environment variable for X11 applications', 'Set display environment variable for X11 applications', 'export DISPLAY=:1', 'system', 'ForexAcuity', '{"environment","display","x11"}', 22);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Query X server settings and verify display connection', 'Query X server settings and verify display connection', 'xset q', 'monitoring', 'ForexAcuity', '{"x11","display","verification"}', 23);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Connect to VPS via SSH on custom port', 'Connect to VPS via SSH on custom port', 'ssh -p 2222 username@YOUR_SERVER_IP', 'ssh', 'ForexAcuity', '{"ssh","vps","remote-access"}', 24);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Create SSH tunnel for VNC access', 'Create SSH tunnel for VNC access', 'ssh -L 5901:localhost:5900 -p 2222 -N username@YOUR_SERVER_IP &', 'ssh', 'ForexAcuity', '{"ssh","tunnel","vnc","port-forwarding"}', 25);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Generate SSH key for secure access', 'Generate SSH key for secure access', 'ssh-keygen -t ed25519 -C "your-email@example.com"', 'ssh', 'ForexAcuity', '{"ssh","security","authentication"}', 26);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Update system packages', 'Update system packages', 'apt update && apt upgrade -y', 'system', 'ForexAcuity', '{"apt","system-update","ubuntu"}', 27);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Enable 32-bit architecture for Wine', 'Enable 32-bit architecture for Wine', 'dpkg --add-architecture i386', 'system', 'ForexAcuity', '{"dpkg","architecture","wine","32-bit"}', 28);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Add Node.js repository', 'Add Node.js repository', 'curl -fsSL https://deb.nodesource.com/setup_18.x | bash -', 'system', 'ForexAcuity', '{"nodejs","repository","installation"}', 29);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Configure Wine environment', 'Configure Wine environment', 'winecfg', 'wine', 'ForexAcuity', '{"wine","configuration","windows-emulation"}', 30);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Install Windows dependencies for MetaTrader 5', 'Install Windows dependencies for MetaTrader 5', 'winetricks corefonts vcrun2019 msxml6 msxml3', 'wine', 'ForexAcuity', '{"winetricks","dependencies","mt5","fonts"}', 31);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Start MetaTrader 5 with virtual display', 'Start MetaTrader 5 with virtual display', 'DISPLAY=:1 wine ~/.wine/drive_c/Program\\ Files/MetaTrader\\ 5/terminal64.exe', 'wine', 'ForexAcuity', '{"wine","mt5","display","terminal"}', 32);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Start API server with PM2', 'Start API server with PM2', 'pm2 start server.js --name "api-server"', 'pm2', 'ForexAcuity', '{"pm2","process-management","api","nodejs"}', 33);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Check all PM2 processes', 'Check all PM2 processes', 'pm2 status', 'pm2', 'ForexAcuity', '{"pm2","monitoring","status"}', 34);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('View PM2 logs with 50 lines', 'View PM2 logs with 50 lines', 'pm2 logs --lines 50', 'pm2', 'ForexAcuity', '{"pm2","logs","debugging"}', 35);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Configure PM2 autostart on boot', 'Configure PM2 autostart on boot', 'pm2 save && pm2 startup', 'pm2', 'ForexAcuity', '{"pm2","autostart","boot","production"}', 36);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Check what process is using port 5000', 'Check what process is using port 5000', 'sudo ss -tlnp | grep :5000', 'network', 'ForexAcuity', '{"networking","ports","debugging","ss"}', 37);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Check what is using port 3001', 'Check what is using port 3001', 'sudo lsof -i :3001', 'network', 'ForexAcuity', '{"lsof","ports","debugging"}', 38);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Kill process using port 3001', 'Kill process using port 3001', 'sudo fuser -k 3001/tcp', 'network', 'ForexAcuity', '{"fuser","kill","ports","tcp"}', 39);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Enable X11 virtual display service', 'Enable X11 virtual display service', 'systemctl enable x11-virtual', 'systemd', 'ForexAcuity', '{"systemctl","x11","display","service"}', 40);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Follow MetaTrader 5 service logs in real-time', 'Follow MetaTrader 5 service logs in real-time', 'journalctl -u mt5 -f', 'systemd', 'ForexAcuity', '{"journalctl","logs","systemd","mt5"}', 41);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Sync project files to VPS excluding build artifacts', 'Sync project files to VPS excluding build artifacts', 'rsync -avz --progress --exclude ''node_modules'' --exclude ''.next'' . username@YOUR_SERVER_IP:/var/www/fx-platform/', 'deployment', 'ForexAcuity', '{"rsync","deployment","file-sync","exclude"}', 42);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Copy single file to VPS via SCP', 'Copy single file to VPS via SCP', 'scp -P 2222 file.txt username@YOUR_SERVER_IP:/path/to/destination', 'deployment', 'ForexAcuity', '{"scp","file-transfer","ssh"}', 43);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Start virtual X display for headless GUI apps', 'Start virtual X display for headless GUI apps', 'Xvfb :1 -screen 0 1024x768x24 -ac +extension GLX +render -noreset &', 'vnc', 'ForexAcuity', '{"xvfb","x11","virtual-display","headless"}', 44);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Start VNC server on virtual display', 'Start VNC server on virtual display', 'x11vnc -display :1 -nopw -forever -shared -rfbport 5900 &', 'vnc', 'ForexAcuity', '{"x11vnc","vnc","remote-desktop","display"}', 45);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Test X11 display connection', 'Test X11 display connection', 'DISPLAY=:1 xdpyinfo | head -5', 'vnc', 'ForexAcuity', '{"xdpyinfo","x11","testing","display"}', 46);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Interactive process and system monitor', 'Interactive process and system monitor', 'htop', 'monitoring', 'ForexAcuity', '{"htop","monitoring","processes","system"}', 47);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Display memory usage in human-readable format', 'Display memory usage in human-readable format', 'free -h', 'monitoring', 'ForexAcuity', '{"memory","monitoring","system"}', 48);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Display disk usage in human-readable format', 'Display disk usage in human-readable format', 'df -h', 'monitoring', 'ForexAcuity', '{"disk","monitoring","filesystem"}', 49);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Follow Nginx error logs in real-time', 'Follow Nginx error logs in real-time', 'tail -f /var/log/nginx/error.log', 'monitoring', 'ForexAcuity', '{"tail","logs","nginx","debugging"}', 50);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Allow SSH on custom port through firewall', 'Allow SSH on custom port through firewall', 'ufw allow 2222/tcp', 'security', 'ForexAcuity', '{"ufw","firewall","ssh","security"}', 51);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Allow HTTP and HTTPS through firewall', 'Allow HTTP and HTTPS through firewall', 'ufw allow 80/tcp && ufw allow 443/tcp', 'security', 'ForexAcuity', '{"ufw","firewall","http","https"}', 52);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Install SSL certificates with Certbot', 'Install SSL certificates with Certbot', 'certbot --nginx -d yourdomain.com -d www.yourdomain.com', 'security', 'ForexAcuity', '{"certbot","ssl","https","nginx"}', 53);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Initialize a new Git repository', 'Initialize a new Git repository', 'git init', 'git', 'DevFundamentals', '{"git","initialization","version-control"}', 54);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Clone a remote repository to local machine', 'Clone a remote repository to local machine', 'git clone <repository-url>', 'git', 'DevFundamentals', '{"git","clone","remote"}', 55);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Show the working directory status', 'Show the working directory status', 'git status', 'git', 'DevFundamentals', '{"git","status","working-directory"}', 56);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Stage all changes for commit', 'Stage all changes for commit', 'git add .', 'git', 'DevFundamentals', '{"git","staging","add"}', 57);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Commit staged changes with a message', 'Commit staged changes with a message', 'git commit -m "message"', 'git', 'DevFundamentals', '{"git","commit","message"}', 58);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Push commits to remote repository', 'Push commits to remote repository', 'git push origin main', 'git', 'DevFundamentals', '{"git","push","remote"}', 59);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Pull latest changes from remote repository', 'Pull latest changes from remote repository', 'git pull origin main', 'git', 'DevFundamentals', '{"git","pull","sync"}', 60);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('List all branches or create new branch', 'List all branches or create new branch', 'git branch', 'git', 'DevFundamentals', '{"git","branches","workflow"}', 61);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Create and switch to new branch', 'Create and switch to new branch', 'git checkout -b branch-name', 'git', 'DevFundamentals', '{"git","checkout","branch-creation"}', 62);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Merge specified branch into current branch', 'Merge specified branch into current branch', 'git merge branch-name', 'git', 'DevFundamentals', '{"git","merge","integration"}', 63);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Temporarily save uncommitted changes', 'Temporarily save uncommitted changes', 'git stash', 'git', 'DevFundamentals', '{"git","stash","temporary"}', 64);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Reset to previous commit and discard changes', 'Reset to previous commit and discard changes', 'git reset --hard HEAD~1', 'git', 'DevFundamentals', '{"git","reset","destructive"}', 65);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Initialize a new npm project', 'Initialize a new npm project', 'npm init', 'npm', 'DevFundamentals', '{"npm","initialization","package"}', 66);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Install all dependencies from package.json', 'Install all dependencies from package.json', 'npm install', 'npm', 'DevFundamentals', '{"npm","install","dependencies"}', 67);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Install a specific package', 'Install a specific package', 'npm install package-name', 'npm', 'DevFundamentals', '{"npm","install","package"}', 68);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Install package as development dependency', 'Install package as development dependency', 'npm install --save-dev package-name', 'npm', 'DevFundamentals', '{"npm","dev-dependencies","development"}', 69);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Run npm script defined in package.json', 'Run npm script defined in package.json', 'npm run script-name', 'npm', 'DevFundamentals', '{"npm","scripts","automation"}', 70);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('List installed packages and their versions', 'List installed packages and their versions', 'npm list', 'npm', 'DevFundamentals', '{"npm","list","packages"}', 71);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Update all packages to latest versions', 'Update all packages to latest versions', 'npm update', 'npm', 'DevFundamentals', '{"npm","update","maintenance"}', 72);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Check for security vulnerabilities', 'Check for security vulnerabilities', 'npm audit', 'npm', 'DevFundamentals', '{"npm","security","audit"}', 73);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Clear npm cache to fix installation issues', 'Clear npm cache to fix installation issues', 'npm cache clean --force', 'npm', 'DevFundamentals', '{"npm","cache","troubleshooting"}', 74);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Execute package without installing globally', 'Execute package without installing globally', 'npx command', 'npm', 'DevFundamentals', '{"npx","execution","packages"}', 75);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Check Python version', 'Check Python version', 'python --version', 'python', 'Python Learning', '{"python","version","info"}', 76);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Install Python package using pip', 'Install Python package using pip', 'pip install package-name', 'python', 'Python Learning', '{"pip","install","packages"}', 77);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Export installed packages to requirements file', 'Export installed packages to requirements file', 'pip freeze > requirements.txt', 'python', 'Python Learning', '{"pip","requirements","export"}', 78);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Create virtual environment', 'Create virtual environment', 'python -m venv venv', 'python', 'Python Learning', '{"venv","virtual-environment","isolation"}', 79);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Activate virtual environment on Unix/macOS', 'Activate virtual environment on Unix/macOS', 'source venv/bin/activate', 'python', 'Python Learning', '{"venv","activation","environment"}', 80);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Run Python script', 'Run Python script', 'python script.py', 'python', 'Python Learning', '{"python","execution","script"}', 81);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Start simple HTTP server', 'Start simple HTTP server', 'python -m http.server 8000', 'python', 'Python Learning', '{"http","server","development"}', 82);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Run Python tests with pytest', 'Run Python tests with pytest', 'pytest', 'python', 'Python Learning', '{"testing","pytest","quality"}', 83);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Upgrade pip to latest version', 'Upgrade pip to latest version', 'python -m pip install --upgrade pip', 'python', 'Python Learning', '{"pip","upgrade","maintenance"}', 84);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Check Python path configuration', 'Check Python path configuration', 'python -c "import sys; print(sys.path)"', 'python', 'Python Learning', '{"python","path","debugging"}', 85);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Check Docker version', 'Check Docker version', 'docker --version', 'docker', 'Docker Learning', '{"docker","version","info"}', 86);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Run a test container to verify Docker installation', 'Run a test container to verify Docker installation', 'docker run hello-world', 'docker', 'Docker Learning', '{"docker","run","test"}', 87);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Build Docker image from Dockerfile', 'Build Docker image from Dockerfile', 'docker build -t image-name .', 'docker', 'Docker Learning', '{"docker","build","image"}', 88);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Run container with port mapping', 'Run container with port mapping', 'docker run -p 3000:3000 image-name', 'docker', 'Docker Learning', '{"docker","run","ports"}', 89);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('List running containers', 'List running containers', 'docker ps', 'docker', 'Docker Learning', '{"docker","list","containers"}', 90);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Stop running container', 'Stop running container', 'docker stop container-id', 'docker', 'Docker Learning', '{"docker","stop","management"}', 91);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Execute interactive bash in running container', 'Execute interactive bash in running container', 'docker exec -it container-id bash', 'docker', 'Docker Learning', '{"docker","exec","interactive"}', 92);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Start services defined in docker-compose.yml in background', 'Start services defined in docker-compose.yml in background', 'docker-compose up -d', 'docker', 'Docker Learning', '{"docker-compose","services","detached"}', 93);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('View container logs', 'View container logs', 'docker logs container-id', 'docker', 'Docker Learning', '{"docker","logs","debugging"}', 94);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Remove all unused containers, images, and networks', 'Remove all unused containers, images, and networks', 'docker system prune -a', 'docker', 'Docker Learning', '{"docker","cleanup","maintenance"}', 95);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Test Nginx configuration syntax', 'Test Nginx configuration syntax', 'nginx -t', 'nginx', 'Web Server Setup', '{"nginx","test","configuration"}', 96);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Reload Nginx configuration without stopping', 'Reload Nginx configuration without stopping', 'systemctl reload nginx', 'nginx', 'Web Server Setup', '{"nginx","reload","configuration"}', 97);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Check Nginx service status', 'Check Nginx service status', 'systemctl status nginx', 'nginx', 'Web Server Setup', '{"nginx","status","service"}', 98);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Follow Nginx access logs in real-time', 'Follow Nginx access logs in real-time', 'tail -f /var/log/nginx/access.log', 'nginx', 'Web Server Setup', '{"nginx","logs","monitoring"}', 99);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Send reload signal to Nginx master process', 'Send reload signal to Nginx master process', 'nginx -s reload', 'nginx', 'Web Server Setup', '{"nginx","signal","reload"}', 100);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Connect to PostgreSQL database', 'Connect to PostgreSQL database', 'psql -U username -d database', 'database', 'Database Learning', '{"postgresql","connect","database"}', 101);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Create MySQL database backup', 'Create MySQL database backup', 'mysqldump -u username -p database > backup.sql', 'database', 'Database Learning', '{"mysql","backup","export"}', 102);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Connect to Redis server', 'Connect to Redis server', 'redis-cli', 'database', 'Database Learning', '{"redis","cli","cache"}', 103);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Connect to MongoDB shell', 'Connect to MongoDB shell', 'mongo', 'database', 'Database Learning', '{"mongodb","shell","nosql"}', 104);

INSERT INTO commands (title, description, command, category, project_source, tags, order_index)
VALUES ('Create PostgreSQL database backup', 'Create PostgreSQL database backup', 'pg_dump database > backup.sql', 'database', 'Database Learning', '{"postgresql","backup","dump"}', 105);