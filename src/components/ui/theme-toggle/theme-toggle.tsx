import { SunIcon, MoonIcon } from '@/components/icons';
import styles from './theme-toggle.module.css';
import { cn } from '@/styles/utils';
import { useAuth } from '@/hooks/auth/use-auth';
import { useUpdateSettingsMutation } from '@/features/account/queries/user-settings-queries';

interface ThemeToggleProps {
	className?: string;
}

export const ThemeToggle = ({ className }: ThemeToggleProps) => {
	const { settings } = useAuth();
	const currentDarkMode = settings?.darkMode || false;
	const { mutate: updateSettings } = useUpdateSettingsMutation();

	const handleToggle = () => {
		const newDarkMode = !currentDarkMode;

		localStorage.setItem('theme', newDarkMode ? 'dark' : 'light');
		document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
		document.body.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');

		updateSettings({ darkMode: newDarkMode });
	};

	return (
		<button
			className={cn(styles.themeToggle, className)}
			onClick={handleToggle}
			aria-label="Toggle dark mode"
			type="button">
			<SunIcon className={styles.iconSun} />
			<MoonIcon className={styles.iconMoon} />
		</button>
	);
};
