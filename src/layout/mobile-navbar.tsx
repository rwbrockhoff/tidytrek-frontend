import { Heading, Button } from '@radix-ui/themes';
import { AiOutlineMenu } from 'react-icons/ai';
import styles from './mobile-navbar.module.css';

export const MobileNavbar = ({ onClick }: { onClick: () => void }) => {
	return (
		<header className={styles.header}>
			<Heading as="h1" size="8">
				tidytrek
			</Heading>
			<Button className={styles.menuButton} onClick={onClick} size="4">
				<AiOutlineMenu />
			</Button>
		</header>
	);
};

