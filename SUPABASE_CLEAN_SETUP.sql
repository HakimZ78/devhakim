-- DevHakim Portfolio - Clean Setup Script
-- This handles existing policies and ensures clean setup

-- First, let's drop existing policies if they exist (ignore errors if they don't exist)
DROP POLICY IF EXISTS "Allow public read access on learning_paths" ON learning_paths;
DROP POLICY IF EXISTS "Allow authenticated insert on learning_paths" ON learning_paths;
DROP POLICY IF EXISTS "Allow authenticated update on learning_paths" ON learning_paths;
DROP POLICY IF EXISTS "Allow authenticated delete on learning_paths" ON learning_paths;

DROP POLICY IF EXISTS "Allow public read access on path_steps" ON path_steps;
DROP POLICY IF EXISTS "Allow authenticated insert on path_steps" ON path_steps;
DROP POLICY IF EXISTS "Allow authenticated update on path_steps" ON path_steps;
DROP POLICY IF EXISTS "Allow authenticated delete on path_steps" ON path_steps;

DROP POLICY IF EXISTS "Allow public read access on milestones" ON milestones;
DROP POLICY IF EXISTS "Allow authenticated insert on milestones" ON milestones;
DROP POLICY IF EXISTS "Allow authenticated update on milestones" ON milestones;
DROP POLICY IF EXISTS "Allow authenticated delete on milestones" ON milestones;

DROP POLICY IF EXISTS "Allow public read access on certifications" ON certifications;
DROP POLICY IF EXISTS "Allow authenticated insert on certifications" ON certifications;
DROP POLICY IF EXISTS "Allow authenticated update on certifications" ON certifications;
DROP POLICY IF EXISTS "Allow authenticated delete on certifications" ON certifications;

-- Drop tables if they exist (to start fresh)
DROP TABLE IF EXISTS path_steps CASCADE;
DROP TABLE IF EXISTS learning_paths CASCADE;
DROP TABLE IF EXISTS milestones CASCADE;
DROP TABLE IF EXISTS certifications CASCADE;

-- Create tables from scratch
CREATE TABLE learning_paths (
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

CREATE TABLE path_steps (
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

CREATE TABLE milestones (
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

CREATE TABLE certifications (
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

-- Enable RLS
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE path_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create new policies with unique names
CREATE POLICY "journey_learning_paths_select" ON learning_paths FOR SELECT USING (true);
CREATE POLICY "journey_learning_paths_insert" ON learning_paths FOR INSERT WITH CHECK (true);
CREATE POLICY "journey_learning_paths_update" ON learning_paths FOR UPDATE USING (true);
CREATE POLICY "journey_learning_paths_delete" ON learning_paths FOR DELETE USING (true);

CREATE POLICY "journey_path_steps_select" ON path_steps FOR SELECT USING (true);
CREATE POLICY "journey_path_steps_insert" ON path_steps FOR INSERT WITH CHECK (true);
CREATE POLICY "journey_path_steps_update" ON path_steps FOR UPDATE USING (true);
CREATE POLICY "journey_path_steps_delete" ON path_steps FOR DELETE USING (true);

CREATE POLICY "journey_milestones_select" ON milestones FOR SELECT USING (true);
CREATE POLICY "journey_milestones_insert" ON milestones FOR INSERT WITH CHECK (true);
CREATE POLICY "journey_milestones_update" ON milestones FOR UPDATE USING (true);
CREATE POLICY "journey_milestones_delete" ON milestones FOR DELETE USING (true);

CREATE POLICY "journey_certifications_select" ON certifications FOR SELECT USING (true);
CREATE POLICY "journey_certifications_insert" ON certifications FOR INSERT WITH CHECK (true);
CREATE POLICY "journey_certifications_update" ON certifications FOR UPDATE USING (true);
CREATE POLICY "journey_certifications_delete" ON certifications FOR DELETE USING (true);

-- Verify tables were created
SELECT 'learning_paths' as table_name, count(*) as row_count FROM learning_paths
UNION ALL
SELECT 'path_steps' as table_name, count(*) as row_count FROM path_steps
UNION ALL
SELECT 'milestones' as table_name, count(*) as row_count FROM milestones
UNION ALL
SELECT 'certifications' as table_name, count(*) as row_count FROM certifications;