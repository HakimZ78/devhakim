import { NextResponse } from 'next/server'
import { journeyData } from '@/data/journey-data'

export async function GET() {
  try {
    // Convert the static journey data to the format expected by the admin
    const milestones = journeyData.milestones.map(milestone => ({
      ...milestone,
      details: [], // Add empty details array if needed by admin
      status: milestone.completed ? 'completed' : 'upcoming'
    }))

    return NextResponse.json({
      success: true,
      data: milestones
    })

  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to load journey data'
    }, { status: 500 })
  }
}