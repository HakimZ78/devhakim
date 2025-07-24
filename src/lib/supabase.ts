import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Types for our journey data
export interface LearningPath {
  id: string
  title: string
  description: string
  icon: string
  color: string
  progress: number
  order_index: number
  created_at?: string
  updated_at?: string
}

export interface PathStep {
  id: string
  path_id: string
  title: string
  description: string
  skills: string[]
  completed: boolean
  in_progress: boolean
  estimated_time: string
  projects?: string[]
  order_index: number
  created_at?: string
  updated_at?: string
}

export interface Milestone {
  id: string
  title: string
  description: string
  target_date: string
  completed: boolean
  completion_date?: string
  progress: number
  category: string
  order_index: number
  created_at?: string
  updated_at?: string
}

export interface Certification {
  id: string
  title: string
  provider: string
  description: string
  status: 'completed' | 'in_progress' | 'planned'
  completion_date?: string
  expected_date?: string
  certificate_url?: string
  skills: string[]
  order_index: number
  created_at?: string
  updated_at?: string
}

// Database schema for Supabase
export const DATABASE_SCHEMA = {
  learning_paths: `
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
  `,
  path_steps: `
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
  `,
  milestones: `
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
  `,
  certifications: `
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
  `
}