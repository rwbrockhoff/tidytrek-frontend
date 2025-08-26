import { Stack } from '@/components/layout';
import { SimpleLogo } from '@/layout/logo/simple-logo';
import styles from './auth-loading.module.css';

export const AuthLoading = () => {
	return (
		<Stack className="h-screen items-center justify-center">
			<SimpleLogo className={styles.mountainIcon} size="base" />
		</Stack>
	);
};