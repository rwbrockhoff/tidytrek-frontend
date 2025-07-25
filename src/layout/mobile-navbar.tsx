import { Heading, Button } from '@radix-ui/themes';
import { AiOutlineMenu } from 'react-icons/ai';
import { cn, mx } from '@/styles/utils';
import styles from './mobile-navbar.module.css';

export const MobileNavbar = ({ onClick }: { onClick: () => void }) => {
	return (
		<header className={cn(styles.header, mx.hidden, mx.mobileFlex, mx.responsiveContent)}>
			<Heading as="h1" size="8">
				tidytrek
			</Heading>
			<Button className={styles.menuButton} onClick={onClick} size="4">
				<AiOutlineMenu />
			</Button>
		</header>
	);
};
