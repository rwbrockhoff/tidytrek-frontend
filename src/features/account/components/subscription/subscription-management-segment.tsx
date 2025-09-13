import { Text } from '@radix-ui/themes';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/alpine';
import { Segment, SegmentHeader } from '@/components/primitives';
import { Stack } from '@/components/layout';
import { SubscriptionPaymentModal } from './modals/subscription-payment-modal';
import { ManageSubscriptionModal } from './modals/manage-subscription-modal';
import { PlanCard } from '@/components/promotional/plan-card';
import { useState } from 'react';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';

export const SubscriptionManagementSegment = () => {
	const { isSubscribed, isComplimentary } = useSubscriptionDetails();
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
	const [isManageModalOpen, setIsManageModalOpen] = useState(false);

	return (
		<Segment>
			<SegmentHeader
				title="Subscription"
				description={!isSubscribed ? 'Choose your plan' : 'Manage your subscription'}
			/>
			{!isSubscribed ? (
				<Stack className="gap-3 max-w-sm">
					<PlanCard />

					<Button
						size="md"
						iconLeft={<CreditCard />}
						onClick={() => setIsPaymentModalOpen(true)}>
						Upgrade to Pro
					</Button>
				</Stack>
			) : isComplimentary ? (
				<Text size="2" color="gray">
					You have complimentary Pro access. No payment required.
				</Text>
			) : (
				<Button variant="outline" onClick={() => setIsManageModalOpen(true)}>
					Manage Subscription
				</Button>
			)}

			<SubscriptionPaymentModal
				isOpen={isPaymentModalOpen}
				onClose={() => setIsPaymentModalOpen(false)}
			/>

			<ManageSubscriptionModal
				isOpen={isManageModalOpen}
				onClose={() => setIsManageModalOpen(false)}
			/>
		</Segment>
	);
};
