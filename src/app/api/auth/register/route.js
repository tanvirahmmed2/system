import db from "@/lib/db/client";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return Response.json({ message: "Missing fields" }, { status: 400 });
    }

    // Check if user already exists
    const checkUser = await db.query("SELECT * FROM users WHERE email = $1", [email]);
    if (checkUser.rows.length > 0) {
      return Response.json({ message: "User already exists" }, { status: 400 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING user_id, name, email",
      [name, email, hashedPassword]
    );

    return Response.json(
      { message: "User registered successfully", user: newUser.rows[0] },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration Error:", error);
    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}