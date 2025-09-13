import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from '@radix-ui/themes';

export const AccountMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Determine active tab based on current route
	const getActiveTab = () => {
		if (location.pathname === '/account/settings') return 'account';
		if (location.pathname === '/account/subscription') return 'subscription';
		return 'profile';
	};

	const activeTab = getActiveTab();

	return (
		<Tabs.Root value={activeTab}>
			<Tabs.List size="2">
				<Tabs.Trigger value="profile" onClick={() => navigate('/account', { viewTransition: true })}>
					Profile
				</Tabs.Trigger>
				<Tabs.Trigger value="account" onClick={() => navigate('/account/settings', { viewTransition: true })}>
					Account
				</Tabs.Trigger>
				<Tabs.Trigger value="subscription" onClick={() => navigate('/account/subscription', { viewTransition: true })}>
					Subscription
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	);
};
