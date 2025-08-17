import { Heading } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { LandingLink } from '@/components/ui';
import { UserIcon } from '@/components/icons';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/styles/utils';
import styles from './guest-header.module.css';

export const GuestHeader = () => {
	const navigate = useNavigate();

	return (
		<header className={styles.header}>
			<div className={styles.container}>
				<Flex className={cn(styles.contentContainer, 'items-center h-full')}>
					<LandingLink>
						<Heading as="h2">tidytrek</Heading>
					</LandingLink>
					<Flex className="ml-auto items-center gap-4">
						<Button onClick={() => navigate('/register')} iconLeft={<UserIcon />}>Sign Up</Button>
					</Flex>
				</Flex>
			</div>
		</header>
	);
};
