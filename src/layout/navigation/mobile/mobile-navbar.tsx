import { Heading } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { MenuIcon } from '@/components/icons';
import { cn, mx } from '@/styles/utils';
import styles from './mobile-navbar.module.css';

export const MobileNavbar = ({ onClick }: { onClick: () => void }) => {
	return (
		<header className={cn(styles.header, mx.hidden, mx.mobileFlex, mx.responsiveContent)}>
			<Heading as="h1" size="8">
				tidytrek
			</Heading>
			<Button
				className={styles.menuButton}
				onClick={onClick}
				size="lg"
				iconLeft={<MenuIcon className="lucide-md" />}
			/>
		</header>
	);
};
