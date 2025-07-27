const nodemailer = require('nodemailer');

// Test email configuration
async function testEmail() {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'zaehid.hakim78@gmail.com', // Your EMAIL_FROM
      pass: 'sjtljofljvfmoxey', // Your EMAIL_PASS
    },
  });

  try {
    // Verify connection
    await transporter.verify();
    console.log('✅ Gmail connection successful!');
    
    // Send test email
    const info = await transporter.sendMail({
      from: '"Test Sender" <zaehid.hakim78@gmail.com>',
      to: 'zaehid.hakim78@gmail.com',
      subject: 'Test Email from Portfolio Contact Form',
      text: 'This is a test email to verify Gmail configuration.',
      html: '<p>This is a <strong>test email</strong> to verify Gmail configuration.</p>',
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', info.messageId);
  } catch (error) {
    console.error('❌ Error:', error.message);
    if (error.message.includes('Invalid login')) {
      console.log('\n💡 Make sure to:');
      console.log('1. Use your Gmail address for "user"');
      console.log('2. Use an app-specific password (not your regular password)');
      console.log('3. Enable 2FA on your Google account');
      console.log('4. See docs/GMAIL_SETUP.md for detailed instructions');
    }
  }
}

testEmail();