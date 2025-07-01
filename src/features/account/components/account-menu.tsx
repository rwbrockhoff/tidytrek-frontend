import { useNavigate } from 'react-router-dom';
import { Link } from '@/components/ui';
import { Tabs } from '@radix-ui/themes';

// with onClick, user can click underneath button text and still navigate
// between pages. So there is a link + navigate in place to ensure it works
// no matter where they click

export const AccountMenu = () => {
	const navigate = useNavigate();
	return (
		<Tabs.Root defaultValue="profile">
			<Tabs.List size="2">
				<Tabs.Trigger value="profile" onClick={() => navigate('/account')}>
					<Link to="/account">Profile Settings</Link>
				</Tabs.Trigger>
				<Tabs.Trigger value="account" onClick={() => navigate('/account/settings')}>
					<Link to="/account/settings">Account Settings</Link>
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	);
};
