import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  ClientFormData,
  generateSubmissionId,
  formatTimestamp,
  generateAgencyEmail,
  generateClientConfirmationEmail,
} from "@/lib/email-template";

// Configure transporter
// For Gmail, you need an App Password: https://myaccount.google.com/apppasswords
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER || "",
    pass: process.env.SMTP_PASS || "",
  },
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      fullName,
      email,
      businessName,
      projectType,
      budgetRange,
      projectTimeline,
      orderDate,
      deliveryDate,
      featuresRequired,
      referenceWebsites,
      additionalNotes,
      agreedToTerms,
    }: ClientFormData & { agreedToTerms: boolean } = body;

    // Validate required fields
    if (!fullName || !fullName.trim()) {
      return NextResponse.json(
        { error: "Full name is required" },
        { status: 400 }
      );
    }
    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "Email address is required" },
        { status: 400 }
      );
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address format" },
        { status: 400 }
      );
    }

    if (!projectType || !projectType.trim()) {
      return NextResponse.json(
        { error: "Please select a Project Type" },
        { status: 400 }
      );
    }

    if (!agreedToTerms) {
      return NextResponse.json(
        { error: "You must agree to the Terms of Service and Privacy Policy" },
        { status: 400 }
      );
    }

    const data: ClientFormData = {
      fullName: fullName.trim(),
      email: email.trim(),
      businessName: businessName?.trim() || "",
      projectType: projectType.trim(),
      budgetRange: budgetRange?.trim() || "",
      projectTimeline: projectTimeline?.trim() || "",
      orderDate: orderDate?.trim() || "",
      deliveryDate: deliveryDate?.trim() || "",
      featuresRequired: featuresRequired?.trim() || "",
      referenceWebsites: referenceWebsites?.trim() || "",
      additionalNotes: additionalNotes?.trim() || "",
    };

    const submissionId = generateSubmissionId();
    const timestamp = formatTimestamp();

    const agencyEmailHtml = generateAgencyEmail(data, submissionId, timestamp);
    const clientEmailHtml = generateClientConfirmationEmail(
      data,
      submissionId,
      timestamp
    );

    const agencyEmail = process.env.AGENCY_EMAIL || process.env.SMTP_USER || "framemaxx26@gmail.com";

    // Google Sheets Integration
    const sheetWebhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
    console.log("Sheet Webhook URL configured:", !!sheetWebhookUrl);

    if (sheetWebhookUrl) {
      try {
        console.log("Sending data to Google Sheets...");
        const sheetResponse = await fetch(sheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            submissionId,
            timestamp,
            ...data
          }),
          redirect: "follow", // Important for Google Apps Script redirects
        });
        
        if (sheetResponse.ok) {
          console.log("Data sent to Google Sheets successfully (Status: OK)");
        } else {
          console.warn("Google Sheets responded with error:", sheetResponse.status, sheetResponse.statusText);
        }
      } catch (sheetError) {
        console.error("Failed to append to Google Sheets:", sheetError);
      }
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
      // In development mode, just log the submission and return success
      console.log("=".repeat(60));
      console.log("📧 NEW CLIENT SUBMISSION (Dev Mode - No SMTP configured)");
      console.log("=".repeat(60));
      console.log(`Submission ID: ${submissionId}`);
      console.log(`Timestamp: ${timestamp}`);
      console.log(`Name: ${data.fullName}`);
      console.log(`Email: ${data.email}`);
      console.log(`Business: ${data.businessName || "N/A"}`);
      console.log(`Project Type: ${data.projectType}`);
      console.log(`Budget: ${data.budgetRange || "N/A"}`);
      console.log(`Timeline: ${data.projectTimeline || "N/A"}`);
      console.log(`Order Date: ${data.orderDate || "N/A"}`);
      console.log(`Delivery Date: ${data.deliveryDate || "N/A"}`);
      console.log(`Features: ${data.featuresRequired || "N/A"}`);
      console.log(`References: ${data.referenceWebsites || "N/A"}`);
      console.log(`Notes: ${data.additionalNotes || "N/A"}`);
      console.log("=".repeat(60));

      return NextResponse.json({
        success: true,
        submissionId,
        message:
          "Your project request has been submitted successfully to Google Sheets and our team. FrameMaxx will contact you soon.",
        devMode: true,
      });
    }

    // Send email to agency
    await transporter.sendMail({
      from: `"FrameMaxx Intake" <${process.env.SMTP_USER}>`,
      to: agencyEmail,
      subject: `[FrameMaxx] New Client Submission - ${data.fullName} (${submissionId})`,
      html: agencyEmailHtml,
      replyTo: data.email,
    });

    // Send confirmation email to client
    try {
      await transporter.sendMail({
        from: `"FrameMaxx" <${process.env.SMTP_USER}>`,
        to: data.email,
        subject: `FrameMaxx - Submission Confirmed (${submissionId})`,
        html: clientEmailHtml,
      });
    } catch (clientEmailError) {
      // Log but don't fail if client email fails
      console.error("Failed to send client confirmation email:", clientEmailError);
    }

    return NextResponse.json({
      success: true,
      submissionId,
      message:
        "Your project request has been submitted successfully. FrameMaxx will contact you soon.",
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
