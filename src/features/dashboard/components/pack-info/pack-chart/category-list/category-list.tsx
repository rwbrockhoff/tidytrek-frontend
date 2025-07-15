import { Badge, Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { CircleIcon } from '@/components/icons';
import { CategoryInfo } from '../types';
import styles from './category-list.module.css';
import { cn } from '@/styles/utils';

type CategoryListProps = {
	categories: CategoryInfo[];
};

export const CategoryList = ({ categories }: CategoryListProps) => {
	return (
		<Stack role="list" className={styles.chartList}>
			{categories.map((category) => (
				<Flex key={category.categoryId} className={cn(styles.chartItem, 'items-center')}>
					<Text className={styles.styledText}>
						<Flex className="items-center gap-2">
							<CircleIcon
								className="lucide-sm"
								style={{
									fill: `var(--${category.chartColor})`,
									color: 'transparent',
								}}
							/>
							{category.categoryName || 'Category'}
						</Flex>
					</Text>
					<Badge color="gray" ml="auto">
						{category.totalWeight} lbs
					</Badge>
				</Flex>
			))}
		</Stack>
	);
};
