import { Handlers } from "fresh/server.ts";

export const handler: Handlers = {
  async GET(_req) {
    try {
      const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
      if (!stripeKey) {
        return new Response(JSON.stringify({ error: "Stripe key not configured" }), {
          status: 500,
          headers: { "Content-Type": "application/json" },
        });
      }

      const productId = "prod_T5qNxonixIvjVe";

      // Fetch product details directly from Stripe API
      const productResponse = await fetch(`https://api.stripe.com/v1/products/${productId}`, {
        headers: {
          "Authorization": `Bearer ${stripeKey}`,
        },
      });

      if (!productResponse.ok) {
        throw new Error(`Failed to fetch product: ${productResponse.status}`);
      }

      const product = await productResponse.json();

      // Fetch prices for the product
      const pricesResponse = await fetch(`https://api.stripe.com/v1/prices?product=${productId}&limit=1`, {
        headers: {
          "Authorization": `Bearer ${stripeKey}`,
        },
      });

      if (!pricesResponse.ok) {
        throw new Error(`Failed to fetch prices: ${pricesResponse.status}`);
      }

      const prices = await pricesResponse.json();
      const price = prices.data[0];

      const response = {
        id: product.id,
        name: product.name,
        description: product.description,
        images: product.images,
        price: price ? {
          id: price.id,
          amount: price.unit_amount,
          currency: price.currency,
          formatted: new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: price.currency.toUpperCase(),
          }).format((price.unit_amount || 0) / 100)
        } : null,
        active: product.active,
      };

      return new Response(JSON.stringify(response), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching product:", error);
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }
  },
};