import bcrypt from "bcrypt";
import db from "@/lib/db";

export async function POST(req) {
  const { name, email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  const user = await db.query(
    `INSERT INTO users (name, email, password)
     VALUES ($1,$2,$3)
     RETURNING *`,
    [name, email, hashed]
  );

  return Response.json(user.rows[0]);
}