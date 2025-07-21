import { Skeleton, SkeletonText } from './skeleton';
import styles from './app-skeletons.module.css';
import userLayoutStyles from '@/layout/layouts/user-layout/user-layout.module.css';
import sidebarStyles from '@/layout/navigation/sidebar/sidebar.module.css';
import { Stack, Flex } from '@/components/layout';
import { cn } from '@/styles/utils';

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
				<Stack className="gap-12">
					<Skeleton height="200px" />
					<div className={styles.cardGrid}>
						{Array.from({ length: 6 }).map((_, i) => (
							<PackCardSkeleton key={i} />
						))}
					</div>
				</Stack>
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
			<Skeleton height="20px" width="80%" />
			<SkeletonText lines={2} />
			<Flex className="gap-2">
				<Skeleton width="60px" height="16px" />
				<Skeleton width="40px" height="16px" />
			</Flex>
		</div>
	</div>
);

// Dashboard skeleton - shows pack info header & categories
export const DashboardSkeleton = () => (
	<div className={userLayoutStyles.outerContainer}>
		<div className={userLayoutStyles.appViewContainer}>
			{/* Sidebar skeleton */}
			<div className={sidebarStyles.sidebar}>
				<div className={cn(sidebarStyles.sidebarContainer, styles.spreadSidebarItems)}>
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
				<Stack className="gap-12">
					<div className={styles.packInfo}>
						<Skeleton height="50px" width="200px" />
						<SkeletonText lines={1} />
						<SkeletonText lines={1} />
					</div>

					{/* Pack categories */}
					<div className={styles.packCategories}>
						{Array.from({ length: 2 }).map((_, i) => (
							<div key={i} className={styles.categorySection}>
								<PackTableSkeleton />
							</div>
						))}
					</div>
				</Stack>
			</div>
		</div>
	</div>
);

// Suspense - Skeleton UI (Generic Content)
export const ContentSkeleton = () => (
	<Stack className="gap-12">
		{/* Pack info section */}
		<div className={styles.packInfo}>
			<Skeleton height="32px" width="200px" />
			<SkeletonText lines={1} />
		</div>

		{/* Pack categories */}
		<div className={styles.packCategories}>
			{Array.from({ length: 2 }).map((_, i) => (
				<div key={i} className={styles.categorySection}>
					<PackTableSkeleton />
				</div>
			))}
		</div>
	</Stack>
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

// Auth skeleton - simple login form
export const AuthSkeleton = () => (
	<div className={styles.authContainer}>
		<div className={styles.authForm}>
			<Skeleton height="40px" width="250px" className={styles.authLogo} />
			<div className={styles.authCard}>
				<Stack className="gap-4">
					<Skeleton height="32px" width="200px" />
					<Skeleton height="48px" width="100%" className={styles.authButton} />
					<Skeleton height="14px" width="40px" />
					<Skeleton height="40px" width="100%" />
					<Skeleton height="40px" width="100%" />
					<Skeleton height="48px" width="100%" />
				</Stack>
			</div>
		</div>
	</div>
);
