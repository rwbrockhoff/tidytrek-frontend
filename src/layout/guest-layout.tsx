import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import styles from './guest-layout.module.css';
import { Fallback } from './fallback';

export const GuestLayout = () => {
	return (
		<div className={styles.guestViewContainer}>
			<ScrollRestoration />
			<Suspense fallback={<Fallback />}>
				<Outlet />
			</Suspense>
		</div>
	);
};

