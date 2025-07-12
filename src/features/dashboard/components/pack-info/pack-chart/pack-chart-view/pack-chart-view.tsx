import { Flex, Separator } from '@radix-ui/themes';
import { cn, mx } from '@/styles/utils';
import { Category } from '@/types/pack-types';
import { PackChart } from '../pack-chart';
import { PackSummaryPanel } from './pack-summary-panel/pack-summary-panel';
import { CategoryList } from '../category-list';
import { CategoryInfo } from '../types';
import styles from './pack-chart-view.module.css';

type PackChartViewProps = {
	packCategories: Category[];
	chartCategoryInfo: CategoryInfo[];
	categoryWeights: number[];
	totalWeight: number;
	descriptivePackWeight: { baseWeight: string; consumables: string; wornWeight: string };
	totalPackPrice: string | number;
	display: boolean;
};

export const PackChartView = ({
	packCategories,
	chartCategoryInfo,
	categoryWeights,
	totalWeight,
	descriptivePackWeight,
	totalPackPrice,
	display,
}: PackChartViewProps) => {
	return (
		<Flex align="center" className={cn(styles.outerPanel, !display && styles.hidden)}>
			<Flex
				direction="column"
				align="end"
				className={cn(styles.summaryPanel, mx.responsiveContent)}>
				<CategoryList categories={chartCategoryInfo} />
				<Separator size="4" my="2" style={{ opacity: 0.5 }} />
				<PackSummaryPanel
					totalWeight={totalWeight}
					descriptivePackWeight={descriptivePackWeight}
					totalPackPrice={totalPackPrice}
				/>
			</Flex>
			<Flex align="center" justify="end" className={styles.chartPanel}>
				<PackChart categories={packCategories} categoryWeights={categoryWeights} />
			</Flex>
		</Flex>
	);
};
