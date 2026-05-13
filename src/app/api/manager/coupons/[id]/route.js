import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const role = req.headers.get("x-role");

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

    const cleanPackageId = package_id === "" ? null : package_id;

    const { rows } = await db.query(
      `UPDATE coupons SET
        code = $1, 
        title = $2, 
        description = $3, 
        discount_type = $4, 
        discount_value = $5, 
        package_id = $6, 
        minimum_amount = $7, 
        usage_limit = $8, 
        usage_per_user = $9, 
        starts_at = $10, 
        expires_at = $11, 
        is_active = $12, 
        updated_at = now()
      WHERE coupon_id = $13
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
        is_active, 
        id
      ]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error updating coupon:", error);
    if (error.code === '23505') {
      return NextResponse.json({ error: "Coupon code already exists" }, { status: 409 });
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const role = req.headers.get("x-role");

    if (role !== "manager" && role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rowCount } = await db.query(
      "DELETE FROM coupons WHERE coupon_id = $1",
      [id]
    );

    if (rowCount === 0) {
      return NextResponse.json({ error: "Coupon not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
