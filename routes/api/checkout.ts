import { Handlers } from "fresh/server.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
      if (!stripeKey) {
        return new Response(JSON.stringify({ error: "Stripe key not configured" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Read body as stream - Fresh 2.5 production compatible
      const decoder = new TextDecoder();
      let bodyText = "";

      for await (const chunk of req.body) {
        bodyText += decoder.decode(chunk);
      }

      if (!bodyText) {
        return new Response(JSON.stringify({ error: "No request body" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }

      const { priceId } = JSON.parse(bodyText);

      if (!priceId) {
        return new Response(JSON.stringify({ error: "Price ID required" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
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
        return new Response(JSON.stringify({ error: `Failed to create checkout session` }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      const session = await sessionResponse.json();
      console.log("Checkout session created:", session.id, "URL:", session.url);

      return new Response(JSON.stringify({ url: session.url }), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error creating checkout session:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};