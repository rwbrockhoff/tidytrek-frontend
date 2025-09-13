import { useState } from 'react';
import { Button } from '@/components/alpine';
import { ManageSubscriptionModal } from '../modals/manage-subscription-modal';

export const SubscriptionManage = () => {
	const [isManageModalOpen, setIsManageModalOpen] = useState(false);

	return (
		<>
			<Button variant="outline" onClick={() => setIsManageModalOpen(true)}>
				Manage Subscription
			</Button>

			<ManageSubscriptionModal
				isOpen={isManageModalOpen}
				onClose={() => setIsManageModalOpen(false)}
			/>
		</>
	);
};