-- DevHakim Portfolio Journey Tables
-- Run this SQL in your Supabase SQL Editor

-- Create learning_paths table
CREATE TABLE IF NOT EXISTS learning_paths (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create path_steps table
CREATE TABLE IF NOT EXISTS path_steps (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  path_id UUID REFERENCES learning_paths(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  skills TEXT[] DEFAULT '{}',
  completed BOOLEAN DEFAULT FALSE,
  in_progress BOOLEAN DEFAULT FALSE,
  estimated_time TEXT NOT NULL,
  projects TEXT[] DEFAULT '{}',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create milestones table
CREATE TABLE IF NOT EXISTS milestones (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  target_date DATE NOT NULL,
  completed BOOLEAN DEFAULT FALSE,
  completion_date DATE,
  progress INTEGER DEFAULT 0,
  category TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create certifications table
CREATE TABLE IF NOT EXISTS certifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  provider TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT CHECK (status IN ('completed', 'in_progress', 'planned')) DEFAULT 'planned',
  completion_date DATE,
  expected_date DATE,
  certificate_url TEXT,
  skills TEXT[] DEFAULT '{}',
  order_index INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE path_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access (recruiters can see your data)
-- Learning Paths Policies
CREATE POLICY "Allow public read access on learning_paths" ON learning_paths
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on learning_paths" ON learning_paths
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on learning_paths" ON learning_paths
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on learning_paths" ON learning_paths
  FOR DELETE USING (auth.role() = 'authenticated');

-- Path Steps Policies
CREATE POLICY "Allow public read access on path_steps" ON path_steps
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on path_steps" ON path_steps
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on path_steps" ON path_steps
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on path_steps" ON path_steps
  FOR DELETE USING (auth.role() = 'authenticated');

-- Milestones Policies
CREATE POLICY "Allow public read access on milestones" ON milestones
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on milestones" ON milestones
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on milestones" ON milestones
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on milestones" ON milestones
  FOR DELETE USING (auth.role() = 'authenticated');

-- Certifications Policies
CREATE POLICY "Allow public read access on certifications" ON certifications
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on certifications" ON certifications
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated update on certifications" ON certifications
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated delete on certifications" ON certifications
  FOR DELETE USING (auth.role() = 'authenticated');