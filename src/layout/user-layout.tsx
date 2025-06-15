import styles from './user-layout.module.css';
import Sidebar from './sidebar/sidebar';
import { Outlet } from 'react-router-dom';
import { Suspense, useState } from 'react';
import { MobileNavbar } from './mobile-navbar';
import { SidebarButton } from './sidebar/components/sidebar-button';
import { Fallback } from './fallback';

export const UserLayout = () => {
	const [showSidebar, setShowSidebar] = useState(true);

	const handleToggleSidebar = () => setShowSidebar(!showSidebar);

	return (
		<div className={styles.outerContainer}>
			<div className={styles.appViewContainer}>
				<MobileNavbar onClick={handleToggleSidebar} />
				<Sidebar showSidebar={showSidebar} onToggle={handleToggleSidebar} />
				<div 
					className={styles.viewLayoutContainer}
					style={{
						'--view-width': showSidebar ? '80%' : '100%',
						'--view-margin-left': showSidebar ? '250px' : '0%'
					} as React.CSSProperties}
				>
					<Suspense fallback={<Fallback />}>
						<SidebarButton isSidebar={false} onClick={handleToggleSidebar} />
						<Outlet />
					</Suspense>
				</div>
			</div>
		</div>
	);
};

