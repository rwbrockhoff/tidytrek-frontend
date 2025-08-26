import { useAuth } from '@/hooks/auth/use-auth';
import { UserLayout } from '../user-layout/user-layout';
import { GuestLayout } from '../guest-layout/guest-layout';

type AdaptiveLayoutProps = {
	showFooter?: boolean;
	showHeader?: boolean;
};

export const AdaptiveLayout = ({
	showFooter = true,
	showHeader = true,
}: AdaptiveLayoutProps) => {
	const { isAuthenticated } = useAuth();

	// Authenticated users - sidebar, no branded footer
	if (isAuthenticated) {
		return <UserLayout />;
	}

	// Guests - no sidebar, branded header & footer promo
	return <GuestLayout showFooter={showFooter} showHeader={showHeader} />;
};
