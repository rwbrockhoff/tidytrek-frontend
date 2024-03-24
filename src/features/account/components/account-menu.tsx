import { useNavigate } from 'react-router-dom';
import { Link } from '@/components/ui';
import { Tabs } from '@radix-ui/themes';

// with onClick, user can click underneath button text and still navigate
// between pages. So there is a link + navigate in place to ensure it works
// no matter where they click

export const AccountMenu = () => {
	const navigate = useNavigate();
	return (
		<Tabs.Root defaultValue="account">
			<Tabs.List size="2">
				<Tabs.Trigger value="account" onClick={() => navigate('/account')}>
					<Link link="/account">Account Settings</Link>
				</Tabs.Trigger>
				<Tabs.Trigger value="profile" onClick={() => navigate('/account/profile')}>
					<Link link="/account/profile">Profile Settings</Link>
				</Tabs.Trigger>
			</Tabs.List>
		</Tabs.Root>
	);
};
