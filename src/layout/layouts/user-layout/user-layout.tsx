import styles from './user-layout.module.css';
import { Sidebar, MobileNavbar, MobileBottomNav, ContentFallback } from '@/layout';
import { SidebarButton } from '@/layout/navigation/sidebar/sidebar-button';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { cn } from '@/styles/utils';
import { TransitionOutlet } from '@/components/layout';

export const UserLayout = () => {
	const { isMobile, isMedium } = useCheckScreen();
	const [showSidebar, setShowSidebar] = useState(false);

	// Default sidebar to hidden on tablet and mobile
	useEffect(() => {
		if (isMobile || isMedium) {
			setShowSidebar(false);
		} else {
			setShowSidebar(true);
		}
	}, [isMobile, isMedium]);

	const handleToggleSidebar = () => setShowSidebar(!showSidebar);

	return (
		<div className={styles.outerContainer} data-mobile-sidebar-visible={isMobile && showSidebar}>
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
						<TransitionOutlet>
							<Outlet />
						</TransitionOutlet>
					</Suspense>
				</div>
			</div>
			<MobileBottomNav />
		</div>
	);
};
