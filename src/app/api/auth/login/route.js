import db from "@/lib/db/client";
import bcrypt from "bcryptjs";
import { signToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST(req) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    // Find user
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    const user = result.rows[0];

    if (!user) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json({ message: "Invalid credentials" }, { status: 401 });
    }

    // Sign token
    const token = signToken({
      userId: user.user_id,
      email: user.email,
      role: user.role,
    });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("disibin", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    const roleRoutes = {
      super_admin: "/admin",
      platform_admin: "/admin",
      manager: "/manager",
      developer: "/developer",
      support: "/support",
      tenant_user: "/dashboard/user",
      user: "/dashboard/user",
    };

    return Response.json({
      message: "Login successful",
      redirect: roleRoutes[user.role] || "/dashboard/user",
      user: {
        userId: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}