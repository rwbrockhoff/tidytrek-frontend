import { Stack } from '@/components/layout';
import { MountainIcon } from '@/components/icons/icons';
import styles from './auth-loading.module.css';

export const AuthLoading = () => {
	return (
		<Stack className="h-screen items-center justify-center">
			<MountainIcon className={`${styles.mountainIcon} lucide-xl`} />
		</Stack>
	);
};