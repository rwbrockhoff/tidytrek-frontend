import { Text } from '@radix-ui/themes';
import type { SubscriptionDetails } from '@/types/subscription-types';

type SubscriptionDateDisplayProps = {
	isComplimentary: boolean;
	isPaidSubscription: boolean;
	subscription?: SubscriptionDetails | null;
};

export const SubscriptionDateDisplay = ({
	isComplimentary,
	isPaidSubscription,
	subscription,
}: SubscriptionDateDisplayProps) => {
	// Complimentary access - no date needed
	if (isComplimentary) return null;

	// No subscription data
	if (!subscription || !subscription.currentPeriodEnd) return null;

	const endDate = new Date(subscription.currentPeriodEnd).toLocaleDateString();

	// Cancelled but still active
	if (isPaidSubscription && subscription.cancelAtPeriodEnd) {
		return (
			<Text size="2" color="orange">
				Cancelled - Pro access until {endDate}
			</Text>
		);
	}

	// Fully expired/cancelled
	if (subscription.status === 'canceled') {
		return (
			<Text size="2" color="red">
				Pro plan expired on {endDate}
			</Text>
		);
	}

	// Active paid subscription
	if (isPaidSubscription) {
		return (
			<Text size="2" color="gray">
				Next billing date: {endDate}
			</Text>
		);
	}

	return null;
};
