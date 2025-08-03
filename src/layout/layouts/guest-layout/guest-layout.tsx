import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import styles from './guest-layout.module.css';
import { Fallback } from '@/layout';

export const GuestLayout = () => {
	return (
		<div className={styles.guestViewWrapper}>
			<ScrollRestoration />
			<div className={styles.guestViewContainer}>
				<div className={styles.guestViewLayoutContainer}>
					<Suspense fallback={<Fallback />}>
						<Outlet />
					</Suspense>
				</div>
			</div>
		</div>
	);
};
