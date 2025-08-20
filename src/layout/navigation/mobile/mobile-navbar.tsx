import { Button } from '@/components/alpine';
import { HamburgerMenuIcon } from '@/components/icons';
import { Logo } from '@/layout/logo';
import { cn, mx } from '@/styles/utils';
import styles from './mobile-navbar.module.css';

export const MobileNavbar = ({ onClick }: { onClick: () => void }) => {
	return (
		<header className={cn(styles.header, mx.hidden, mx.mobileFlex, mx.responsiveContent)}>
			<Logo color="white" className="h-8" />
			<Button
				className={styles.menuButton}
				onClick={onClick}
				size="lg"
				iconLeft={<HamburgerMenuIcon className="lucide-md" />}
			/>
		</header>
	);
};
