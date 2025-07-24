import { NextResponse } from 'next/server'
import { initializeDatabase, resetDatabase } from '@/lib/supabase-init'

export async function POST(request: Request) {
  try {
    const { action } = await request.json()
    
    if (action === 'reset') {
      await resetDatabase()
      return NextResponse.json({ message: 'Database reset and reinitialized successfully' })
    } else {
      await initializeDatabase()
      return NextResponse.json({ message: 'Database initialized successfully' })
    }
  } catch (error) {
    console.error('Database initialization error:', error)
    return NextResponse.json(
      { error: 'Failed to initialize database' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json({ 
    message: 'Journey database API',
    endpoints: {
      'POST /api/journey/init': 'Initialize database with sample data',
      'POST /api/journey/init (with action: reset)': 'Reset and reinitialize database'
    }
  })
}