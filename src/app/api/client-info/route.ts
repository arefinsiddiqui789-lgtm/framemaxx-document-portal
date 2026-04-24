import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { companyName, date, result, color, status, statusColor } = body;

    // Validate required fields
    if (!companyName || !companyName.trim()) {
      return NextResponse.json(
        { error: "Company name is required" },
        { status: 400 }
      );
    }

    const timestamp = new Date().toLocaleString("en-US", {
      timeZone: "Asia/Dhaka", // Match user's local timezone if possible, or UTC
      dateStyle: "medium",
      timeStyle: "short",
    });

    // Google Sheets Integration
    const sheetWebhookUrl = process.env.CLIENT_INFO_SHEET_WEBHOOK_URL;
    
    if (sheetWebhookUrl) {
      try {
        const sheetResponse = await fetch(sheetWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            timestamp,
            companyName: companyName.trim(),
            date,
            result: result?.trim() || "",
            color: color || "#000000",
            status: status?.trim() || "",
            statusColor: statusColor || "#000000",
          }),
          redirect: "follow",
        });
        
        if (!sheetResponse.ok) {
          console.warn("Google Sheets responded with error:", sheetResponse.status);
        }
      } catch (sheetError) {
        console.error("Failed to append to Google Sheets:", sheetError);
      }
    } else {
      console.warn("CLIENT_INFO_SHEET_WEBHOOK_URL not configured");
    }

    // Also log to console for visibility
    console.log("=".repeat(60));
    console.log("💼 CLIENT INFO UPDATE");
    console.log("=".repeat(60));
    console.log(`Company: ${companyName}`);
    console.log(`Date: ${date}`);
    console.log(`Result: ${result}`);
    console.log(`Status: ${status}`);
    console.log("=".repeat(60));

    return NextResponse.json({
      success: true,
      message: "Client information updated successfully.",
    });
  } catch (error) {
    console.error("Client info update error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
