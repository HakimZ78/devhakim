import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

export async function POST(request: NextRequest) {
  try {
    console.log('🧹 Cleaning up duplicate entries...')

    // Clean up milestones table - keep one of each title
    const { data: milestones, error: milestonesError } = await supabase
      .from('milestones')
      .select('*')
      .order('created_at', { ascending: true })

    if (milestonesError) {
      throw milestonesError
    }

    if (milestones) {
      const seenTitles = new Set<string>()
      const toDelete: string[] = []

      for (const milestone of milestones) {
        if (seenTitles.has(milestone.title)) {
          toDelete.push(milestone.id)
        } else {
          seenTitles.add(milestone.title)
        }
      }

      if (toDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('milestones')
          .delete()
          .in('id', toDelete)

        if (deleteError) {
          throw deleteError
        }

        console.log(`✅ Deleted ${toDelete.length} duplicate milestones`)
      }
    }

    // Clean up learning_paths table
    const { data: paths, error: pathsError } = await supabase
      .from('learning_paths')
      .select('*')
      .order('created_at', { ascending: true })

    if (pathsError) {
      throw pathsError
    }

    if (paths) {
      const seenTitles = new Set<string>()
      const toDelete: string[] = []

      for (const path of paths) {
        if (seenTitles.has(path.title)) {
          toDelete.push(path.id)
        } else {
          seenTitles.add(path.title)
        }
      }

      if (toDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('learning_paths')
          .delete()
          .in('id', toDelete)

        if (deleteError) {
          throw deleteError
        }

        console.log(`✅ Deleted ${toDelete.length} duplicate learning paths`)
      }
    }

    // Clean up certifications table
    const { data: certs, error: certsError } = await supabase
      .from('certifications')
      .select('*')
      .order('created_at', { ascending: true })

    if (certsError) {
      throw certsError
    }

    if (certs) {
      const seenTitles = new Set<string>()
      const toDelete: string[] = []

      for (const cert of certs) {
        if (seenTitles.has(cert.title)) {
          toDelete.push(cert.id)
        } else {
          seenTitles.add(cert.title)
        }
      }

      if (toDelete.length > 0) {
        const { error: deleteError } = await supabase
          .from('certifications')
          .delete()
          .in('id', toDelete)

        if (deleteError) {
          throw deleteError
        }

        console.log(`✅ Deleted ${toDelete.length} duplicate certifications`)
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Database cleanup completed successfully'
    })

  } catch (error) {
    console.error('Database cleanup error:', error)
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}