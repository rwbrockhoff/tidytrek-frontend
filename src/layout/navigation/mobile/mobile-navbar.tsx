import { Heading, Button } from '@radix-ui/themes';
import { MenuIcon } from '@/components/ui';
import { cn, mx } from '@/styles/utils';
import styles from './mobile-navbar.module.css';

export const MobileNavbar = ({ onClick }: { onClick: () => void }) => {
	return (
		<header className={cn(styles.header, mx.hidden, mx.mobileFlex, mx.responsiveContent)}>
			<Heading as="h1" size="8">
				tidytrek
			</Heading>
			<Button className={styles.menuButton} onClick={onClick} size="4">
				<MenuIcon size={20} />
			</Button>
		</header>
	);
};
