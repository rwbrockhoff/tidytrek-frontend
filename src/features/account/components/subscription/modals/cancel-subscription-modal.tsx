import { Text, Separator } from '@radix-ui/themes';
import * as Modal from '@/components/alpine/modal/modal';
import { Button } from '@/components/alpine';
import { Stack } from '@/components/layout';
import { useGetPackListQuery } from '@/queries/pack-queries';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';
import { formatDate } from '@/utils/format-date';
import { SubscriptionStatusDisplay } from '../subscription-states/subscription-status-display';

type CancelSubscriptionModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	isLoading?: boolean;
};

export const CancelSubscriptionModal = ({
	isOpen,
	onClose,
	onConfirm,
	isLoading = false,
}: CancelSubscriptionModalProps) => {
	const { data: packs } = useGetPackListQuery();
	const { subscription } = useSubscriptionDetails();
	const topPack = packs?.packList?.[0];

	const getAccessEndDate = () => {
		if (!subscription?.currentPeriodEnd) return null;
		return formatDate(subscription.currentPeriodEnd);
	};

	return (
		<Modal.Root open={isOpen} onOpenChange={onClose}>
			<Modal.Content size="md">
				<Modal.Header>
					<Modal.Title>Cancel Subscription</Modal.Title>
					<Modal.Description>Cancel your Pro Plan subscription</Modal.Description>
				</Modal.Header>

				<Modal.Body>
					<Stack className="gap-4">
						<SubscriptionStatusDisplay
							cancelAtPeriodEnd={false}
							accessEndDate={getAccessEndDate()}
						/>

						{topPack && (
							<>
								<Separator size="4" />
								<Stack className="gap-2">
									<Text size="2" color="gray">
										After your plan expires, you'll only have access to your top pack:{' '}
										<span className="font-medium">"{topPack.packName}"</span>
									</Text>
									<Text size="2" color="gray">
										Tip: Reorder your packs to choose which one to keep
									</Text>
								</Stack>
							</>
						)}
					</Stack>
				</Modal.Body>

				<Modal.Footer>
					<Button
						variant="outline"
						color="tertiary"
						onClick={onClose}
						disabled={isLoading}>
						Keep Subscription
					</Button>
					<Button
						variant="outline"
						color="danger"
						onClick={onConfirm}
						loading={isLoading}
						disabled={isLoading}>
						Cancel Subscription
					</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
