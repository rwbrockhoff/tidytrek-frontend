import { SegmentGroup } from '@/components/primitives';
import { AccountSkeleton } from '../components/account-skeleton';
import { CurrentPlanSegment } from '../components/current-plan-segment';
import { ProFeaturesSegment } from '../components/pro-features-segment';
import { SubscriptionManagementSegment } from '../components/subscription-management-segment';
import { PaymentMethodSegment } from '../components/payment-method-segment';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';

export const SubscriptionSettings = () => {
	const { isLoading } = useSubscriptionDetails();

	if (isLoading) return <AccountSkeleton />;

	return (
		<SegmentGroup>
			<CurrentPlanSegment />
			<ProFeaturesSegment />
			<SubscriptionManagementSegment />
			<PaymentMethodSegment />
		</SegmentGroup>
	);
};
