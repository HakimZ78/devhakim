-- ================================
-- ADMIN & SECURITY TABLES
-- ================================

-- Admin users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  last_login TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Admin sessions for secure login
CREATE TABLE IF NOT EXISTS admin_sessions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  admin_id UUID REFERENCES admin_users(id) ON DELETE CASCADE,
  token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- PROJECT CONTENT TABLES
-- ================================

-- Main projects table (admin editable)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('learning', 'fintech', 'business', 'personal')),
  technologies TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  live_url TEXT,
  image_url TEXT,
  featured BOOLEAN DEFAULT false,
  completion_date DATE,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  status TEXT CHECK (status IN ('completed', 'in-progress', 'planning')),
  overview TEXT,
  problem_statement TEXT,
  solution TEXT,
  key_learnings TEXT[] DEFAULT '{}',
  future_enhancements TEXT[] DEFAULT '{}',
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project challenges (separate table for flexibility)
CREATE TABLE IF NOT EXISTS project_challenges (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  solution TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project screenshots/gallery
CREATE TABLE IF NOT EXISTS project_screenshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT,
  alt_text TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- TEMPLATES SYSTEM
-- ================================

-- Code templates for the Templates page
CREATE TABLE IF NOT EXISTS code_templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- e.g., 'config', 'server', 'component', 'utility'
  language TEXT NOT NULL, -- e.g., 'javascript', 'python', 'json', 'yaml'
  filename TEXT, -- suggested filename
  content TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ================================
-- TRIGGERS FOR UPDATED_AT
-- ================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_admin_users_updated_at 
  BEFORE UPDATE ON admin_users 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
  BEFORE UPDATE ON projects 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_code_templates_updated_at 
  BEFORE UPDATE ON code_templates 
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- ================================
-- ROW LEVEL SECURITY (RLS)
-- ================================

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_screenshots ENABLE ROW LEVEL SECURITY;
ALTER TABLE code_templates ENABLE ROW LEVEL SECURITY;

-- Public read access for projects and templates (for public site)
CREATE POLICY "Public can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public can read project challenges" ON project_challenges FOR SELECT USING (true);
CREATE POLICY "Public can read project screenshots" ON project_screenshots FOR SELECT USING (true);
CREATE POLICY "Public can read code templates" ON code_templates FOR SELECT USING (true);

-- Admin-only policies for modifications
CREATE POLICY "Only admins can modify projects" ON projects 
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM admin_sessions s 
      JOIN admin_users u ON s.admin_id = u.id 
      WHERE s.token = current_setting('request.jwt.claims', true)::json->>'sub'
        AND s.expires_at > NOW()
    )
  );

-- Similar policies for other admin tables...
-- (Add as needed based on your authentication implementation)

-- ================================
-- SAMPLE DATA
-- ================================

-- Insert initial admin user (you'll need to hash the password)
-- INSERT INTO admin_users (email, password_hash, name) 
-- VALUES ('zaehid.hakim78@gmail.com', 'your_hashed_password_here', 'Hakim');

-- Insert sample projects data
INSERT INTO projects (
  slug, title, description, category, technologies, highlights, 
  live_url, featured, completion_date, difficulty, status,
  overview, problem_statement, solution, key_learnings, future_enhancements
) VALUES 
(
  'forexacuity',
  'ForexAcuity Analytics Dashboard',
  'Real-time forex analytics dashboard with MT5 integration, WebSocket architecture, and subscription payments.',
  'fintech',
  ARRAY['Next.js', 'Express.js', 'Python', 'WebSockets', 'Stripe', 'MT5 API', 'PostgreSQL'],
  ARRAY['Sub-second real-time data updates', '£250 lifetime subscription model', 'Asian Fractal pattern detection', 'Multi-timeframe analysis'],
  'https://forexacuity.co.uk',
  true,
  '2024-12-01',
  'advanced',
  'completed',
  'ForexAcuity is a comprehensive forex trading analytics platform that provides real-time market data, technical analysis, and pattern recognition for forex traders.',
  'Forex traders often struggle with fragmented tools and delayed data feeds that can cost them profitable opportunities.',
  'I developed ForexAcuity as an all-in-one solution featuring real-time data feeds from MT5, advanced pattern recognition algorithms, and a responsive web interface.',
  ARRAY['Real-time systems require careful consideration of data flow', 'WebSocket connections need proper error handling', 'Financial data demands high precision'],
  ARRAY['Add machine learning models for price prediction', 'Implement automated trading signals', 'Add support for more asset classes']
),
(
  'home-eye-clinic',
  'Home Eye Clinic Website',
  'Professional website for UK-based home eye care service with multi-channel booking system and responsive design.',
  'business',
  ARRAY['Laravel 11', 'Livewire 3', 'PHP 8.2', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
  ARRAY['Multi-channel booking system', 'Email notifications and admin management', 'Responsive design for elderly demographic', 'NHS and private service integration'],
  'https://homeeyeclinic.co.uk',
  true,
  '2024-09-30',
  'intermediate',
  'completed',
  'Home Eye Clinic provides professional eye examinations in the comfort of patients homes across the UK.',
  'The client needed a professional website that would appeal to elderly patients who prefer home visits.',
  'I created a clean, accessible website with multiple booking options and comprehensive service information.',
  ARRAY['Accessibility should be considered from the start', 'User testing provides invaluable insights', 'Simple design often works better'],
  ARRAY['Add online payment processing', 'Implement calendar integration', 'Create mobile app']
),
(
  'portfolio',
  'DevHakim Portfolio',
  'This portfolio website built with Next.js, showcasing my transition journey and technical projects with interactive features.',
  'personal',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
  ARRAY['Responsive design system', 'Interactive skill and timeline editing', 'Admin content management', 'Real-time updates'],
  'https://devhakim.com',
  true,
  '2025-01-15',
  'intermediate',
  'in-progress',
  'This portfolio website serves as both a showcase of my technical skills and a living document of my career transition.',
  'As a career changer, I needed a platform that would effectively communicate my story and demonstrate my technical abilities.',
  'I created a comprehensive portfolio with interactive elements, detailed project showcases, and admin content management.',
  ARRAY['Next.js App Router provides excellent developer experience', 'TypeScript improves code quality', 'Performance budget is important'],
  ARRAY['Add blog functionality with MDX', 'Implement dark mode', 'Add visitor analytics']
);

-- Insert sample challenges
INSERT INTO project_challenges (project_id, title, description, solution, order_index) 
SELECT p.id, 'Real-time Data Synchronization', 'Ensuring sub-second data updates across multiple currency pairs.', 'Implemented WebSocket connections with intelligent throttling and data compression.', 1
FROM projects p WHERE p.slug = 'forexacuity';

INSERT INTO project_challenges (project_id, title, description, solution, order_index) 
SELECT p.id, 'Pattern Recognition Accuracy', 'Developing reliable algorithms to detect Asian Fractal patterns.', 'Created custom algorithms based on established trading principles with backtesting.', 2
FROM projects p WHERE p.slug = 'forexacuity';

-- Insert sample templates
INSERT INTO code_templates (title, description, category, language, filename, content, tags, featured) VALUES
(
  'Express.js Server Template',
  'Basic Express.js server setup with middleware and routes',
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

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: ''Something went wrong!'' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});',
  ARRAY['express', 'server', 'middleware', 'api'],
  true
),
(
  'Package.json Template',
  'Standard package.json for Node.js projects',
  'config',
  'json',
  'package.json',
  '{
  "name": "your-project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "jest",
    "build": "npm run build"
  },
  "keywords": [],
  "author": "",
  "license": "MIT",
  "dependencies": {
    "express": "^4.18.0",
    "cors": "^2.8.5",
    "helmet": "^6.0.0"
  },
  "devDependencies": {
    "nodemon": "^2.0.20",
    "jest": "^29.0.0"
  }
}',
  ARRAY['config', 'npm', 'package'],
  true
);