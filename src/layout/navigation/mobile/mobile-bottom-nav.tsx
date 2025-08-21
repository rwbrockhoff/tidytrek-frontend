import { useLocation, Link } from 'react-router-dom';
import { cn } from '@/styles/utils';
import { BackpackIcon, ClosetIcon, UserIcon, SettingsIcon } from '@/components/icons';
import styles from './mobile-bottom-nav.module.css';

interface NavItem {
	path: string;
	label: string;
	icon: React.ComponentType<{ className?: string }>;
}

const navItems: NavItem[] = [
	{
		path: '/',
		label: 'Pack',
		icon: BackpackIcon,
	},
	{
		path: '/gear-closet',
		label: 'Gear',
		icon: ClosetIcon,
	},
	{
		path: '/profile',
		label: 'Profile',
		icon: UserIcon,
	},
	{
		path: '/account',
		label: 'Settings',
		icon: SettingsIcon,
	},
];

export const MobileBottomNav = () => {
	const location = useLocation();

	return (
		<nav className={styles.bottomNav}>
			{navItems.map(({ path, label, icon: Icon }) => {
				const isActive =
					location.pathname === path ||
					(path === '/' &&
						(location.pathname === '/' || location.pathname.startsWith('/pack')));

				return (
					<Link
						key={path}
						to={path}
						className={cn(styles.navItem, isActive && styles.navItemActive)}>
						<Icon className={styles.navIcon} />
						<span className={styles.navLabel}>{label}</span>
					</Link>
				);
			})}
		</nav>
	);
};
