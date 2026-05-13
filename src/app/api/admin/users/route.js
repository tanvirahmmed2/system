import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET all users (admin only)
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query(
      `SELECT user_id, name, email, phone, role, is_active, created_at 
       FROM users 
       ORDER BY created_at DESC`
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// PATCH update user role (admin only)
export async function PATCH(req) {
  try {
    const role = req.headers.get("x-role");
    if (role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { user_id, new_role } = await req.json();

    if (!user_id || !new_role) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate role
    const validRoles = ['admin', 'manager', 'support', 'developer', 'user'];
    if (!validRoles.includes(new_role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    await db.query(
      "UPDATE users SET role = $1, updated_at = now() WHERE user_id = $2",
      [new_role, user_id]
    );

    return NextResponse.json({ message: "User role updated successfully" });
  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
