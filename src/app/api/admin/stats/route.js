import { NextResponse } from "next/server";
import db from "@/lib/db/client";

// GET platform statistics (admin only)
export async function GET(req) {
  try {
    const role = req.headers.get("x-role");
    if (role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Total Revenue
    const revenueRes = await db.query(
      "SELECT SUM(amount) as total FROM purchases WHERE status = 'completed'"
    );
    
    // Total Users
    const usersRes = await db.query("SELECT COUNT(*) as total FROM users");
    
    // Total Tenants
    const tenantsRes = await db.query("SELECT COUNT(*) as total FROM tenants");
    
    // Active Websites
    const websitesRes = await db.query("SELECT COUNT(*) as total FROM websites WHERE status = 'active'");

    // Revenue per category (example of more deep stats)
    const categoryStats = await db.query(`
      SELECT pkg.category, SUM(p.amount) as total
      FROM purchases p
      JOIN packages pkg ON p.package_id = pkg.package_id
      WHERE p.status = 'completed'
      GROUP BY pkg.category
    `);

    return NextResponse.json({
      totalRevenue: parseFloat(revenueRes.rows[0]?.total || 0),
      totalUsers: parseInt(usersRes.rows[0]?.total || 0),
      totalTenants: parseInt(tenantsRes.rows[0]?.total || 0),
      activeWebsites: parseInt(websitesRes.rows[0]?.total || 0),
      categoryStats: categoryStats.rows
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
