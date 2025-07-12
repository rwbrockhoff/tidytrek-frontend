import { Badge, Flex, Text } from '@radix-ui/themes';
import { CircleIcon } from '@/components/ui';
import { CategoryInfo } from '../types';
import styles from './category-list.module.css';

type CategoryListProps = {
	categories: CategoryInfo[];
};

export const CategoryList = ({ categories }: CategoryListProps) => {
	return (
		<Flex role="list" direction="column" className={styles.chartList}>
			{categories.map((category) => (
				<Flex
					align="center"
					key={category.categoryId}
					className={styles.chartItem}>
					<Text className={styles.styledText}>
						<Flex align="center" gap="2">
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
		</Flex>
	);
};