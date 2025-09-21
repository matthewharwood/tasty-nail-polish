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
      <div class="container">
        <div class="loading-skeleton">
          <div class="skeleton-block skeleton-large"></div>
          <div class="skeleton-block skeleton-medium"></div>
          <div class="skeleton-block skeleton-small"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div class="container">
        <div class="error-box">
          <h3 class="error-title">Error Loading Product</h3>
          <p class="error-message">{error}</p>
          <p class="error-hint">
            Make sure you've added your Stripe test keys to your .env file
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div class="container">
        <p class="no-data">No product data available</p>
      </div>
    );
  }

  return (
    <div class="container">
      <div class="product-card">
        {/* Status Badge */}
        <div class="product-section">
          <span class="status-badge">
            {product.active ? "In Stock" : "Out of Stock"}
          </span>

          <h2 class="product-name">{product.name}</h2>
          <p class="product-description">{product.description}</p>
        </div>

        {/* Price Display */}
        {product.price && (
          <div class="price-section">
            <div class="price-display">
              <span class="price-amount">{product.price.formatted}</span>
              <span class="price-unit">/ bottle</span>
            </div>
          </div>
        )}

        {/* Product Details */}
        <div class="product-details">
          <div class="product-details-label">
            <h3 class="product-details-title">Product Info</h3>
          </div>

          <dl class="product-details-list">
            <div class="product-detail-row">
              <dt class="product-detail-label">Product ID:</dt>
              <dd class="product-detail-value product-detail-id">
                {product.id}
              </dd>
            </div>
            <div class="product-detail-row">
              <dt class="product-detail-label">Currency:</dt>
              <dd class="product-detail-value">
                {product.price?.currency}
              </dd>
            </div>
            <div class="product-detail-row">
              <dt class="product-detail-label">Status:</dt>
              <dd class="product-detail-value">
                {product.active ? "Available" : "Unavailable"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Test Mode Notice */}
        <div class="stripe-test-notice">
          <p class="stripe-test-text">⚡ Stripe Test Mode Active ⚡</p>
        </div>

        {/* Buy Button */}
        {product.active && product.price && (
          <div>
            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              class="buy-button"
            >
              {checkoutLoading ? (
                <span>Processing...</span>
              ) : (
                <span>Buy Now → {product.price.formatted}</span>
              )}
            </button>

            <p class="test-card-notice">
              💳 Test Card: 4242 4242 4242 4242
            </p>
          </div>
        )}
      </div>
    </div>
  );
}