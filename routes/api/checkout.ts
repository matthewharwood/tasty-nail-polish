import { Handlers } from "fresh/server.ts";
import type { CheckoutRequest, CheckoutResponse } from "./_types.ts";
import { STRIPE_API_BASE } from "./_types.ts";
import {
  errorResponse,
  extractRequest,
  getStripeHeaders,
  getStripeKey,
  getSiteUrl,
  jsonResponse,
} from "./_utils.ts";

async function createCheckoutSession(
  priceId: string,
  stripeKey: string,
  siteUrl: string,
): Promise<CheckoutResponse> {
  const params = new URLSearchParams({
    mode: "payment",
    "line_items[0][price]": priceId,
    "line_items[0][quantity]": "1",
    success_url: `${siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: siteUrl,
  });

  const response = await fetch(`${STRIPE_API_BASE}/checkout/sessions`, {
    method: "POST",
    headers: getStripeHeaders(stripeKey),
    body: params,
  });

  if (!response.ok) {
    const error = await response.text();
    console.error("Stripe error:", error);
    throw new Error("Failed to create checkout session");
  }

  const session = await response.json();
  return { url: session.url };
}

export const handler: Handlers = {
  async POST(ctx) {
    try {
      const stripeKey = getStripeKey();
      if (!stripeKey) {
        return errorResponse("Stripe key not configured");
      }

      const request = extractRequest(ctx);
      const { priceId }: CheckoutRequest = await request.json();

      if (!priceId) {
        return errorResponse("Price ID required", 400);
      }

      const siteUrl = getSiteUrl(request);
      const result = await createCheckoutSession(priceId, stripeKey, siteUrl);

      return jsonResponse(result);
    } catch (error) {
      console.error("Checkout error:", error);
      return errorResponse(error.message);
    }
  },
};