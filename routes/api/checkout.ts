import { Handlers } from "fresh/server.ts";

export const handler: Handlers = {
  async POST(req, ctx) {
    try {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
      if (!stripeKey) {
        return Response.json({ error: "Stripe key not configured" }, { status: 500 });
      }

      // In Fresh, the actual Request object is the first parameter
      // Read the body directly
      const body = await req.json();
      const { priceId } = body;

      if (!priceId) {
        return Response.json({ error: "Price ID required" }, { status: 400 });
      }

      // Get the site URL from request
      const url = new URL(req.url);
      const siteUrl = `${url.protocol}//${url.host}`;

      console.log("Creating checkout session for price:", priceId);

      // Create Stripe Checkout Session
      const sessionResponse = await fetch("https://api.stripe.com/v1/checkout/sessions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${stripeKey}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          "mode": "payment",
          "line_items[0][price]": priceId,
          "line_items[0][quantity]": "1",
          "success_url": `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
          "cancel_url": `${siteUrl}/`,
        }),
      });

      if (!sessionResponse.ok) {
        const error = await sessionResponse.text();
        console.error("Stripe error:", error);
        return Response.json({ error: `Stripe error: ${error}` }, { status: 500 });
      }

      const session = await sessionResponse.json();
      console.log("Checkout session created:", session.id, "URL:", session.url);

      return Response.json({ url: session.url });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return Response.json({ error: error.message }, { status: 500 });
    }
  },
};