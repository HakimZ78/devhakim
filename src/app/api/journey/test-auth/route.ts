import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Service role client for admin operations
const supabaseServiceUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabaseService = createClient(supabaseServiceUrl, supabaseServiceKey)

export async function POST() {
  try {
    console.log('Testing certification creation...')

    // Test creating a certification
    const testCert = {
      title: 'Test Certification',
      issuer: 'Test Issuer',
      date_earned: '2025-01-01',
      description: 'Test description',
      skills: ['Test Skill'],
      status: 'completed',
      order_index: 999
    }

    console.log('Attempting to create test certification:', testCert)

    const { data, error } = await supabaseService
      .from('certifications')
      .insert([testCert])
      .select()

    if (error) {
      console.error('Test certification creation error:', error)
      return NextResponse.json({
        success: false,
        error: 'Failed to create test certification',
        details: error.message,
        code: error.code,
        hint: error.hint
      }, { status: 500 })
    }

    console.log('Test certification created successfully:', data)

    // Clean up - delete the test certification
    await supabaseService
      .from('certifications')
      .delete()
      .eq('id', data[0].id)

    return NextResponse.json({
      success: true,
      message: 'Certification creation test passed',
      test_data: data[0]
    })

  } catch (error) {
    console.error('Test error:', error)
    return NextResponse.json({
      success: false,
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}