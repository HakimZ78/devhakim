# Supabase Setup Guide for Journey Page

## 1. Database Schema Setup

You need to create the following tables in your Supabase database. Go to your Supabase project dashboard -> SQL Editor and run these SQL commands:

```sql
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

-- Enable Row Level Security (RLS) - IMPORTANT for public access
ALTER TABLE learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE path_steps ENABLE ROW LEVEL SECURITY;
ALTER TABLE milestones ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;

-- Create policies to allow public read access (so recruiters can see your data)
-- But only authenticated users can modify (that's you)

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
```

## 2. Initialize with Your Original Journey Data

After creating the tables, visit your deployed site and:

1. Go to `/journey` page
2. Click the "Init DB" button in the admin toolbar (top right)
3. This will populate the database with your original journey data including:

### Learning Paths (3 paths with detailed steps):
- **AI/Healthcare Engineer** (65% progress) - 4 learning steps
- **Full-Stack Python** (80% progress) - 4 learning steps  
- **Fintech Developer** (75% progress) - 4 learning steps

### Milestones (6 milestones):
- ForexAcuity Platform Launch ✅ (completed)
- MSc Computer Science (75% progress)
- AWS Solutions Architect (40% progress)
- Portfolio Enhancement (60% progress)
- First Developer Role (25% progress)
- Open Source Contribution (20% progress)

### Certifications (8 items):
- MSc Computer Science (in progress)
- AWS Solutions Architect Associate (planned)
- Python Programming Certification (planned)
- Docker Certified Associate (planned)
- FastAPI Course ✅ (completed)
- Advanced React Development (in progress)
- Machine Learning Specialization (in progress)
- System Design Interview Course (planned)

## 3. How to Use

### For Public Visitors (Recruiters):
- They see all your journey data automatically
- No login required
- Always shows your latest updates

### For You (Admin):
1. Click "Edit Mode" in the admin toolbar
2. Click edit icons on any section to modify content
3. Changes save automatically to Supabase
4. Changes are immediately visible to all visitors

### Admin Features:
- **Edit Mode**: Toggle between view and edit modes
- **Init DB**: Initialize database with sample data
- **Reset**: Clear all data and reset to defaults

## 4. Data Persistence

✅ **Permanent**: Data persists forever in Supabase
✅ **Public**: Recruiters see your updates immediately  
✅ **Synced**: Works across all your devices
✅ **Backed up**: Professional database backup
✅ **Free**: Supabase free tier covers your needs

## 5. Customization

You can edit:
- **Learning Paths**: Title, description, progress, steps
- **Milestones**: Goals, deadlines, progress, completion status  
- **Certifications**: Status, dates, skills, certificate links

All changes sync in real-time to your live portfolio.