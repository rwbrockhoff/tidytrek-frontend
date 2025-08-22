import { useNavigate, useLocation } from 'react-router-dom';
import { Tabs } from '@radix-ui/themes';

export const AccountMenu = () => {
	const navigate = useNavigate();
	const location = useLocation();

	// Determine active tab based on current route
	const activeTab = location.pathname === '/account/settings' ? 'account' : 'profile';

	return (
		<Tabs.Root value={activeTab}>
			<Tabs.List size="2">
				<Tabs.Trigger value="profile" onClick={() => navigate('/account', { viewTransition: true })}>
					Profile Settings
				</Tabs.Trigger>
				<Tabs.Trigger value="account" onClick={() => navigate('/account/settings', { viewTransition: true })}>
					Account Settings
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	);
};
