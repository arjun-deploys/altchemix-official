// lib/emails/AdminNotificationEmail.tsx

interface AdminEmailProps {
  name: string;
  company: string;
  email: string;
  phone: string;
  industry: string;
  product: string;
  message: string;
  receivedAt?: string;
}

export function AdminNotificationEmail(p: AdminEmailProps): string {
  const received =
    p.receivedAt ??
    new Date().toLocaleString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0"/>
  <title>New Enquiry — Altchemix</title>
</head>
<body style="margin:0;padding:0;background:#f0f4f8;font-family:'Segoe UI',Arial,sans-serif;">
  <span style="display:none;max-height:0;overflow:hidden;">&#128640; New enquiry from ${p.name} at ${p.company} — action required</span>

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f0f4f8;padding:40px 16px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.10);">

        <!-- ═══ LOGO HEADER ═══ -->
        <tr><td style="background:#ffffff;padding:28px 40px 20px;text-align:center;border-bottom:1px solid #e5e7eb;">
          <!-- SVG Logo mark -->
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" style="display:inline-block;vertical-align:middle;margin-right:10px;">
            <rect width="36" height="36" rx="8" fill="#2563EB"/>
            <path d="M10 26 L18 10 L26 26" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M13 21 L23 21" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round"/>
          </svg>
          <span style="font-size:22px;font-weight:800;color:#111827;vertical-align:middle;letter-spacing:-0.5px;">Altchemix</span>
          <p style="margin:4px 0 0;font-size:11px;color:#9ca3af;letter-spacing:2px;text-transform:uppercase;">Internal CRM Notification</p>
        </td></tr>

        <!-- ═══ BLUE HERO BANNER ═══ -->
        <tr><td style="background:linear-gradient(135deg,#1d4ed8 0%,#2563EB 60%,#3b82f6 100%);padding:32px 40px;text-align:center;">
          <div style="font-size:32px;margin-bottom:10px;">&#128640;</div>
          <h1 style="margin:0;font-size:22px;font-weight:700;color:#ffffff;line-height:1.3;">New Website Enquiry Received</h1>
          <p style="margin:8px 0 0;font-size:14px;color:#bfdbfe;line-height:1.5;">A new lead has been submitted via the Altchemix contact form</p>
        </td></tr>

        <!-- ═══ STATUS ROW ═══ -->
        <tr><td style="background:#eff6ff;padding:14px 40px;border-bottom:1px solid #dbeafe;">
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr>
              <td style="font-size:13px;color:#1e40af;font-weight:600;">
                &#128994;&nbsp;&nbsp;Status: <strong>NEW LEAD</strong>
              </td>
              <td align="right" style="font-size:13px;color:#6b7280;">
                &#128336;&nbsp; ${received}
              </td>
            </tr>
          </table>
        </td></tr>

        <!-- ═══ BODY ═══ -->
        <tr><td style="padding:36px 40px;">

          <p style="margin:0 0 24px;font-size:15px;color:#374151;line-height:1.6;">
            A new enquiry has been submitted through the website. Please review the details below and follow up with the lead.
          </p>

          <!-- Contact details table -->
          <table width="100%" cellpadding="0" cellspacing="0"
            style="border:1px solid #e5e7eb;border-radius:10px;overflow:hidden;margin-bottom:28px;">
            <tr style="background:#f9fafb;">
              <td colspan="2" style="padding:12px 20px;border-bottom:1px solid #e5e7eb;">
                <p style="margin:0;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:2px;">Lead Information</p>
              </td>
            </tr>
            <tr>
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;width:36%;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Name</td>
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;font-size:15px;color:#111827;font-weight:600;">${p.name}</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Company</td>
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;font-size:15px;color:#111827;">${p.company}</td>
            </tr>
            <tr>
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Email</td>
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;">
                <a href="mailto:${p.email}" style="font-size:15px;color:#2563EB;text-decoration:none;font-weight:500;">${p.email}</a>
              </td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Phone</td>
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;">
                <a href="tel:${p.phone}" style="font-size:15px;color:#2563EB;text-decoration:none;">${p.phone}</a>
              </td>
            </tr>
            <tr>
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Industry</td>
              <td style="padding:13px 20px;border-bottom:1px solid #f3f4f6;font-size:15px;color:#111827;">${p.industry}</td>
            </tr>
            <tr style="background:#fafafa;">
              <td style="padding:13px 20px;font-size:13px;font-weight:600;color:#6b7280;text-transform:uppercase;letter-spacing:0.5px;">Product</td>
              <td style="padding:13px 20px;">
                <span style="display:inline-block;background:#dbeafe;color:#1d4ed8;font-size:12px;font-weight:700;padding:4px 14px;border-radius:99px;letter-spacing:0.3px;">${p.product}</span>
              </td>
            </tr>
          </table>

          <!-- Message box -->
          <p style="margin:0 0 10px;font-size:11px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:2px;">Message</p>
          <div style="background:#f8faff;border:1px solid #dbeafe;border-left:4px solid #2563EB;border-radius:0 8px 8px 0;padding:18px 22px;margin-bottom:28px;">
            <p style="margin:0;font-size:15px;color:#374151;line-height:1.75;white-space:pre-wrap;">${p.message}</p>
          </div>

          <!-- Received + Status row -->
          <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
            <tr>
              <td width="48%" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">Received</p>
                <p style="margin:0;font-size:14px;color:#111827;font-weight:600;">${received}</p>
              </td>
              <td width="4%"></td>
              <td width="48%" style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:10px;padding:16px 20px;">
                <p style="margin:0 0 4px;font-size:11px;font-weight:700;color:#9ca3af;text-transform:uppercase;letter-spacing:1.5px;">Status</p>
                <p style="margin:0;font-size:14px;color:#15803d;font-weight:700;">&#128994; NEW LEAD</p>
              </td>
            </tr>
          </table>

          <!-- CTA Button -->
          <table width="100%" cellpadding="0" cellspacing="0">
            <tr><td align="center">
              <a href="https://altchemix.com/admin"
                style="display:inline-block;background:#2563EB;color:#ffffff;font-size:15px;font-weight:700;text-decoration:none;padding:15px 44px;border-radius:8px;letter-spacing:0.3px;">
                Open Admin Dashboard &rarr;
              </a>
            </td></tr>
          </table>

        </td></tr>

        <!-- ═══ FOOTER ═══ -->
        <tr><td style="background:#f9fafb;padding:22px 40px;text-align:center;border-top:1px solid #e5e7eb;border-radius:0 0 16px 16px;">
          <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.6;">
            This is an automated internal notification from the Altchemix website.<br/>
            Do not reply to this email — use the dashboard to manage leads.
          </p>
        </td></tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`;
}
