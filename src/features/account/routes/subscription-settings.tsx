import { SegmentGroup } from '@/components/primitives';
import { AccountSkeleton } from '../components/shared/account-skeleton';
import { CurrentPlanSegment } from '../components/shared/current-plan-segment';
import { ProFeaturesSegment } from '../components/shared/pro-features-segment';
import { SubscriptionManagementSegment } from '../components/subscription/subscription-management-segment';
import { PaymentMethodSegment } from '../components/subscription/payment/payment-method-segment';
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
