export interface StripeProduct {
  id: string;
  name: string;
  description: string;
  images: string[];
  active: boolean;
}

export interface StripePrice {
  id: string;
  unit_amount: number;
  currency: string;
}

export interface ProductResponse {
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

export interface CheckoutRequest {
  priceId: string;
}

export interface CheckoutResponse {
  url: string;
}

export interface ErrorResponse {
  error: string;
}

export const STRIPE_API_BASE = "https://api.stripe.com/v1";
export const PRODUCT_ID = "prod_T5qNxonixIvjVe";