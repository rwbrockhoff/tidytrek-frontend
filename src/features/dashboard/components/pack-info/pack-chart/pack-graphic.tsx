import { useTheme } from 'styled-components';
import styles from './pack-graphic.module.css';
import { cn } from '@/styles/utils/cn';
import { Category } from '@/types/pack-types';
import { PackChart } from './pack-chart';
import { Badge, Flex, Separator, Text } from '@radix-ui/themes';
import { CircleIcon, DownArrowIcon } from '@/components/ui';
import CampGraphic from '@/assets/camping.svg';
import { useCategoryInfo } from '../../../hooks/use-category-info';
import { PackSummaryPanel } from '../pack-summary-panel';
import { useUserContext } from '@/hooks';

type PackGraphicProps = {
	packCategories: Category[];
	fetching: boolean;
	display: boolean;
};

export const PackGraphic = (props: PackGraphicProps) => {
	const userView = useUserContext();
	const theme = useTheme();

	const { packCategories, fetching, display } = props;
	const {
		chartCategoryInfo,
		categoryWeights,
		totalWeight,
		packHasWeight,
		descriptivePackWeight,
		totalPackPrice,
	} = useCategoryInfo(packCategories, 'lb');

	const noPackWeight = userView && !packHasWeight;

	if (fetching) return null;

	if (packHasWeight) {
		return (
			<Flex
				align="center"
				className={cn(styles.outerPanel, !display && styles.hidden)}
			>
				<Flex direction="column" align="end" className={styles.summaryPanel}>
					<Flex role="list" direction="column" className={styles.chartList}>
						{chartCategoryInfo.map((category) => {
							return (
								<Flex
									align="center"
									key={category.categoryId}
									className={styles.chartItem}>
									<CircleIcon
										className={styles.themeIcon}
										style={{ color: theme.user[category.chartColor] }}
									/>
									<Text className={styles.styledText}>
										{category.categoryName || 'Category'}
									</Text>
									<Badge color="gray" ml="auto">
										{category.totalWeight} lbs
									</Badge>
								</Flex>
							);
						})}

						<Separator size="4" mb="4" style={{ opacity: 0.5 }} />

						<PackSummaryPanel
							totalWeight={totalWeight}
							descriptivePackWeight={descriptivePackWeight}
							totalPackPrice={totalPackPrice}
						/>
					</Flex>
				</Flex>
				<Flex align="center" justify="end" className={styles.chartPanel}>
					<PackChart categories={packCategories} categoryWeights={categoryWeights} />
				</Flex>
			</Flex>
		);
	}
	if (noPackWeight) {
		return (
			<Flex align="center" justify="end" className={styles.graphicPanel}>
				<Flex direction="column" height="auto">
					<img src={CampGraphic} />
					<Flex justify="center" align="center">
						<DownArrowIcon />
						<Text>Add items below to get started</Text>
					</Flex>
				</Flex>
			</Flex>
		);
	} else return null;
};
