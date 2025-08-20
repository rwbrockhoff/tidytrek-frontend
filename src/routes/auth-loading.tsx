import { Stack } from '@/components/layout';
import { HikingIcon } from '@/components/icons/icons';
import styles from './auth-loading.module.css';

export const AuthLoading = () => {
	return (
		<Stack className="h-screen items-center justify-center">
			<HikingIcon className={`${styles.mountainIcon} lucide-xl`} />
		</Stack>
	);
};