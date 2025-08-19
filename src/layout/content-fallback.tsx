import { ContentSkeleton } from '@/components/ui';
import { useDelayedView } from '@/hooks/ui/use-delayed-view';

export const ContentFallback = () => {
	const isVisible = useDelayedView(300);
	return isVisible ? <ContentSkeleton /> : null;
};
