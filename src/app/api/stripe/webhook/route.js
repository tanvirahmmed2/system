import { stripe } from "@/lib/stripe/stripe";
import db from "@/lib/db";

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return new Response("Webhook Error", { status: 400 });
  }

  // =========================
  // PAYMENT SUCCESS
  // =========================
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const tenantId = session.metadata.tenantId;
    const userId = session.metadata.userId;

    await db.query(
      `INSERT INTO subscriptions (
        user_id,
        tenant_id,
        stripe_subscription_id,
        status,
        current_period_start,
        current_period_end
      )
      VALUES ($1,$2,$3,'active',NOW(),NOW() + INTERVAL '30 days')`,
      [
        userId,
        tenantId,
        session.subscription,
      ]
    );
  }

  // =========================
  // SUBSCRIPTION UPDATED
  // =========================
  if (event.type === "customer.subscription.updated") {
    const sub = event.data.object;

    await db.query(
      `UPDATE subscriptions
       SET status = $1
       WHERE stripe_subscription_id = $2`,
      [sub.status, sub.id]
    );
  }

  // =========================
  // SUBSCRIPTION CANCELED
  // =========================
  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object;

    await db.query(
      `UPDATE subscriptions
       SET status = 'canceled'
       WHERE stripe_subscription_id = $1`,
      [sub.id]
    );
  }

  return new Response("OK");
}