export type CreateSubscriptionRequest = {
	stripePriceId: string;
	stripePaymentMethodId: string;
};

export type CreateSubscriptionResponse = {
	subscriptionId: string;
	clientSecret?: string;
	status: 'succeeded' | 'requires_payment_method' | 'requires_action';
};

export type SubscriptionDetails = {
	status: 'active' | 'canceled' | 'past_due' | 'unpaid' | 'incomplete' | 'none';
	subscriptionId?: number;
	stripeSubscriptionId?: string;
	currentPeriodStart?: Date;
	currentPeriodEnd?: Date;
	cancelAtPeriodEnd?: boolean;
	canceledAt?: Date | null;
};

export type SubscriptionResponse = {
	subscriptionStatus: boolean;
	subscription: SubscriptionDetails | null;
};

export type CancelSubscriptionRequest = {
	subscriptionId: number;
};

export type UpdatePaymentMethodRequest = {
	stripePaymentMethodId: string;
};
