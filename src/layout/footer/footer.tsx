import { LocationIcon } from '@/components/icons';
import { Flex, Stack } from '@/components/layout';
import { cn } from '@/styles/utils';
import styles from './footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<Stack className={cn(styles.contentContainer, 'gap-4')}>
					<Flex className="flex-col md:flex-row justify-between items-center gap-6">
						<Stack className="gap-1 items-center md:items-start">
							<a href="/" className={styles.brandTitle}>tidytrek</a>
							<Flex className="items-center gap-2 justify-center md:justify-start">
								<LocationIcon className={styles.locationIcon} />
								<span className={styles.locationText}>Made in Colorado</span>
							</Flex>
						</Stack>

						<Flex className="md:ml-auto gap-8">
							<a href="https://tidytrek.co/privacy-policy" className={styles.link} target="_blank" rel="noopener noreferrer">
								Privacy
							</a>
							<a href="https://tidytrek.co/terms-of-service" className={styles.link} target="_blank" rel="noopener noreferrer">
								Terms of Service
							</a>
							<a href="mailto:info@tidytrek.co" className={styles.link}>
								Contact
							</a>
						</Flex>
					</Flex>

					<Flex className={cn(styles.divider, 'my-2 pt-4 justify-center')}>
						<p className={styles.copyright}>
							&copy; 2024-2025 TidyTrek. All rights reserved.
						</p>
					</Flex>
				</Stack>
			</div>
		</footer>
	);
};
