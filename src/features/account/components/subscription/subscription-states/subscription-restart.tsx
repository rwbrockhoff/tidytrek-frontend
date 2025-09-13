import { useState } from 'react';
import { Text } from '@radix-ui/themes';
import { RotateCcw } from 'lucide-react';
import { Button } from '@/components/alpine';
import { Stack } from '@/components/layout';
import { RestartSubscriptionModal } from '../modals/restart-subscription-modal';

export const SubscriptionRestart = () => {
	const [isRestartModalOpen, setIsRestartModalOpen] = useState(false);

	return (
		<>
			<Stack className="gap-4 items-start">
				<Text color="gray">
					Welcome back! Your Pro subscription ended, but you can easily rejoin.
				</Text>
				<Button iconLeft={<RotateCcw />} onClick={() => setIsRestartModalOpen(true)}>
					Restart Pro Plan
				</Button>
			</Stack>

			<RestartSubscriptionModal
				isOpen={isRestartModalOpen}
				onClose={() => setIsRestartModalOpen(false)}
			/>
		</>
	);
};