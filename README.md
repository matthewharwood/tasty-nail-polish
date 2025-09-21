# Tasty Nail Polish - Rapid E-commerce Deployment

## Project Vision

This project was inspired by a viral moment in September 2025 when someone posted about flavored nail polish. The opportunity to capitalize on viral trends by rapidly deploying branded e-commerce stores was missed due to lack of infrastructure.

This happens frequently - viral moments create instant demand, but traditional e-commerce setup is too slow to capture the opportunity. This project aims to solve that problem by creating a template for launching branded, scalable e-commerce sites within hours, not days.

## Tech Stack

- **Deno** - Modern JavaScript runtime with built-in TypeScript support
- **Fresh** - Next-gen web framework for Deno with island architecture
- **Stripe** - Payment processing and e-commerce infrastructure
- **Deno Deploy** - Edge deployment platform for instant global scaling

## Why This Stack?

- **Speed**: Deno + Fresh provides instant deployments with zero build step
- **Scale**: Deno Deploy automatically scales globally at the edge
- **Simplicity**: Stripe handles all payment complexity
- **Cost**: Pay-as-you-go pricing means minimal upfront investment

## Getting Started

### Prerequisites

1. Install Deno: https://docs.deno.com/runtime/getting_started/installation
2. Create a Stripe account: https://dashboard.stripe.com/register
3. Set up Deno Deploy account: https://deno.com/deploy

### Local Development

1. Clone this repository:
```bash
git clone https://github.com/yourusername/tasty-nail-polish.git
cd tasty-nail-polish
```

2. Copy environment variables:
```bash
cp .env.example .env
```

3. Add your Stripe keys to `.env`:
```
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
```

4. Start the development server:
```bash
deno task dev
```

The site will be available at http://localhost:8000

### Project Structure

```
├── routes/          # Page routes and API endpoints
├── islands/         # Interactive client components
├── components/      # Reusable UI components
├── static/          # Static assets (images, CSS)
├── utils.ts         # Utility functions
└── main.ts          # Application entry point
```

## Deployment

### Deploy to Deno Deploy

1. Push your code to GitHub
2. Connect your repository to Deno Deploy
3. Set environment variables in Deno Deploy dashboard
4. Deploy with one click

### Environment Variables

Required for production:
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_WEBHOOK_SECRET` - For handling Stripe webhooks

## Customization for New Products

To adapt this for a new viral product:

1. Update product information in `routes/index.tsx`
2. Replace product images in `static/`
3. Modify branding colors in `static/styles.css`
4. Update Stripe product catalog
5. Deploy to new domain

## Learning Goals

- [ ] Implement full Stripe checkout flow
- [ ] Add product catalog management
- [ ] Create admin dashboard for inventory
- [ ] Implement order fulfillment webhooks
- [ ] Add analytics and conversion tracking
- [ ] Create deployment automation scripts
- [ ] Build template system for rapid customization

## Future Vision

The goal is to create a system where we can:
1. Spot viral trend
2. Generate branded site in < 1 hour
3. Deploy globally instantly
4. Start taking orders immediately
5. Scale automatically with demand

Time is money in viral commerce. This project is about capturing that value.