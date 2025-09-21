import type { ErrorResponse } from "./_types.ts";

const JSON_HEADERS = { "Content-Type": "application/json" };

export function jsonResponse<T>(data: T, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}

export function errorResponse(message: string, status = 500): Response {
  const error: ErrorResponse = { error: message };
  return jsonResponse(error, status);
}

export function getStripeKey(): string | null {
  return Deno.env.get("STRIPE_SECRET_KEY") || null;
}

export function getStripeHeaders(apiKey: string): HeadersInit {
  return {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/x-www-form-urlencoded",
  };
}

export function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amount / 100);
}

export function extractRequest(ctx: any): Request {
  return ctx.req || ctx;
}

export function getSiteUrl(request: Request): string {
  const url = new URL(request.url);
  return `${url.protocol}//${url.host}`;
}