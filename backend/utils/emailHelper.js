import nodemailer from 'nodemailer';
import { Resend } from 'resend';

/**
 * Utility function to send emails using Resend API (primary) or Nodemailer (fallback)
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email address
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content of the email
 */
export const sendEmail = async ({ to, subject, html }) => {
  const resendApiKey = process.env.RESEND_API_KEY;

  // 1. Try sending via Resend API (highly reliable on cloud hosting like Render/Railway)
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const result = await resend.emails.send({
        from: 'VeloraHD <onboarding@resend.dev>',
        to,
        subject,
        html,
      });
      
      if (result.error) {
        console.warn('Resend API returned error, attempting fallback to SMTP:', result.error);
      } else {
        console.log(`Email successfully sent via Resend API: ${result.data?.id}`);
        return { success: true, service: 'resend', messageId: result.data?.id };
      }
    } catch (resendError) {
      console.error('Resend API call crashed, attempting fallback to SMTP:', resendError);
    }
  }

  // 2. Fallback to Nodemailer Gmail SMTP
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;
  
  // If credentials are not configured or are set to placeholder values
  const isConfigured = emailUser && emailPass && 
                       emailUser !== 'your_email@gmail.com' && 
                       emailUser !== 'your-gmail-address@gmail.com';

  if (!isConfigured) {
    console.log('\n=================== SMTP EMAIL SIMULATION ===================');
    console.log(`To      : ${to}`);
    console.log(`Subject : ${subject}`);
    console.log('-------------------- HTML Content ---------------------------');
    // Strip HTML tags for clean console display
    const textPlain = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
    console.log(textPlain.slice(0, 500) + (textPlain.length > 500 ? '...' : ''));
    console.log('=============================================================\n');
    return { success: true, simulated: true };
  }

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        // Remove spaces from Gmail App Password in case they were copy-pasted literally
        pass: emailPass.replace(/\s+/g, ''),
      },
    });

    const mailOptions = {
      from: `"VeloraHD Wallpaper Platform" <${emailUser}>`,
      to,
      subject,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Email successfully sent via Gmail SMTP: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Nodemailer error: Failed to send email.', error);
    // Return success: false, but don't throw an unhandled exception that crashes request
    return { success: false, error: error.message };
  }
};
