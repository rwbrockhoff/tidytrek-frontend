import { Badge, Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { CircleIcon } from '@/components/icons';
import { CategoryInfo } from '../types';
import styles from './category-list.module.css';
import { cn } from '@/styles/utils';
import { useUserWeightUnit } from '@/hooks/ui/use-user-weight-unit';

type CategoryListProps = {
	categories: CategoryInfo[];
};

export const CategoryList = ({ categories }: CategoryListProps) => {
	const weightUnit = useUserWeightUnit();

	return (
		<Stack role="list" className={styles.chartList}>
			{categories.map((category) => (
				<Flex key={category.categoryId} className={cn(styles.chartItem, 'items-center')}>
					<Flex className="items-center gap-2 flex-nowrap">
						<CircleIcon
							className="lucide-sm"
							style={{
								fill: `var(--${category.chartColor})`,
								color: 'transparent',
							}}
						/>
						<Text className={styles.styledText}>
							{category.categoryName || 'Category'}
						</Text>
					</Flex>
					<Badge color="gray" ml="auto">
						{category.totalWeight} {weightUnit}
					</Badge>
				</Flex>
			))}
		</Stack>
	);
};
