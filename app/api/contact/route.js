import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, contact, phone, email, message, query, source } = body;

    const clientName = (name || '').trim();
    const clientPhone = (contact || phone || '').trim();
    const clientEmail = (email || '').trim();
    const clientMessage = (message || query || '').trim();
    const formSource = source || 'Contact Page';

    if (!clientName || !clientEmail || !clientMessage) {
      return NextResponse.json(
        { success: false, error: 'Please provide your name, email, and message.' },
        { status: 400 }
      );
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT || 587);
    const user = process.env.SMTP_USER || 'atlinfo@atlantasys.com';
    const pass = process.env.SMTP_PASS || 'bjhe zlxl mugx vgsl';
    const recipient = process.env.CONTACT_RECIPIENT || 'enquiry@atlantasys.com';

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });

    const istTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #ffffff;">
        <div style="background: #0169A9; padding: 20px; color: #ffffff;">
          <h2 style="margin: 0; font-size: 20px; font-weight: 600;">New Enquiry Received — Atlanta Systems</h2>
        </div>
        <div style="padding: 24px; color: #333333; line-height: 1.6;">
          <p style="margin-top: 0;">You have received a new inquiry from the Atlanta Systems website:</p>
          <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; width: 35%; color: #475569;">Full Name:</td>
              <td style="padding: 10px 8px; color: #0f172a;">${escapeHtml(clientName)}</td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #475569;">Email Address:</td>
              <td style="padding: 10px 8px;"><a href="mailto:${escapeHtml(clientEmail)}" style="color: #0169A9; text-decoration: none;">${escapeHtml(clientEmail)}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #475569;">Phone / Mobile:</td>
              <td style="padding: 10px 8px;"><a href="tel:${escapeHtml(clientPhone)}" style="color: #0169A9; text-decoration: none;">${escapeHtml(clientPhone)}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #f1f5f9;">
              <td style="padding: 10px 8px; font-weight: bold; color: #475569;">Form Source:</td>
              <td style="padding: 10px 8px; color: #0f172a;">${escapeHtml(formSource)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 8px; font-weight: bold; color: #475569; vertical-align: top;">Requirements:</td>
              <td style="padding: 10px 8px; color: #0f172a; white-space: pre-wrap;">${escapeHtml(clientMessage)}</td>
            </tr>
          </table>
        </div>
        <div style="background: #f8fafc; padding: 12px 24px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0;">
          Received at ${istTime} IST • Sent from Atlanta Systems Official Website
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Atlanta Systems Website" <${user}>`,
      to: recipient,
      replyTo: clientEmail,
      subject: `New Website Inquiry from ${clientName} (${formSource})`,
      html: htmlContent
    });

    return NextResponse.json({ success: true, message: 'Inquiry submitted successfully.' });
  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json(
      { success: false, error: 'Unable to send your message right now. Please try again or call us directly.' },
      { status: 500 }
    );
  }
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
