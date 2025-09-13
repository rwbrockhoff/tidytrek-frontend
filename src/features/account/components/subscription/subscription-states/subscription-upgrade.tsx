import { useState } from 'react';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/alpine';
import { Stack } from '@/components/layout';
import { SubscriptionPaymentModal } from '../modals/subscription-payment-modal';
import { PlanCard } from '@/components/promotional/plan-card';

export const SubscriptionUpgrade = () => {
	const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

	return (
		<>
			<Stack className="gap-3 max-w-sm">
				<PlanCard />

				<Button
					size="md"
					iconLeft={<CreditCard />}
					onClick={() => setIsPaymentModalOpen(true)}>
					Upgrade to Pro
				</Button>
			</Stack>

			<SubscriptionPaymentModal
				isOpen={isPaymentModalOpen}
				onClose={() => setIsPaymentModalOpen(false)}
			/>
		</>
	);
};
