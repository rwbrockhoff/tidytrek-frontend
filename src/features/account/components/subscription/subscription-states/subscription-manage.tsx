import { useState } from 'react';
import { Button } from '@/components/alpine';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { useSubscriptionActions } from '../hooks/use-subscription-actions';
import { ManageSubscriptionModal } from '../modals/manage-subscription-modal';
import { CancelSubscriptionModal } from '../modals/cancel-subscription-modal';

export const SubscriptionManage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { subscription } = useSubscriptionDetails();
	const { handleCancel, isCancelPending } = useSubscriptionActions(
		subscription?.subscriptionId,
		() => setIsModalOpen(false),
	);

	const cancelAtPeriodEnd = subscription?.cancelAtPeriodEnd;

	const handleConfirmCancel = () => {
		handleCancel();
	};

	return (
		<>
			<Button variant="outline" onClick={() => setIsModalOpen(true)}>
				Manage Subscription
			</Button>

			{/* Manage Modal / Cancel Modal depending on subscription state */}
			{cancelAtPeriodEnd ? (
				<ManageSubscriptionModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			) : (
				<CancelSubscriptionModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onConfirm={handleConfirmCancel}
					isLoading={isCancelPending}
				/>
			)}
		</>
	);
};
