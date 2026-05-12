export async function POST(req) {
  const { name, price, duration, features, category } = await req.json();

  const result = await db.query(
    `INSERT INTO packages
     (name, price, duration_days, category_id)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [name, price, duration, category]
  );

  return Response.json(result.rows[0]);
}