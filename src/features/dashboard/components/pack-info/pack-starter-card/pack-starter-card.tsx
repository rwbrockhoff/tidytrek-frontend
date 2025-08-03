import { Text, Heading } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import { Stack } from '@/components/layout';
import { Card } from '@/components/alpine';
import { PlusIcon, ChartIcon } from '@/components/icons';
import styles from './pack-starter-card.module.css';

export const PackStarterCard = () => {
	return (
		<Card.Root className={cn(styles.starterCard, 'mb-8 md:mb-0')}>
			<Stack className="gap-4">
				<Heading as="h3" size="3">
					Get started with your pack
				</Heading>

				<Stack className="gap-3">
					<div className={styles.tip}>
						<PlusIcon />
						<Text size="2">Add categories to organize your gear</Text>
					</div>

					<div className={styles.tip}>
						<ChartIcon />
						<Text size="2">Add weights to see your pack breakdown chart</Text>
					</div>
				</Stack>
			</Stack>
		</Card.Root>
	);
};
