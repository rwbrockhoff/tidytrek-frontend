import { loadStripe } from '@stripe/stripe-js';

// Stripe configuration
export const STRIPE_CONFIG = {
	publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
	priceIds: {
		pro: import.meta.env.VITE_STRIPE_PRICE_PRO_MONTHLY_ID,
	},
} as const;

export const stripePromise = loadStripe(STRIPE_CONFIG.publishableKey);

export const STRIPE_PRICES = {
	PRO_MONTHLY: STRIPE_CONFIG.priceIds.pro,
} as const;
