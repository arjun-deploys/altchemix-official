// lib/emails/ThankYouEmail.tsx

interface ThankYouEmailProps {
  name: string; company: string; email: string;
  phone: string; industry: string; product: string; message: string;
}

export function ThankYouEmail(p: ThankYouEmailProps): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>We've received your enquiry ✔ — Altchemix</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">Hi ${p.name}, we've received your enquiry about ${p.product}. We'll be in touch within 24 hours.</span>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

        <!-- ═══ LOGO HEADER ═══ -->
        <tr><td style="background:#ffffff;padding:28px 40px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:10px;">
            <rect width="36" height="36" rx="8" fill="#2563EB"/>
            <path d="M10 26 L18 10 L26 26" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M13 21 L23 21" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <span style="font-size:22px;font-weight:800;color:#111827;vertical-align:middle;letter-spacing:-0.5px;">Altchemix</span>
          <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;">Specialty Chemical Solutions</p>
        </td></tr>

        <!-- ═══ GREEN CONFIRMATION HERO ═══ -->
        <tr><td style="background:linear-gradient(135deg,#166534 0%,#15803d 60%,#16a34a 100%);padding:36px 40px;text-align:center;">
          <!-- Checkmark circle -->
          <table cellpadding="0" cellspacing="0" style="margin:0 auto 16px;width:60px;height:60px;background:rgba(255,255,255,0.2);border-radius:50%;">
            <tr><td align="center" valign="middle" style="font-size:28px;color:#ffffff;font-weight:700;">&#10003;</td></tr>
          </table>
          <h1 style="margin:0 0 10px;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">Enquiry Received!</h1>
          <p style="margin:0;font-size:15px;color:#bbf7d0;line-height:1.6;">We've received your enquiry about<br/>
            <strong style="color:#ffffff;">${p.product}</strong>
          </p>
        </td></tr>

        <!-- ═══ GREETING ═══ -->
        <tr><td style="padding:36px 40px 0;">
          <p style="margin:0 0 8px;font-size:20px;font-weight:700;color:#111827;">Hi ${p.name},</p>
          <p style="margin:0 0 16px;font-size:15px;color:#374151;line-height:1.7;">
            Thank you for contacting <strong>Altchemix</strong>. We have successfully received your enquiry and our team is already on it.
          </p>
          <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">
            One of our specialists will review your requirements and get back to you within <strong>24 business hours</strong>.
          </p>
        </td></tr>

        <!-- ═══ SUBMISSION SUMMARY ═══ -->
        <tr><td style="padding:28px 40px 0;">
          <p style="margin:0 0 12px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:2px;">Your Submission</p>
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;">
            <tr style="background:#f9fafb;">
              <td style="padding:12px 20px;border-bottom:1px solid #e5e7eb;" colspan="2">
                <p style="margin:0;font-size:12px;color:#9ca3af;font-weight:600;text-transform:uppercase;letter-spacing:1px;">Contact Details</p>
              </td>
            </tr>
            <tr>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;width:36%;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Name</td>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;font-weight:600;">${p.name}</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Company</td>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:14px;color:#111827;">${p.company}</td>
            </tr>
            <tr>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:14px;color:#374151;">${p.email}</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Phone</td>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:14px;color:#374151;">${p.phone}</td>
            </tr>
            <tr>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Industry</td>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:14px;color:#374151;">${p.industry}</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Product</td>
              <td style="padding:12px 20px;border-bottom:1px solid #f3f4f6;">
                <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:12px;font-weight:700;padding:4px 12px;border-radius:99px;">${p.product}</span>
              </td>
            </tr>
            <tr>
              <td colspan="2" style="padding:16px 20px;background:#f8faff;border-top:1px solid #e5e7eb;">
                <p style="margin:0 0 8px;font-size:12px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Message</p>
                <p style="margin:0;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${p.message}</p>
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ═══ WHY ALTCHEMIX ═══ -->
        <tr><td style="padding:28px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:#eff6ff;border:1px solid #dbeafe;border-radius:12px;padding:24px 28px;overflow:hidden;">
            <tr><td>
              <p style="margin:0 0 16px;font-size:13px;font-weight:700;color:#1e40af;text-transform:uppercase;letter-spacing:2px;">Why Choose Altchemix?</p>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td width="50%" style="padding:6px 0;">
                    <p style="margin:0;font-size:14px;color:#1e40af;font-weight:500;">&#10004;&nbsp; High Quality Products</p>
                  </td>
                  <td width="50%" style="padding:6px 0;">
                    <p style="margin:0;font-size:14px;color:#1e40af;font-weight:500;">&#10004;&nbsp; Technical Support</p>
                  </td>
                </tr>
                <tr>
                  <td width="50%" style="padding:6px 0;">
                    <p style="margin:0;font-size:14px;color:#1e40af;font-weight:500;">&#10004;&nbsp; Fast Response</p>
                  </td>
                  <td width="50%" style="padding:6px 0;">
                    <p style="margin:0;font-size:14px;color:#1e40af;font-weight:500;">&#10004;&nbsp; Reliable Supply Chain</p>
                  </td>
                </tr>
              </table>
            </td></tr>
          </table>
        </td></tr>

        <!-- ═══ CONTACT ROW ═══ -->
        <tr><td style="padding:28px 40px 0;">
          <table width="100%" cellpadding="0" cellspacing="0"
            style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:22px 28px;">
            <tr><td>
              <p style="margin:0 0 14px;font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:2px;">Need Urgent Assistance?</p>
              <p style="margin:0 0 8px;font-size:14px;color:#374151;">
                &#128231;&nbsp; <a href="mailto:sales@altchemix.com" style="color:#2563EB;text-decoration:none;font-weight:600;">sales@altchemix.com</a>
              </p>
              <p style="margin:0;font-size:14px;color:#374151;">
                &#128222;&nbsp; <a href="tel:+91XXXXXXXXXX" style="color:#2563EB;text-decoration:none;font-weight:600;">+91 XXXXX XXXXX</a>
              </p>
            </td></tr>
          </table>
        </td></tr>

        <!-- ═══ CTA BUTTON ═══ -->
        <tr><td style="padding:28px 40px 0;text-align:center;">
          <a href="https://altchemix.com"
            style="display:inline-block;background:#2563EB;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 44px;border-radius:8px;letter-spacing:0.3px;">
            Visit Website &rarr;
          </a>
        </td></tr>

        <!-- ═══ SIGN OFF ═══ -->
        <tr><td style="padding:28px 40px;">
          <p style="margin:0;font-size:15px;color:#374151;line-height:1.7;">
            Thank you,<br/>
            <strong style="color:#111827;">Altchemix Team</strong>
          </p>
        </td></tr>

        <!-- ═══ FOOTER ═══ -->
        <tr><td style="background:#f9fafb;padding:22px 40px;text-align:center;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;">
          <p style="margin:0 0 4px;font-size:12px;color:#9ca3af;">&#169; 2025 Altchemix. All rights reserved.</p>
          <p style="margin:0;font-size:12px;color:#d1d5db;">You received this because you submitted a contact form on our website.</p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}