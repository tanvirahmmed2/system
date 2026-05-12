import { stripe } from "@/lib/stripe/stripe";

export async function POST(req) {
  const { priceId, tenantId, userId } = await req.json();

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    mode: "subscription",

    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],

    metadata: {
      tenantId,
      userId,
    },

    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/success`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard/billing`,
  });

  return Response.json({ url: session.url });
}