import db from "@/lib/db";
import bcrypt from "bcrypt";
import { signToken } from "@/lib/auth/jwt";

export async function POST(req) {
  const { email, password } = await req.json();

  const userRes = await db.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );

  const user = userRes.rows[0];

  if (!user) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return Response.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // get tenant membership
  const tenantRes = await db.query(
    "SELECT tenant_id, role FROM tenant_users WHERE user_id = $1 LIMIT 1",
    [user.user_id]
  );

  const tenant = tenantRes.rows[0];

  const token = signToken({
    user_id: user.user_id,
    tenant_id: tenant?.tenant_id,
    role: tenant?.role || "user",
  });

  return Response.json({ token });
}