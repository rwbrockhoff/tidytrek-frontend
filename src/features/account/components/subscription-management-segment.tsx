import { Flex, Text } from '@radix-ui/themes';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/alpine';
import { Segment, SegmentHeader } from '@/components/primitives';
import { Stack } from '@/components/layout';
import { BackpackIcon } from '@/components/icons';
import { SubscriptionPaymentModal } from './subscription-payment-modal';
import { ManageSubscriptionModal } from './manage-subscription-modal';
import { cn } from '@/styles/utils';
import { useState } from 'react';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import styles from '../routes/subscription-settings.module.css';

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
					<Flex
						justify="between"
						align="center"
						className={cn(styles.planCard, 'p-4 rounded-lg')}>
						<Stack className="gap-1">
							<Flex align="center" gap="2">
								<BackpackIcon />
								<Text size="3" weight="bold">
									Pro Plan
								</Text>
							</Flex>
							<Text size="2" color="gray">
								Billed monthly
							</Text>
						</Stack>
						<Text size="5" weight="bold">
							$5/mo
						</Text>
					</Flex>

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
