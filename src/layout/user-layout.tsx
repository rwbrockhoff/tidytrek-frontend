import styles from './user-layout.module.css';
import Sidebar from './sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import { Suspense, useState, useEffect } from 'react';
import { MobileNavbar } from './mobile-navbar';
import { SidebarButton } from './sidebar/components/sidebar-button';
import { Fallback } from './fallback';
import { useCheckScreen } from '@/hooks';
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
			<div className={styles.appViewContainer}>
				<MobileNavbar onClick={handleToggleSidebar} />
				<Sidebar showSidebar={showSidebar} onToggle={handleToggleSidebar} />
				<div 
					className={cn(
						styles.viewLayoutContainer,
						showSidebar ? styles.viewLayoutSidebarVisible : styles.viewLayoutSidebarHidden
					)}
				>
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
