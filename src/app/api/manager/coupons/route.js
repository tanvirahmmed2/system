import { NextResponse } from "next/server";
import db from "@/lib/db";

// GET all coupons
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (role !== "manager" && role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rows } = await db.query(`
      SELECT c.*, p.name as package_name, u.name as creator_name
      FROM coupons c
      LEFT JOIN packages p ON c.package_id = p.package_id
      LEFT JOIN users u ON c.created_by = u.user_id
      ORDER BY c.created_at DESC
    `);
    
    return NextResponse.json(rows);
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST create coupon
export async function POST(req) {
  try {
    const role = req.headers.get("x-role");
    const userId = req.headers.get("x-user-id");

    if (role !== "manager" && role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const {
      code,
      title,
      description,
      discount_type,
      discount_value,
      package_id,
      minimum_amount,
      usage_limit,
      usage_per_user,
      starts_at,
      expires_at,
      is_active
    } = body;

    if (!code || !discount_type || discount_value === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Convert empty string package_id to null for DB consistency
    const cleanPackageId = package_id === "" ? null : package_id;

    const { rows } = await db.query(
      `INSERT INTO coupons (
        code, title, description, discount_type, discount_value, 
        package_id, minimum_amount, usage_limit, usage_per_user, 
        starts_at, expires_at, is_active, created_by
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      RETURNING *`,
      [
        code.toUpperCase(), 
        title, 
        description, 
        discount_type, 
        discount_value, 
        cleanPackageId, 
        minimum_amount || 0, 
        usage_limit || null, 
        usage_per_user || 1, 
        starts_at || null, 
        expires_at || null, 
        is_active !== undefined ? is_active : true, 
        userId
      ]
    );

    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    console.error("Error creating coupon:", error);
    // Handle unique constraint violation for coupon code
    if (error.code === '23505') {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
