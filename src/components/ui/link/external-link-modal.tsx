import { Modal } from '@/components/ui/alpine';
import { Button } from '@/components/ui/alpine';

type ExternalLinkModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onContinue: () => void;
	domain: string;
	message: string;
};

export const ExternalLinkModal = ({
	isOpen,
	onClose,
	onContinue,
	domain,
	message,
}: ExternalLinkModalProps) => {
	return (
		<Modal.Root open={isOpen} onOpenChange={onClose}>
			<Modal.Content>
				<Modal.Header>
					<Modal.Title>External Link</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Modal.Description>{message}</Modal.Description>
					<p style={{ color: 'var(--color-text-secondary)' }}>
						You're being redirected to: <strong>{domain}</strong>
					</p>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="ghost" onClick={onClose}>
						Cancel
					</Button>
					<Button onClick={onContinue}>Continue</Button>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
};
