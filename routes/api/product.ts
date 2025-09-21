import { Handlers } from "fresh/server.ts";
import type {
  ProductResponse,
  StripePrice,
  StripeProduct,
} from "./_types.ts";
import { PRODUCT_ID, STRIPE_API_BASE } from "./_types.ts";
import {
  errorResponse,
  formatPrice,
  getStripeKey,
  jsonResponse,
} from "./_utils.ts";

async function fetchStripeData<T>(
  endpoint: string,
  stripeKey: string,
): Promise<T> {
  const response = await fetch(`${STRIPE_API_BASE}/${endpoint}`, {
    headers: { Authorization: `Bearer ${stripeKey}` },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${response.status}`);
  }

  return response.json();
}

function transformProductData(
  product: StripeProduct,
  price?: StripePrice,
): ProductResponse {
  return {
    id: product.id,
    name: product.name,
    description: product.description,
    images: product.images,
    active: product.active,
    price: price
      ? {
          id: price.id,
          amount: price.unit_amount,
          currency: price.currency,
          formatted: formatPrice(price.unit_amount || 0, price.currency),
        }
      : null,
  };
}

export const handler: Handlers = {
  async GET() {
    try {
      const stripeKey = getStripeKey();
      if (!stripeKey) {
        return errorResponse("Stripe key not configured");
      }

      const [product, prices] = await Promise.all([
        fetchStripeData<StripeProduct>(`products/${PRODUCT_ID}`, stripeKey),
        fetchStripeData<{ data: StripePrice[] }>(
          `prices?product=${PRODUCT_ID}&limit=1`,
          stripeKey,
        ),
      ]);

      const productData = transformProductData(product, prices.data[0]);
      return jsonResponse(productData);
    } catch (error) {
      console.error("Product fetch error:", error);
      return errorResponse(error.message);
    }
  },
};