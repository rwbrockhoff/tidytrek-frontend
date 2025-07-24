import { useOnlineStatus } from '@/hooks/use-online-status';
import { WifiOffIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './offline-banner.module.css';

export const OfflineBanner = () => {
	const isOnline = useOnlineStatus();

	if (isOnline) return null;

	return (
		<div
			className={cn(
				styles.offlineBanner,
				'fixed top-0 left-0 right-0 z-100 flex items-center justify-center',
			)}>
			<WifiOffIcon />
			<span>You're offline. Some features may not work.</span>
		</div>
	);
};
