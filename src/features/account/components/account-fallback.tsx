import { useDelayedView } from '@/hooks/ui/use-delayed-view';
import { AccountSkeleton } from './account-skeleton';

export const AccountFallback = () => {
	const isVisible = useDelayedView(300);
	return isVisible ? <AccountSkeleton /> : null;
};