import styles from './user-layout.module.css';
import { Sidebar, MobileNavbar, Fallback } from '@/layout';
import { SidebarButton } from '@/layout/navigation/sidebar/components/sidebar-button';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { useCheckScreen } from '@/hooks/ui/use-check-screen';
import { cn } from '@/styles/utils';

export const UserLayout = () => {
	const { isMobile, isTablet } = useCheckScreen();
	const [showSidebar, setShowSidebar] = useState(true);

	// Default sidebar to hidden on tablet and mobile
	useEffect(() => {
		if (isMobile || isTablet) {
			setShowSidebar(false);
		} else {
			setShowSidebar(true);
		}
	}, [isMobile, isTablet]);

	const handleToggleSidebar = () => setShowSidebar(!showSidebar);

	return (
		<div className={styles.outerContainer}>
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
					<Suspense fallback={<Fallback />}>
						{!showSidebar && (
							<SidebarButton isSidebar={false} onClick={handleToggleSidebar} />
						)}
						<Outlet />
					</Suspense>
				</div>
			</div>
		</div>
	);
};
