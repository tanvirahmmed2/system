import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
    }

    const { rows } = await db.query(
      `INSERT INTO contact_messages (name, email, subject, message, status)
       VALUES ($1, $2, $3, $4, 'unread')
       RETURNING *`,
      [name, email, subject || "General Inquiry", message]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error submitting contact message:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
