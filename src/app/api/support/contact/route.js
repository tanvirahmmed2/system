import { NextResponse } from "next/server";
import db from "@/lib/db";
import { sendBrevoReply } from "@/lib/support/brevo";

export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager', 'support'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query(
      "SELECT * FROM contact_messages ORDER BY created_at DESC"
    );
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    const role = req.headers.get("x-role");
    if (!['admin', 'manager', 'support'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { message_id, toEmail, toName, subject, message } = await req.json();

    if (!toEmail || !message || !subject) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Format the email content
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-w: 600px; margin: 0 auto;">
        <h2>Support Reply from Disibin</h2>
        <p>Dear ${toName || "Customer"},</p>
        <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
          ${message.replace(/\n/g, "<br>")}
        </div>
        <p>Best regards,<br>Disibin Support Team</p>
      </div>
    `;

    // Dispatch email via Brevo
    const brevoResult = await sendBrevoReply(toEmail, toName || "Customer", subject, htmlContent);

    if (!brevoResult.success) {
      return NextResponse.json({ error: "Failed to send email via Brevo: " + brevoResult.error }, { status: 500 });
    }

    // If message_id is provided, mark it as replied
    if (message_id) {
      await db.query(
        "UPDATE contact_messages SET status = 'replied' WHERE message_id = $1",
        [message_id]
      );
    }

    return NextResponse.json({ success: true, message: "Reply sent successfully" });
  } catch (error) {
    console.error("Error sending contact reply:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
