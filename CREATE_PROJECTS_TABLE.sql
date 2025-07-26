-- Create projects table in Supabase
-- This table was missing from the database, causing 500 errors

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  category TEXT CHECK (category IN ('learning', 'fintech', 'business', 'personal')) NOT NULL,
  technologies TEXT[] DEFAULT '{}',
  highlights TEXT[] DEFAULT '{}',
  live_url TEXT,
  image_url TEXT NOT NULL,
  featured BOOLEAN DEFAULT FALSE,
  completion_date DATE NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')) NOT NULL,
  status TEXT CHECK (status IN ('completed', 'in-progress', 'planning')) NOT NULL,
  overview TEXT NOT NULL,
  problem_statement TEXT NOT NULL,
  solution TEXT NOT NULL,
  challenges JSONB DEFAULT '[]',
  key_learnings TEXT[] DEFAULT '{}',
  future_enhancements TEXT[] DEFAULT '{}',
  gallery JSONB DEFAULT '[]',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

-- Create policies for authenticated users (admin)
CREATE POLICY "Allow authenticated insert on projects" ON projects
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on projects" ON projects
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on projects" ON projects
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create index for faster slug lookups
CREATE INDEX idx_projects_slug ON projects(slug);

-- Create index for faster ordering
CREATE INDEX idx_projects_order ON projects(order_index);

-- Create index for featured projects
CREATE INDEX idx_projects_featured ON projects(featured) WHERE featured = true;