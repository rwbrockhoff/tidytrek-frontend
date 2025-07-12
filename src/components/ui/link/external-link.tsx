import { useState } from 'react';
import { useRedirects } from '@/hooks/ui/use-redirects';
import { ExternalLinkModal } from './external-link-modal';
import { cn } from '@/styles/utils';
import styles from './link.module.css';

type ExternalLinkProps = {
	href: string;
	children: React.ReactNode;
	className?: string;
};

export const ExternalLink = ({ href, children, className = '' }: ExternalLinkProps) => {
	const [showModal, setShowModal] = useState(false);
	const [warningData, setWarningData] = useState<{
		message: string;
		domain: string;
		continueUrl: string;
	} | null>(null);
	
	const { checkRedirect, isLoading } = useRedirects();

	const handleClick = async (e: React.MouseEvent) => {
		e.preventDefault();
		
		if (isLoading) return;

		const result = await checkRedirect(href);

		if (result.warning) {
			setWarningData(result.warning);
			setShowModal(true);
		} else if (result.redirectUrl) {
			window.open(result.redirectUrl, '_blank', 'noopener,noreferrer');
		}
	};

	const handleContinue = () => {
		if (warningData?.continueUrl) {
			window.open(warningData.continueUrl, '_blank', 'noopener,noreferrer');
		}
		setShowModal(false);
		setWarningData(null);
	};

	const handleClose = () => {
		setShowModal(false);
		setWarningData(null);
	};

	return (
		<>
			<a
				href={href}
				onClick={handleClick}
				className={cn(styles.link, className)}
				rel="noopener noreferrer"
			>
				{children}
			</a>
			
			{warningData && (
				<ExternalLinkModal
					isOpen={showModal}
					onClose={handleClose}
					onContinue={handleContinue}
					domain={warningData.domain}
					message={warningData.message}
				/>
			)}
		</>
	);
};