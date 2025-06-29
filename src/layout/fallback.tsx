import { useState, useEffect } from 'react';
import { SidebarSkeleton, ContentSkeleton } from '@/components/ui';

export const Fallback = () => {
	const [showSkeleton, setShowSkeleton] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Show skeleton after 200ms for Suspense (shorter delay for route transitions)
		const timer = setTimeout(() => {
			setShowSkeleton(true);
		}, 200);

		// Cleanup when loading is finished
		return () => {
			setIsLoading(false);
			clearTimeout(timer);
		};
	}, []);

	if (isLoading && showSkeleton) return <ContentSkeleton />;

	return null;
};

export const SidebarFallback = () => {
	return <SidebarSkeleton />;
};
