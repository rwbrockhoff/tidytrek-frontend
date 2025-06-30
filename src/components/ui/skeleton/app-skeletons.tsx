import { Skeleton, SkeletonText } from './skeleton';
import styles from './app-skeletons.module.css';
import userLayoutStyles from '@/layout/user-layout.module.css';
import sidebarStyles from '@/layout/sidebar/sidebar.module.css';

// Main app skeleton - shows while checking auth
export const AppLoadingSkeleton = () => (
	<div className={userLayoutStyles.outerContainer}>
		<div className={userLayoutStyles.appViewContainer}>
			{/* Sidebar */}
			<div className={sidebarStyles.sidebar}>
				<div className={sidebarStyles.sidebarContainer}>
					<Skeleton height="40px" />
					{Array.from({ length: 4 }).map((_, i) => (
						<Skeleton key={i} height="32px" />
					))}
				</div>
			</div>

			{/* Main UI */}
			<div
				className={`${userLayoutStyles.viewLayoutContainer} ${userLayoutStyles.viewLayoutSidebarVisible}`}>
				<Skeleton height="200px" className={styles.heroSection} />
				<div className={styles.cardGrid}>
					{Array.from({ length: 6 }).map((_, i) => (
						<PackCardSkeleton key={i} />
					))}
				</div>
			</div>
		</div>
	</div>
);

// Sidebar skeleton
export const SidebarSkeleton = () => (
	<div className={styles.sidebarLoading}>
		<Skeleton height="40px" className={styles.logo} />
		<div className={styles.sidebarNav}>
			{Array.from({ length: 5 }).map((_, i) => (
				<div key={i} className={styles.navGroup}>
					<Skeleton height="24px" width="80%" />
					{Array.from({ length: 3 }).map((_, j) => (
						<Skeleton key={j} height="32px" width="60%" className={styles.subNavItem} />
					))}
				</div>
			))}
		</div>
	</div>
);

// Pack card skeleton
export const PackCardSkeleton = () => (
	<div className={styles.packCard}>
		<Skeleton height="180px" className={styles.packImage} />
		<div className={styles.packInfo}>
			<Skeleton height="20px" width="80%" className={styles.packTitle} />
			<SkeletonText lines={2} />
			<div className={styles.packMeta}>
				<Skeleton width="60px" height="16px" />
				<Skeleton width="40px" height="16px" />
			</div>
		</div>
	</div>
);

// Dashboard skeleton - shows pack info header & categories
export const DashboardSkeleton = () => (
	<div className={userLayoutStyles.outerContainer}>
		<div className={userLayoutStyles.appViewContainer}>
			{/* Sidebar skeleton */}
			<div className={sidebarStyles.sidebar}>
				<div className={sidebarStyles.sidebarContainer}>
					<Skeleton height="40px" width="60%" />
					<Skeleton height="60px" width="60px" variant="circular" />
					{Array.from({ length: 3 }).map((_, i) => (
						<Skeleton key={i} height="25px" />
					))}
				</div>
			</div>

			{/* Main dashboard content */}
			<div
				className={`${userLayoutStyles.viewLayoutContainer} ${userLayoutStyles.viewLayoutSidebarVisible}`}>
				<div className={styles.packInfoSection}>
					<div className={styles.packInfo}>
						<Skeleton height="50px" width="200px" />
						<SkeletonText lines={1} />
						<SkeletonText lines={1} />
					</div>
				</div>

				{/* Pack categories */}
				<div className={styles.packCategories}>
					{Array.from({ length: 2 }).map((_, i) => (
						<div key={i} className={styles.categorySection}>
							<PackTableSkeleton />
						</div>
					))}
				</div>
			</div>
		</div>
	</div>
);

// Suspense - Skeleton UI (Generic Content)
export const ContentSkeleton = () => (
	<>
		{/* Pack info section */}
		<div className={styles.packInfoSection}>
			<div className={styles.packInfo}>
				<Skeleton height="32px" width="200px" />
				<SkeletonText lines={1} />
			</div>
		</div>

		{/* Pack categories */}
		<div className={styles.packCategories}>
			{Array.from({ length: 2 }).map((_, i) => (
				<div key={i} className={styles.categorySection}>
					<PackTableSkeleton />
				</div>
			))}
		</div>
	</>
);

// Pack Table Skeleton
export const PackTableSkeleton = () => (
	<div className={styles.tableContainer}>
		{/* Table header */}
		<div className={styles.tableHeader}>
			{Array.from({ length: 1 }).map((_, i) => (
				<Skeleton key={i} height="20px" width="30%" />
			))}
		</div>

		{/* Table rows */}
		{Array.from({ length: 6 }).map((_, i) => (
			<div key={i} className={styles.tableRow}>
				<Skeleton height="16px" width={'100%'} />
			</div>
		))}
	</div>
);
