import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // For progress tracking, we'll use a different data structure
    // focused on skills and competencies rather than milestones
    return NextResponse.json(getDefaultProgressData())
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// Progress tracking data focused on skills and competencies
function getDefaultProgressData() {
  return [
    {
      id: '1',
      category: 'Technical Skills',
      items: [
        {
          skill: 'Python Programming',
          current_level: 85,
          target_level: 90,
          last_updated: '2025-01-20',
          evidence: ['ForexAcuity Backend', 'Healthcare API', 'Portfolio Admin System']
        },
        {
          skill: 'React & Next.js',
          current_level: 80,
          target_level: 85,
          last_updated: '2025-01-18',
          evidence: ['Portfolio Frontend', 'Interactive Components', 'Real-time UI']
        },
        {
          skill: 'Database Design',
          current_level: 75,
          target_level: 80,
          last_updated: '2025-01-15',
          evidence: ['Supabase RLS', 'PostgreSQL Optimization', 'Data Modeling']
        }
      ]
    },
    {
      id: '2',
      category: 'Professional Development',
      items: [
        {
          skill: 'System Architecture',
          current_level: 70,
          target_level: 80,
          last_updated: '2025-01-10',
          evidence: ['Microservices Design', 'API Architecture', 'Scalability Planning']
        },
        {
          skill: 'DevOps & Deployment',
          current_level: 65,
          target_level: 75,
          last_updated: '2025-01-12',
          evidence: ['VPS Deployment', 'PM2 Process Management', 'SSL Configuration']
        }
      ]
    }
  ]
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    // In a real implementation, this would save to database
    return NextResponse.json(body)
  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}