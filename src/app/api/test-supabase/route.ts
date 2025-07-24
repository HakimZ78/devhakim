import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  const results = {
    connection: false,
    tables: {
      learning_paths: { exists: false, count: 0, error: null as string | null },
      path_steps: { exists: false, count: 0, error: null as string | null },
      milestones: { exists: false, count: 0, error: null as string | null },
      certifications: { exists: false, count: 0, error: null as string | null }
    },
    config: {
      url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Set' : 'Missing',
      key: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Set' : 'Missing'
    }
  }

  // Test each table
  const tables = ['learning_paths', 'path_steps', 'milestones', 'certifications']
  
  for (const tableName of tables) {
    try {
      const { data, error } = await supabase
        .from(tableName)
        .select('*', { count: 'exact' })
        .limit(1)
      
      if (error) {
        results.tables[tableName as keyof typeof results.tables].error = error.message
      } else {
        results.tables[tableName as keyof typeof results.tables].exists = true
        results.tables[tableName as keyof typeof results.tables].count = data?.length || 0
        results.connection = true
      }
    } catch (error) {
      results.tables[tableName as keyof typeof results.tables].error = error instanceof Error ? error.message : 'Unknown error'
    }
  }

  return NextResponse.json(results)
}