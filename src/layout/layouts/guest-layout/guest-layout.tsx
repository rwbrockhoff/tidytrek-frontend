import { Outlet, ScrollRestoration } from 'react-router-dom';
import { Suspense } from 'react';
import styles from './guest-layout.module.css';
import { Fallback, Footer, GuestHeader } from '@/layout';
import { LoadingProvider } from '@/contexts/loading-context';
import { useLoading } from '@/hooks/ui/use-loading';
import { TransitionOutlet } from '@/components/layout';
import { cn } from '@/styles/utils';

type GuestLayoutProps = {
	showFooter?: boolean;
	showHeader?: boolean;
};

const GuestLayoutInner = ({
	showFooter = false,
	showHeader = false,
}: GuestLayoutProps) => {
	const { loading } = useLoading();

	return (
		<div className={styles.guestViewWrapper}>
			<ScrollRestoration />
			{showHeader && <GuestHeader />}
			<div
				className={cn(
					styles.guestViewContainer,
					loading && styles.guestViewContainerLoading,
				)}>
				<div className={styles.guestViewLayoutContainer}>
					<Suspense fallback={<Fallback />}>
						<TransitionOutlet>
							<Outlet />
						</TransitionOutlet>
					</Suspense>
				</div>
			</div>
			{showFooter && <Footer />}
		</div>
	);
};

export const GuestLayout = (props: GuestLayoutProps) => {
	return (
		<LoadingProvider>
			<GuestLayoutInner {...props} />
		</LoadingProvider>
	);
};
