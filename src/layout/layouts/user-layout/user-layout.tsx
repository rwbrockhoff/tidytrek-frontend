import styles from './user-layout.module.css';
import { Sidebar, MobileNavbar, MobileBottomNav, ContentFallback } from '@/layout';
import { SidebarButton } from '@/layout/navigation/sidebar/sidebar-button';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense, useState, useEffect, useCallback } from 'react';
import { useScreen } from '@/hooks/ui/use-screen';
import { cn } from '@/styles/utils';

export const UserLayout = () => {
	const { isMobile, isMedium } = useScreen();

	// Show sidebar by default on desktop (> 1280px), hide on tablet/mobile
	const [showSidebar, setShowSidebar] = useState(!isMedium);

	// Reset sidebar to defaults when screen size changes
	useEffect(() => {
		setShowSidebar(!isMobile && !isMedium);
	}, [isMobile, isMedium]);

	const handleToggleSidebar = useCallback(() => setShowSidebar((prev) => !prev), []);

	return (
		<div
			className={styles.outerContainer}
			data-mobile-sidebar-visible={isMobile && showSidebar}>
			<ScrollRestoration />
			<div className={styles.appViewContainer}>
				<MobileNavbar onClick={handleToggleSidebar} />
				<Sidebar showSidebar={showSidebar} onToggle={handleToggleSidebar} />
				<div
					className={cn(
						styles.viewLayoutContainer,
						showSidebar
							? styles.viewLayoutSidebarVisible
							: styles.viewLayoutSidebarHidden,
					)}>
					<Suspense fallback={<ContentFallback />}>
						{!showSidebar && (
							<SidebarButton isSidebar={false} onClick={handleToggleSidebar} />
						)}
						<Outlet />
					</Suspense>
				</div>
			</div>
			<MobileBottomNav />
		</div>
	);
};
