-- ===================================
-- CREATE MISSING TABLES FOR PORTFOLIO (SAFE VERSION)
-- ===================================
-- Run this SQL in your Supabase SQL Editor

-- Skills Categories Table
CREATE TABLE IF NOT EXISTS skill_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  skills TEXT[] NOT NULL DEFAULT '{}',
  color TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Skills Focus Table (Current Learning)
CREATE TABLE IF NOT EXISTS skill_focus (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  skill TEXT NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0,
  order_index INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Hero Content Table
CREATE TABLE IF NOT EXISTS hero_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  roles TEXT[] NOT NULL DEFAULT '{}',
  description TEXT NOT NULL,
  primary_cta_text TEXT NOT NULL,
  primary_cta_link TEXT NOT NULL,
  secondary_cta_text TEXT NOT NULL,
  secondary_cta_link TEXT NOT NULL,
  linkedin_url TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Check if projects table needs columns added (it might exist but be missing some columns)
DO $$ 
BEGIN
    -- Add missing columns if they don't exist
    BEGIN
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS challenges JSONB DEFAULT '[]';
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS gallery JSONB DEFAULT '[]';
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS overview TEXT;
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS problem_statement TEXT;
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS solution TEXT;
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS key_learnings TEXT[] DEFAULT '{}';
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS future_enhancements TEXT[] DEFAULT '{}';
        ALTER TABLE projects ADD COLUMN IF NOT EXISTS order_index INTEGER DEFAULT 0;
    EXCEPTION
        WHEN duplicate_column THEN 
            NULL; -- Column already exists, ignore
    END;
END $$;

-- Check if milestones table needs columns updated
DO $$ 
BEGIN
    -- Add missing columns if they don't exist
    BEGIN
        ALTER TABLE milestones ADD COLUMN IF NOT EXISTS details TEXT[] DEFAULT '{}';
        ALTER TABLE milestones ADD COLUMN IF NOT EXISTS status TEXT CHECK (status IN ('completed', 'in-progress', 'upcoming')) DEFAULT 'upcoming';
        -- Update target_date to TEXT if it's currently DATE
        ALTER TABLE milestones ALTER COLUMN target_date TYPE TEXT;
        ALTER TABLE milestones ALTER COLUMN completion_date TYPE TEXT;
    EXCEPTION
        WHEN duplicate_column THEN 
            NULL; -- Column already exists, ignore
        WHEN others THEN
            NULL; -- Other errors, ignore
    END;
END $$;

-- ===================================
-- ENABLE ROW LEVEL SECURITY (SAFE)
-- ===================================

ALTER TABLE skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_focus ENABLE ROW LEVEL SECURITY;
ALTER TABLE hero_content ENABLE ROW LEVEL SECURITY;

-- ===================================
-- CREATE POLICIES (SAFE - DROP AND RECREATE)
-- ===================================

-- Skill Categories Policies
DROP POLICY IF EXISTS "Public can read skill_categories" ON skill_categories;
DROP POLICY IF EXISTS "Authenticated can modify skill_categories" ON skill_categories;
CREATE POLICY "Public can read skill_categories" ON skill_categories FOR SELECT USING (true);
CREATE POLICY "Authenticated can modify skill_categories" ON skill_categories FOR ALL USING (auth.role() = 'authenticated');

-- Skill Focus Policies
DROP POLICY IF EXISTS "Public can read skill_focus" ON skill_focus;
DROP POLICY IF EXISTS "Authenticated can modify skill_focus" ON skill_focus;
CREATE POLICY "Public can read skill_focus" ON skill_focus FOR SELECT USING (true);
CREATE POLICY "Authenticated can modify skill_focus" ON skill_focus FOR ALL USING (auth.role() = 'authenticated');

-- Hero Content Policies
DROP POLICY IF EXISTS "Public can read hero_content" ON hero_content;
DROP POLICY IF EXISTS "Authenticated can modify hero_content" ON hero_content;
CREATE POLICY "Public can read hero_content" ON hero_content FOR SELECT USING (true);
CREATE POLICY "Authenticated can modify hero_content" ON hero_content FOR ALL USING (auth.role() = 'authenticated');

-- ===================================
-- INSERT INITIAL DATA (SAFE)
-- ===================================

-- Insert default hero content (only if table is empty)
INSERT INTO hero_content (
  name, subtitle, roles, description, 
  primary_cta_text, primary_cta_link, 
  secondary_cta_text, secondary_cta_link,
  linkedin_url, email
) 
SELECT 
  'Hakim',
  'Healthcare → Tech Transition',
  ARRAY['Full-Stack Developer', 'Fintech Engineer', 'Python Developer', 'React Developer'],
  'As a healthcare professional and active retail trader transitioning to tech, I bring analytical rigor, patient-focused problem-solving, and experience managing complex systems under pressure. My background spans pharmacy, optometry, and financial markets - providing unique insights for healthcare tech, fintech solutions, and understanding how end-users actually interact with complex systems. This diverse experience led me to build ForexAcuity, a real-time trading analytics platform, solving problems I personally faced as a trader. Looking to contribute these cross-industry perspectives to teams that value diverse backgrounds and foster collaborative learning cultures.',
  'View My Projects',
  '#projects',
  'My Learning Journey',
  '#journey',
  'https://www.linkedin.com/in/zaehid-hakim-1004016b',
  'zaehid.hakim78@gmail.com'
WHERE NOT EXISTS (SELECT 1 FROM hero_content);

-- Insert default skill categories (only if table is empty)
INSERT INTO skill_categories (title, skills, color, icon_name, order_index) 
SELECT unnest(ARRAY['Full-Stack Development', 'Trading Analytics & Fintech', 'Backend & Data', 'DevOps & Tools']),
       unnest(ARRAY[
         ARRAY['Python', 'FastAPI', 'Django', 'React', 'TypeScript', 'Next.js'],
         ARRAY['Real-time Dashboards', 'WebSocket APIs', 'Data Visualization', 'Trading Signals', 'Payment Systems'],
         ARRAY['PostgreSQL', 'Supabase', 'Express.js', 'RESTful APIs', 'Database Design'],
         ARRAY['Docker', 'Git', 'npm Workspaces', 'Monorepo', 'CI/CD']
       ]),
       unnest(ARRAY['from-blue-500 to-blue-600', 'from-green-500 to-green-600', 'from-purple-500 to-purple-600', 'from-orange-500 to-orange-600']),
       unnest(ARRAY['Code', 'Zap', 'Database', 'Globe']),
       unnest(ARRAY[1, 2, 3, 4])
WHERE NOT EXISTS (SELECT 1 FROM skill_categories);

-- Insert default skill focus (only if table is empty)
INSERT INTO skill_focus (skill, progress, order_index)
SELECT unnest(ARRAY['Trading Analytics', 'Full-Stack Development', 'Real-time Data Systems', 'Database Design', 'DevOps/Docker']),
       unnest(ARRAY[85, 80, 75, 70, 60]),
       unnest(ARRAY[1, 2, 3, 4, 5])
WHERE NOT EXISTS (SELECT 1 FROM skill_focus);

-- Insert/Update projects data (upsert)
INSERT INTO projects (
  slug, title, description, category, technologies, highlights, 
  live_url, image_url, featured, completion_date, difficulty, status,
  overview, problem_statement, solution, 
  challenges, key_learnings, future_enhancements, order_index
) VALUES 
(
  'forexacuity',
  'ForexAcuity Analytics Dashboard',
  'Real-time forex analytics dashboard with MT5 integration, WebSocket architecture, and subscription payments.',
  'fintech',
  ARRAY['Next.js', 'Express.js', 'Python', 'WebSockets', 'Stripe', 'MT5 API', 'PostgreSQL'],
  ARRAY['Sub-second real-time data updates', '£250 lifetime subscription model', 'Asian Fractal pattern detection', 'Multi-timeframe analysis'],
  'https://forexacuity.co.uk',
  '/images/projects/forexacuity-dashboard.png',
  true,
  '2024-12-01',
  'advanced',
  'completed',
  'ForexAcuity is a comprehensive forex trading analytics platform that provides real-time market data, technical analysis, and pattern recognition for forex traders.',
  'Forex traders often struggle with fragmented tools and delayed data feeds that can cost them profitable opportunities.',
  'I developed ForexAcuity as an all-in-one solution featuring real-time data feeds from MT5, advanced pattern recognition algorithms, and a responsive web interface.',
  '[{"title": "Real-time Data Synchronization", "description": "Ensuring sub-second data updates across multiple currency pairs without overwhelming the client or server.", "solution": "Implemented WebSocket connections with intelligent throttling and data compression. Used Redis for caching and implemented connection pooling to handle concurrent users efficiently."}]',
  ARRAY['Real-time systems require careful consideration of data flow and bottlenecks', 'WebSocket connections need proper error handling and reconnection logic', 'Financial data demands high precision and reliability in calculations'],
  ARRAY['Add machine learning models for price prediction', 'Implement automated trading signals and alerts', 'Add support for more asset classes (stocks, crypto, commodities)'],
  1
),
(
  'home-eye-clinic',
  'Home Eye Clinic Website',
  'Professional website for UK-based home eye care service with multi-channel booking system and responsive design.',
  'business',
  ARRAY['Laravel 11', 'Livewire 3', 'PHP 8.2', 'MySQL', 'Tailwind CSS', 'Alpine.js'],
  ARRAY['Multi-channel booking system', 'Email notifications and admin management', 'Responsive design for elderly demographic', 'NHS and private service integration'],
  'https://homeeyeclinic.co.uk',
  '/images/projects/home-eye-clinic-preview.jpg',
  true,
  '2024-09-30',
  'intermediate',
  'completed',
  'Home Eye Clinic provides professional eye examinations in the comfort of patients homes across the UK.',
  'The client needed a professional website that would appeal to elderly patients who prefer home visits.',
  'I created a clean, accessible website with multiple booking options and comprehensive service information.',
  '[{"title": "Accessibility for Elderly Users", "description": "Designing an interface that works well for users with varying technical skills and potential vision issues.", "solution": "Implemented large, clear fonts, high contrast colors, simple navigation, and multiple booking options. Conducted user testing with target demographic."}]',
  ARRAY['Accessibility should be considered from the start, not added later', 'User testing with the actual target demographic provides invaluable insights', 'Laravel Livewire provides excellent developer experience for reactive UIs'],
  ARRAY['Add online payment processing for deposits', 'Implement calendar integration for appointment scheduling', 'Add patient portal for managing appointment history'],
  2
),
(
  'portfolio',
  'DevHakim Portfolio',
  'This portfolio website built with Next.js, showcasing my transition journey and technical projects with interactive features.',
  'personal',
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Supabase'],
  ARRAY['Responsive design system', 'Interactive admin system', 'Database-driven content', 'Phase-based implementation'],
  'https://devhakim.com',
  '/images/projects/portfolio-preview.jpg',
  true,
  '2025-01-15',
  'intermediate',
  'in-progress',
  'This portfolio website serves as both a showcase of my technical skills and a living document of my career transition.',
  'As a career changer, I needed a platform that would effectively communicate my story and demonstrate my technical abilities.',
  'I created a comprehensive portfolio with interactive elements, detailed project showcases, and a complete admin system for content management.',
  '[{"title": "Performance with Rich Animations", "description": "Balancing engaging animations with fast loading times and smooth performance.", "solution": "Used Framer Motion for optimized animations, implemented lazy loading for images, and used code splitting to reduce initial bundle size."}]',
  ARRAY['Next.js App Router provides excellent developer experience and performance', 'TypeScript significantly improves code quality and developer confidence', 'Framer Motion is powerful but requires careful optimization for performance'],
  ARRAY['Add blog functionality with MDX support', 'Implement dark mode with system preference detection', 'Add contact form with backend integration'],
  3
)
ON CONFLICT (slug) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  technologies = EXCLUDED.technologies,
  highlights = EXCLUDED.highlights,
  live_url = EXCLUDED.live_url,
  image_url = EXCLUDED.image_url,
  featured = EXCLUDED.featured,
  completion_date = EXCLUDED.completion_date,
  difficulty = EXCLUDED.difficulty,
  status = EXCLUDED.status,
  overview = EXCLUDED.overview,
  problem_statement = EXCLUDED.problem_statement,
  solution = EXCLUDED.solution,
  challenges = EXCLUDED.challenges,
  key_learnings = EXCLUDED.key_learnings,
  future_enhancements = EXCLUDED.future_enhancements,
  order_index = EXCLUDED.order_index,
  updated_at = NOW();

-- Insert sample milestones/timeline events (only if table is empty)
INSERT INTO milestones (
  title, description, target_date, category, details, status, order_index
)
SELECT unnest(ARRAY[
  'Started Healthcare Career',
  'Discovered Trading', 
  'First Coding Experience',
  'Built ForexAcuity',
  'Career Transition Goal'
]),
unnest(ARRAY[
  'Qualified as Pharmacist and Optometrist, beginning professional healthcare journey',
  'Started retail forex trading, sparking interest in financial markets and data analysis',
  'Started learning Python for trading automation and data analysis',
  'Developed comprehensive forex analytics platform with real-time data and pattern recognition',
  'Secure first software engineering role, ideally in fintech or healthcare tech'
]),
unnest(ARRAY['July 2010', 'March 2018', 'January 2023', 'December 2024', 'June 2025']),
unnest(ARRAY['education', 'milestone', 'learning', 'project', 'goal']),
unnest(ARRAY[
  ARRAY['Completed Pharmacy degree', 'Qualified as Optometrist', 'Started working in healthcare sector'],
  ARRAY['Began learning technical analysis', 'Started live trading account', 'Discovered passion for data-driven decisions'],
  ARRAY['Completed Python basics course', 'Built first trading scripts', 'Discovered love for programming'],
  ARRAY['Learned Next.js and React', 'Implemented WebSocket architecture', 'Launched with paying customers'],
  ARRAY['Complete portfolio with admin system', 'Apply to target companies', 'Prepare for technical interviews']
]),
unnest(ARRAY['completed', 'completed', 'completed', 'completed', 'in-progress']),
unnest(ARRAY[1, 2, 3, 4, 5])
WHERE NOT EXISTS (SELECT 1 FROM milestones);

-- Insert sample code templates (only if table is very sparse)
INSERT INTO code_templates (title, description, category, language, filename, content, tags, featured, order_index)
SELECT 'Express.js API Server',
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
  res.json({ message: ''Server is running'', timestamp: new Date().toISOString() });
});

app.get(''/api/health'', (req, res) => {
  res.json({ status: ''OK'', uptime: process.uptime() });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: ''Something went wrong!'' });
});

// 404 handler
app.use(''*'', (req, res) => {
  res.status(404).json({ error: ''Route not found'' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});',
       ARRAY['express', 'server', 'api', 'middleware'],
       true,
       1
WHERE (SELECT COUNT(*) FROM code_templates) < 5

UNION ALL

SELECT 'Next.js API Route',
       'Template for Next.js API routes with error handling and TypeScript',
       'api',
       'typescript',
       'route.ts',
       'import { NextRequest, NextResponse } from ''next/server'';

export async function GET(request: NextRequest) {
  try {
    // Your GET logic here
    const data = { message: ''Success'', timestamp: new Date().toISOString() };
    
    return NextResponse.json({
      success: true,
      data
    });
  } catch (error) {
    console.error(''GET error:'', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : ''Unknown error''
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Your POST logic here
    // Validate body data
    // Process and save data
    
    return NextResponse.json({
      success: true,
      message: ''Created successfully''
    }, { status: 201 });
  } catch (error) {
    console.error(''POST error:'', error);
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : ''Unknown error''
    }, { status: 500 });
  }
}',
       ARRAY['nextjs', 'api', 'typescript', 'route'],
       true,
       2
WHERE (SELECT COUNT(*) FROM code_templates) < 5;