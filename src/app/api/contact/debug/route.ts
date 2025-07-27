import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const nodemailer = await import('nodemailer');
    
    const EMAIL_FROM = process.env.EMAIL_FROM || 'not-set';
    const EMAIL_TO = process.env.EMAIL_TO || 'not-set';
    const EMAIL_PASS = process.env.EMAIL_PASS || 'not-set';
    
    // Test transporter creation - it's createTransport not createTransporter
    const createTransport = nodemailer.createTransport || nodemailer.default?.createTransport;
    if (!createTransport) {
      return NextResponse.json({
        success: false,
        error: 'createTransport method not found',
        available: Object.keys(nodemailer)
      });
    }
    
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PASS,
      },
    });
    
    // Test connection
    try {
      await transporter.verify();
      return NextResponse.json({
        success: true,
        message: 'Gmail connection successful!',
        config: {
          EMAIL_FROM,
          EMAIL_TO,
          EMAIL_PASS_LENGTH: EMAIL_PASS.length,
        }
      });
    } catch (verifyError: any) {
      return NextResponse.json({
        success: false,
        error: 'Gmail verification failed',
        details: verifyError.message,
        config: {
          EMAIL_FROM,
          EMAIL_TO,
          EMAIL_PASS_LENGTH: EMAIL_PASS.length,
        }
      });
    }
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: 'Setup failed',
      details: error.message,
    });
  }
}