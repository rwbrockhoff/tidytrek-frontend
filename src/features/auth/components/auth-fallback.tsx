import { useDelayedView } from '@/hooks/ui/use-delayed-view';
import { AuthSkeleton } from '@/components/ui';

export const AuthFallback = () => {
	const isVisible = useDelayedView(300);
	return isVisible ? <AuthSkeleton /> : null;
};