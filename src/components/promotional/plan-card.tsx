import { Text } from '@radix-ui/themes';
import { Stack, Flex } from '@/components/layout';
import { BackpackIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './plan-card.module.css';

export const PlanCard = () => {
	return (
		<Flex className={cn(styles.planCard, 'justify-between items-center p-4 rounded-lg')}>
			<Stack className="gap-1">
				<Flex className="items-center gap-2">
					<BackpackIcon />
					<Text size="3" weight="bold">
						Pro Plan
					</Text>
				</Flex>
				<Text size="2" color="gray">
					Billed monthly
				</Text>
			</Stack>
			<Text size="5" weight="bold">
				$5/mo
			</Text>
		</Flex>
	);
};
