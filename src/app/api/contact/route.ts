import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  console.log('Contact API called');
  
  try {
    // Import nodemailer properly
    const nodemailer = await import('nodemailer');
    
    // Email configuration
    const EMAIL_FROM = process.env.EMAIL_FROM || 'your-email@gmail.com';
    const EMAIL_TO = process.env.EMAIL_TO || 'zaehid.hakim78@gmail.com';
    const EMAIL_PASS = process.env.EMAIL_PASS || '';

    console.log('Email config:', { EMAIL_FROM, EMAIL_TO, EMAIL_PASS: EMAIL_PASS ? 'Set' : 'Not set' });

    // Create transporter - it's createTransport not createTransporter
    const createTransport = nodemailer.createTransport || nodemailer.default?.createTransport;
    if (!createTransport) {
      throw new Error('Unable to find createTransport method');
    }
    
    const transporter = createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_FROM,
        pass: EMAIL_PASS, // App-specific password, not regular password
      },
    });
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Prepare email content
    const mailOptions = {
      from: `"${name}" <${EMAIL_FROM}>`, // Sender name with your email
      to: EMAIL_TO, // Your email where you want to receive messages
      replyTo: email, // Reply-to will be the sender's email
      subject: `Portfolio Contact: ${subject}`,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">New Contact Form Submission</h2>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
          </div>
          
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h3 style="color: #374151; margin-top: 0;">Message:</h3>
            <p style="color: #4b5563; white-space: pre-wrap;">${message}</p>
          </div>
          
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px;">
              This email was sent from your portfolio contact form at devhakim.com
            </p>
          </div>
        </div>
      `,
    };

    // Send email
    console.log('Sending email...');
    console.log('Attempting to send to:', EMAIL_TO);
    console.log('From:', EMAIL_FROM);
    
    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent successfully:', info.messageId);

    // Send confirmation email to sender (optional)
    const confirmationOptions = {
      from: `"DevHakim" <${EMAIL_FROM}>`,
      to: email,
      subject: 'Thank you for contacting me!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3b82f6;">Thank you for reaching out!</h2>
          
          <p>Hi ${name},</p>
          
          <p>I've received your message and will get back to you as soon as possible, typically within 24-48 hours.</p>
          
          <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #374151; margin-top: 0;">Your message:</h3>
            <p><strong>Subject:</strong> ${subject}</p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          
          <p>In the meantime, feel free to connect with me on:</p>
          <ul>
            <li><a href="https://www.linkedin.com/in/zaehid-hakim-1004016b">LinkedIn</a></li>
            <li><a href="https://devhakim.com">Portfolio Website</a></li>
          </ul>
          
          <p>Best regards,<br>Hakim</p>
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 12px;">
              This is an automated response. Please do not reply to this email.
            </p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(confirmationOptions);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully!',
    });

  } catch (error) {
    console.error('Error sending email:', error);
    
    // Check for specific Gmail errors
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      
      if (error.message.includes('Invalid login') || error.message.includes('Username and Password not accepted')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Email authentication failed. Please check Gmail app password configuration.' 
          },
          { status: 500 }
        );
      }
      
      if (error.message.includes('self signed certificate')) {
        return NextResponse.json(
          { 
            success: false, 
            error: 'Email security error. Please contact admin.' 
          },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to send email. Please try again later.' 
      },
      { status: 500 }
    );
  }
}