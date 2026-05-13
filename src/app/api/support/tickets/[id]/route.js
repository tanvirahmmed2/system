import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET ticket details and replies
export async function GET(req, { params }) {
  try {
    const { id } = params;
    const role = req.headers.get("x-role");
    const userId = req.headers.get("x-user-id");

    // Fetch the ticket
    const ticketRes = await db.query(`
      SELECT t.*, u.name as user_name, u.email as user_email, a.name as assigned_name 
      FROM tickets t
      LEFT JOIN users u ON t.user_id = u.user_id
      LEFT JOIN users a ON t.assigned_to = a.user_id
      WHERE t.ticket_id = $1
    `, [id]);

    if (ticketRes.rows.length === 0) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    const ticket = ticketRes.rows[0];

    // Check authorization: only admin/manager/support or the ticket owner can view
    if (!['admin', 'manager', 'support'].includes(role) && String(ticket.user_id) !== userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Fetch replies
    const repliesRes = await db.query(`
      SELECT r.*, u.name as user_name, u.role as user_role
      FROM ticket_replies r
      LEFT JOIN users u ON r.user_id = u.user_id
      WHERE r.ticket_id = $1
      ORDER BY r.created_at ASC
    `, [id]);

    return NextResponse.json({
      ...ticket,
      replies: repliesRes.rows
    });
  } catch (error) {
    console.error("Error fetching ticket details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH update ticket status
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const role = req.headers.get("x-role");

    // Only support staff can update status
    if (!['admin', 'manager', 'support'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { status } = await req.json();

    if (!status) {
      return NextResponse.json({ error: "Status is required" }, { status: 400 });
    }

    const { rows } = await db.query(
      "UPDATE tickets SET status = $1, updated_at = now() WHERE ticket_id = $2 RETURNING *",
      [status, id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Ticket not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error updating ticket:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
