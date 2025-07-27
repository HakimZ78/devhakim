import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    success: true,
    env: {
      EMAIL_FROM: process.env.EMAIL_FROM ? 'Set' : 'Not set',
      EMAIL_TO: process.env.EMAIL_TO ? 'Set' : 'Not set',
      EMAIL_PASS: process.env.EMAIL_PASS ? 'Set' : 'Not set',
    },
    message: 'Contact API test endpoint'
  });
}