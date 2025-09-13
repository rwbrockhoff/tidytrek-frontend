import { Flex, Stack } from '@/components/layout';
import { CreditCard, Check } from 'lucide-react';
import styles from '../modals/manage-subscription-modal.module.css';

type SubscriptionStatusDisplayProps = {
	cancelAtPeriodEnd: boolean | undefined;
	accessEndDate: string | null;
};

export const SubscriptionStatusDisplay = ({
	cancelAtPeriodEnd,
	accessEndDate,
}: SubscriptionStatusDisplayProps) => {
	if (cancelAtPeriodEnd) {
		return (
			<Stack className="gap-3">
				<Flex className={`gap-2 items-center ${styles.billingDate}`}>
					<Check />
					<span className={styles.billingDate}>
						Your subscription has been cancelled.
					</span>
				</Flex>
				<p>
					You'll have access until <strong>{accessEndDate}</strong>
				</p>
			</Stack>
		);
	}

	return (
		<Stack className="gap-3">
			<Flex className={`gap-2 items-center ${styles.billingDate}`}>
				<CreditCard />
				<span className={styles.billingDate}>Next billing date: {accessEndDate}</span>
			</Flex>
			<p>
				If you cancel, you'll still have access to your <strong>Pro Plan</strong> through{' '}
				<strong>{accessEndDate}</strong>
			</p>
		</Stack>
	);
};
