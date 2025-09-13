import { useMemo } from 'react';
import { Segment, SegmentHeader } from '@/components/primitives';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { SubscriptionUpgrade } from './subscription-states/subscription-upgrade';
import { SubscriptionRestart } from './subscription-states/subscription-restart';
import { SubscriptionComplimentary } from './subscription-states/subscription-complimentary';
import { SubscriptionManage } from './subscription-states/subscription-manage';

type SubscriptionState = 'upgrade' | 'restart' | 'complimentary' | 'manage';

export const SubscriptionManagementSegment = () => {
	const { isSubscribed, isComplimentary, subscription } = useSubscriptionDetails();

	const canRestart =
		subscription?.status === 'canceled' && subscription?.stripeSubscriptionId;

	const subscriptionState: SubscriptionState = useMemo(() => {
		if (canRestart) return 'restart';
		if (!isSubscribed) return 'upgrade';
		if (isComplimentary) return 'complimentary';
		return 'manage';
	}, [canRestart, isSubscribed, isComplimentary]);

	return (
		<Segment>
			<SegmentHeader
				title="Subscription"
				description={!isSubscribed ? 'Choose your plan' : 'Manage your subscription'}
			/>
			{subscriptionState === 'upgrade' && <SubscriptionUpgrade />}
			{subscriptionState === 'restart' && <SubscriptionRestart />}
			{subscriptionState === 'complimentary' && <SubscriptionComplimentary />}
			{subscriptionState === 'manage' && <SubscriptionManage />}
		</Segment>
	);
};
