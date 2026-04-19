import { v4 as uuidv4 } from "uuid";

export interface ClientFormData {
  fullName: string;
  email: string;
  businessName: string;
  projectType: string;
  budgetRange: string;
  projectTimeline: string;
  featuresRequired: string;
  referenceWebsites: string;
  additionalNotes: string;
}

export function generateSubmissionId(): string {
  const date = new Date();
  const dateStr = date.toISOString().slice(0, 10).replace(/-/g, "");
  const shortId = uuidv4().slice(0, 8).toUpperCase();
  return `FMX-${dateStr}-${shortId}`;
}

export function formatTimestamp(): string {
  return new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
}

export function generateAgencyEmail(
  data: ClientFormData,
  submissionId: string,
  timestamp: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FrameMaxx Client Submission</title>
  <style>
    @page {
      size: A4;
      margin: 0;
    }
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f0f0f0;
      color: #1a1a1a;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .page-container {
      max-width: 800px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 60px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      min-height: 1056px;
    }
    .header {
      text-align: center;
      padding-bottom: 30px;
      border-bottom: 3px solid #D4AF37;
      margin-bottom: 36px;
    }
    .logo-section {
      margin-bottom: 16px;
    }
    .logo-mark {
      display: inline-block;
      width: 48px;
      height: 48px;
      background: linear-gradient(135deg, #D4AF37 0%, #B8960C 100%);
      border-radius: 8px;
      position: relative;
      margin-bottom: 12px;
    }
    .logo-mark::after {
      content: "⬆";
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 24px;
      color: #1a1a1a;
    }
    .header h1 {
      font-size: 26px;
      font-weight: 700;
      color: #1a1a1a;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .header .subtitle {
      font-size: 13px;
      color: #888888;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    .meta-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fafafa;
      border: 1px solid #e8e8e8;
      border-radius: 6px;
      padding: 12px 20px;
      margin-bottom: 32px;
      font-size: 12px;
      color: #666;
    }
    .meta-bar .submission-id {
      font-weight: 700;
      color: #D4AF37;
      letter-spacing: 1px;
    }
    .section {
      margin-bottom: 28px;
    }
    .section-header {
      font-size: 14px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #D4AF37;
      margin-bottom: 14px;
      padding-bottom: 8px;
      border-bottom: 1px solid #e8e8e8;
    }
    .field-row {
      display: flex;
      margin-bottom: 10px;
      font-size: 14px;
    }
    .field-label {
      flex: 0 0 160px;
      font-weight: 600;
      color: #444444;
    }
    .field-value {
      flex: 1;
      color: #1a1a1a;
    }
    .paragraph-content {
      font-size: 14px;
      color: #333333;
      line-height: 1.7;
      white-space: pre-wrap;
      background-color: #fafafa;
      border-left: 3px solid #D4AF37;
      padding: 14px 18px;
      border-radius: 0 4px 4px 0;
    }
    .footer {
      margin-top: 48px;
      padding-top: 24px;
      border-top: 2px solid #D4AF37;
      text-align: center;
    }
    .footer p {
      font-size: 12px;
      color: #999999;
      margin-bottom: 4px;
    }
    .footer .brand {
      font-weight: 700;
      color: #D4AF37;
      font-size: 13px;
      letter-spacing: 1px;
    }
    .watermark {
      position: relative;
      text-align: center;
      margin-top: 16px;
      font-size: 10px;
      color: #cccccc;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <!-- Header -->
    <div class="header">
      <div class="logo-section">
        <div class="logo-mark"></div>
      </div>
      <h1>FrameMaxx Client Submission</h1>
      <div class="subtitle">New Project Intake Request</div>
    </div>

    <!-- Meta Bar -->
    <div class="meta-bar">
      <div>Submitted: ${timestamp}</div>
      <div>Submission ID: <span class="submission-id">${submissionId}</span></div>
    </div>

    <!-- Client Information -->
    <div class="section">
      <div class="section-header">Client Information</div>
      <div class="field-row">
        <span class="field-label">Full Name:</span>
        <span class="field-value">${escapeHtml(data.fullName)}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Email Address:</span>
        <span class="field-value">${escapeHtml(data.email)}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Business Name:</span>
        <span class="field-value">${escapeHtml(data.businessName || "Not provided")}</span>
      </div>
    </div>

    <!-- Project Details -->
    <div class="section">
      <div class="section-header">Project Details</div>
      <div class="field-row">
        <span class="field-label">Project Type:</span>
        <span class="field-value">${escapeHtml(data.projectType)}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Budget Range:</span>
        <span class="field-value">${escapeHtml(data.budgetRange || "Not specified")}</span>
      </div>
      <div class="field-row">
        <span class="field-label">Project Timeline:</span>
        <span class="field-value">${escapeHtml(data.projectTimeline || "Not specified")}</span>
      </div>
    </div>

    <!-- Features Required -->
    <div class="section">
      <div class="section-header">Features Required</div>
      <div class="paragraph-content">${escapeHtml(data.featuresRequired || "No specific features mentioned")}</div>
    </div>

    <!-- Reference Websites -->
    <div class="section">
      <div class="section-header">Reference Websites</div>
      <div class="paragraph-content">${escapeHtml(data.referenceWebsites || "No references provided")}</div>
    </div>

    <!-- Additional Notes -->
    <div class="section">
      <div class="section-header">Additional Notes</div>
      <div class="paragraph-content">${escapeHtml(data.additionalNotes || "No additional notes")}</div>
    </div>

    <!-- Footer -->
    <div class="footer">
      <p class="brand">FRAMEMAXX</p>
      <p>Submitted via FrameMaxx Website</p>
      <div class="watermark">
        This is an automated submission from the FrameMaxx client intake system.
      </div>
    </div>
  </div>
</body>
</html>`;
}

export function generateClientConfirmationEmail(
  data: ClientFormData,
  submissionId: string,
  timestamp: string
): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FrameMaxx - Submission Confirmed</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f0f0f0;
      color: #1a1a1a;
      line-height: 1.6;
      -webkit-font-smoothing: antialiased;
    }
    .page-container {
      max-width: 600px;
      margin: 40px auto;
      background-color: #ffffff;
      padding: 48px;
      border-radius: 8px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    }
    .header {
      text-align: center;
      padding-bottom: 24px;
      border-bottom: 2px solid #D4AF37;
      margin-bottom: 28px;
    }
    .header h1 {
      font-size: 22px;
      font-weight: 700;
      color: #1a1a1a;
      margin-bottom: 4px;
    }
    .header .subtitle {
      font-size: 13px;
      color: #888;
    }
    .content p {
      font-size: 14px;
      color: #333;
      margin-bottom: 14px;
    }
    .content .highlight {
      font-weight: 700;
      color: #D4AF37;
    }
    .submission-box {
      background: #fafafa;
      border: 1px solid #e8e8e8;
      border-left: 3px solid #D4AF37;
      padding: 16px 20px;
      margin: 20px 0;
      border-radius: 0 6px 6px 0;
    }
    .submission-box .id-label {
      font-size: 12px;
      color: #888;
      text-transform: uppercase;
      letter-spacing: 1px;
    }
    .submission-box .id-value {
      font-size: 16px;
      font-weight: 700;
      color: #D4AF37;
      letter-spacing: 1px;
    }
    .summary-row {
      display: flex;
      margin-bottom: 8px;
      font-size: 13px;
    }
    .summary-label {
      flex: 0 0 130px;
      font-weight: 600;
      color: #555;
    }
    .summary-value {
      flex: 1;
      color: #1a1a1a;
    }
    .footer {
      margin-top: 32px;
      padding-top: 20px;
      border-top: 1px solid #e8e8e8;
      text-align: center;
      font-size: 12px;
      color: #999;
    }
    .footer .brand {
      font-weight: 700;
      color: #D4AF37;
      font-size: 13px;
    }
  </style>
</head>
<body>
  <div class="page-container">
    <div class="header">
      <h1>Submission Confirmed</h1>
      <div class="subtitle">FrameMaxx Web Development Agency</div>
    </div>

    <div class="content">
      <p>Hi <span class="highlight">${escapeHtml(data.fullName)}</span>,</p>
      <p>Thank you for submitting your project request to FrameMaxx. We have received your information and our team will review it carefully.</p>
      
      <div class="submission-box">
        <div class="id-label">Your Submission ID</div>
        <div class="id-value">${submissionId}</div>
        <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee;">
          <div class="summary-row">
            <span class="summary-label">Project Type:</span>
            <span class="summary-value">${escapeHtml(data.projectType)}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Budget Range:</span>
            <span class="summary-value">${escapeHtml(data.budgetRange || "Not specified")}</span>
          </div>
          <div class="summary-row">
            <span class="summary-label">Timeline:</span>
            <span class="summary-value">${escapeHtml(data.projectTimeline || "Not specified")}</span>
          </div>
        </div>
      </div>

      <p>A member of our team will reach out to you within <span class="highlight">24-48 business hours</span> to discuss your project in detail.</p>
      <p>If you have any questions in the meantime, feel free to reply to this email.</p>
      <p>Best regards,<br/><span class="highlight">The FrameMaxx Team</span></p>
    </div>

    <div class="footer">
      <p class="brand">FRAMEMAXX</p>
      <p>Submitted: ${timestamp}</p>
    </div>
  </div>
</body>
</html>`;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}
