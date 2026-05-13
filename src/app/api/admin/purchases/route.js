import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET all purchases (admin only)
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query(
      `SELECT p.purchase_id, p.amount, p.status, p.created_at, 
              u.name as user_name, u.email as user_email,
              pkg.name as package_name
       FROM purchases p
       JOIN users u ON p.user_id = u.user_id
       LEFT JOIN packages pkg ON p.package_id = pkg.package_id
       ORDER BY p.created_at DESC`
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching purchases:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
