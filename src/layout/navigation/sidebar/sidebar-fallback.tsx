import { useDelayedView } from '@/hooks/ui/use-delayed-view';
import { SidebarSkeleton } from '@/components/ui';

export const SidebarFallback = () => {
	const isVisible = useDelayedView(300);
	return isVisible ? <SidebarSkeleton /> : null;
};