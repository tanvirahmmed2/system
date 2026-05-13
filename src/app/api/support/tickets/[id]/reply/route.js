import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function POST(req, { params }) {
  try {
    const { id } = params;
    const userId = req.headers.get("x-user-id");
    const role = req.headers.get("x-role");

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 });
    }

    // Verify ticket access
    const ticketRes = await db.query("SELECT user_id FROM tickets WHERE ticket_id = $1", [id]);
    
    if (ticketRes.rows.length === 0) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    if (!['admin', 'manager', 'support'].includes(role) && String(ticketRes.rows[0].user_id) !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Insert reply
    const { rows } = await db.query(
      `INSERT INTO ticket_replies (ticket_id, user_id, message)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [id, userId, message]
    );

    // Update ticket's updated_at timestamp
    await db.query("UPDATE tickets SET updated_at = now() WHERE ticket_id = $1", [id]);

    // Fetch full reply with user data to return
    const newReplyRes = await db.query(`
      SELECT r.*, u.name as user_name, u.role as user_role
      FROM ticket_replies r
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.reply_id = $1
    `, [rows[0].reply_id]);

    return NextResponse.json(newReplyRes.rows[0], { status: 201 });
  } catch (error) {
    console.error("Error posting ticket reply:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
