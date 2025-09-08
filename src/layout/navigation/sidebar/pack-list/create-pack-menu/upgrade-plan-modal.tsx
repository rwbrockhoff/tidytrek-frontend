import { Button } from '@/components/alpine';
import * as Modal from '@/components/alpine/modal/modal';
import { PlanCard } from '@/components/promotional/plan-card';
import { ProFeaturesList } from '@/components/promotional/pro-features-list';
import { useNavigate } from 'react-router-dom';
import mx from '@/styles/utils/mixins.module.css';

type UpgradePlanModalProps = {
	isOpen: boolean;
	onClose: () => void;
	message?: string;
};

export const UpgradePlanModal = ({ isOpen, onClose, message }: UpgradePlanModalProps) => {
	const navigate = useNavigate();

	const handleUpgrade = () => {
		onClose();
		navigate('/account/subscription', { viewTransition: true });
	};

	return (
		<Modal.Root open={isOpen} onOpenChange={onClose}>
			<Modal.Overlay />
			<Modal.Content size="md">
				<Modal.Header>
					<Modal.Title>
						Upgrade to <span className={mx.primaryText}>TidyTrek Pro</span>
					</Modal.Title>
					<Modal.Description>
						{message || 'Join today to unlock premium features.'}
					</Modal.Description>
				</Modal.Header>

				<Modal.Body>
					<p>Upgrade to Pro to create unlimited packs and unlock all features.</p>

					<div className="mt-4">
						<ProFeaturesList />
					</div>

					<div className="mt-4">
						<PlanCard />
					</div>
				</Modal.Body>

				<Modal.Footer>
					<Button variant="outline" color="secondary" onClick={onClose}>
						Maybe Later
					</Button>
					<Button onClick={handleUpgrade}>Upgrade to Pro</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
