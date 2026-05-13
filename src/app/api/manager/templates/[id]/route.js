import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// PATCH update template
export async function PATCH(req, { params }) {
  try {
    const { id } = params;
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const body = await req.json();
    const fields = Object.keys(body);
    const values = Object.values(body);

    if (fields.length === 0) {
      return NextResponse.json({ error: "No fields to update" }, { status: 400 });
    }

    const setClause = fields.map((f, i) => `${f} = $${i + 1}`).join(", ");
    values.push(id);

    const { rows } = await db.query(
      `UPDATE site_templates SET ${setClause}, updated_at = now() WHERE template_id = $${values.length} RETURNING *`,
      values
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error("Error updating template:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// DELETE template
export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    const role = req.headers.get("x-role");
    if (!['admin', 'manager'].includes(role)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { rowCount } = await db.query("DELETE FROM site_templates WHERE template_id = $1", [id]);

    if (rowCount === 0) {
      return NextResponse.json({ error: "Template not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Template deleted successfully" });
  } catch (error) {
    console.error("Error deleting template:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
