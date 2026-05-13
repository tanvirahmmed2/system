import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET all tickets
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    const userId = req.headers.get("x-user-id");
    
    let query;
    let params = [];

    if (['admin', 'manager', 'support'].includes(role)) {
      // Support staff sees all tickets
      query = `
        SELECT t.*, u.name as user_name, u.email as user_email, a.name as assigned_name 
        FROM tickets t
        LEFT JOIN users u ON t.user_id = u.user_id
        LEFT JOIN users a ON t.assigned_to = a.user_id
        ORDER BY t.created_at DESC
      `;
    } else {
      // Regular users see their own tickets
      query = `
        SELECT t.*, u.name as user_name, u.email as user_email, a.name as assigned_name 
        FROM tickets t
        LEFT JOIN users u ON t.user_id = u.user_id
        LEFT JOIN users a ON t.assigned_to = a.user_id
        WHERE t.user_id = $1
        ORDER BY t.created_at DESC
      `;
      params = [userId];
    }

    const { rows } = await db.query(query, params);
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST create ticket
export async function POST(req) {
  try {
    const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { subject, message, priority } = await req.json();

    if (!subject || !message) {
      return NextResponse.json({ error: "Subject and message are required" }, { status: 400 });
    }

    const { rows } = await db.query(
      `INSERT INTO tickets (user_id, subject, message, priority, status)
       VALUES ($1, $2, $3, $4, 'open')
       RETURNING *`,
      [userId, subject, message, priority || 'medium']
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
