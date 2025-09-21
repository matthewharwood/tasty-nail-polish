import { useEffect, useState } from "preact/hooks";

interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  price: {
    id: string;
    amount: number;
    currency: string;
    formatted: string;
  } | null;
  active: boolean;
}

export default function ProductDisplay() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch("/api/product");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        setProduct(data);
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, []);

  async function handleCheckout() {
    if (!product?.price?.id) return;

    setCheckoutLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priceId: product.price.id }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to start checkout. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  }

  if (loading) {
    return (
      <div class="max-w-2xl mx-auto p-6">
        <div class="animate-pulse">
          <div class="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div class="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div class="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="max-w-2xl mx-auto p-6">
        <div class="bg-red-50 border border-red-300 text-red-700 p-4 rounded">
          <h3 class="font-bold mb-2">Error Loading Product</h3>
          <p>{error}</p>
          <p class="text-sm mt-2">Make sure you've added your Stripe test keys to your .env file</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div class="max-w-2xl mx-auto p-6">
        <p>No product data available</p>
      </div>
    );
  }

  return (
    <div class="max-w-2xl mx-auto p-6">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="mb-6">
          <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase font-semibold tracking-wide mb-2">
            {product.active ? "Active" : "Inactive"}
          </span>
          <h2 class="text-3xl font-bold text-gray-900 mb-2">{product.name}</h2>
          <p class="text-gray-600">{product.description}</p>
        </div>

        {product.price && (
          <div class="border-t pt-6">
            <div class="flex items-baseline">
              <span class="text-4xl font-bold text-gray-900">
                {product.price.formatted}
              </span>
            </div>
          </div>
        )}

        <div class="mt-8 p-4 bg-gray-50 rounded">
          <h3 class="text-sm font-semibold text-gray-700 mb-2">Product Details</h3>
          <dl class="text-sm">
            <div class="flex justify-between py-1">
              <dt class="text-gray-500">Product ID:</dt>
              <dd class="font-mono text-xs text-gray-700">{product.id}</dd>
            </div>
            <div class="flex justify-between py-1">
              <dt class="text-gray-500">Currency:</dt>
              <dd class="text-gray-700">{product.price?.currency.toUpperCase()}</dd>
            </div>
            <div class="flex justify-between py-1">
              <dt class="text-gray-500">Status:</dt>
              <dd class="text-gray-700">{product.active ? "Available" : "Unavailable"}</dd>
            </div>
          </dl>
        </div>

        <div class="mt-6 text-xs text-gray-500 text-center">
          <p>Fetched from Stripe Test Mode</p>
        </div>

        {product.active && product.price && (
          <div class="mt-8">
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              class="w-full bg-black text-white py-3 px-6 rounded hover:bg-gray-800 disabled:bg-gray-400"
            >
              {checkoutLoading ? "Loading..." : `Buy Now - ${product.price.formatted}`}
            </button>
            <p class="text-xs text-gray-500 text-center mt-2">
              Test Card: 4242 4242 4242 4242
            </p>
          </div>
        )}
      </div>
    </div>
  );
}