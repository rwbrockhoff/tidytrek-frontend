import { Flex, Text } from '@radix-ui/themes';
import { CreditCard } from 'lucide-react';
import { Button } from '@/components/alpine';
import { Alert } from '@/components/ui/alert';
import { Segment, SegmentHeader } from '@/components/primitives';
import { Stack } from '@/components/layout';
import { EditPaymentMethodModal } from './edit-payment-method-modal';
import { useState } from 'react';
import { useSubscriptionDetails } from '@/hooks/auth/use-subscription-details';

export const PaymentMethodSegment = () => {
	const { isPaidSubscription, subscription } = useSubscriptionDetails();
	const [isEditPaymentModalOpen, setIsEditPaymentModalOpen] = useState(false);
	const [showSuccessAlert, setShowSuccessAlert] = useState(false);

	if (!isPaidSubscription) return null;

	const paymentMethod = subscription?.paymentMethod;
	const subscriptionCardInfo = paymentMethod?.last4
		? `•••• •••• •••• ${paymentMethod.last4}`
		: '•••• •••• •••• ••••';

	return (
		<Segment>
			<SegmentHeader
				title="Payment Method"
				description="Update your payment information"
			/>
			<Stack className="gap-3">
				<Flex align="center" gap="4">
					<CreditCard size={20} />
					<Text size="2">{subscriptionCardInfo}</Text>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => setIsEditPaymentModalOpen(true)}>
						Update
					</Button>
				</Flex>
				{showSuccessAlert && (
					<Alert variant="success">Payment method updated successfully.</Alert>
				)}
			</Stack>

			<EditPaymentMethodModal
				isOpen={isEditPaymentModalOpen}
				onClose={() => setIsEditPaymentModalOpen(false)}
				onSuccess={() => setShowSuccessAlert(true)}
			/>
		</Segment>
	);
};
