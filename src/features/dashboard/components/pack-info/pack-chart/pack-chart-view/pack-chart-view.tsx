import { Flex, Stack } from '@/components/layout';
import { Separator } from '@radix-ui/themes';
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
		<Flex className={cn(styles.outerPanel, !display && styles.hidden, 'items-center h-auto')}>
			<Stack className={cn(styles.summaryPanel, mx.responsiveContent, 'items-end h-auto')}>
				<CategoryList categories={chartCategoryInfo} />
				<Separator size="4" my="2" style={{ opacity: 0.5 }} />
				<PackSummaryPanel
					totalWeight={totalWeight}
					descriptivePackWeight={descriptivePackWeight}
					totalPackPrice={totalPackPrice}
				/>
			</Stack>
			<Flex className={cn(styles.chartPanel, 'items-center justify-end')}>
				<PackChart categories={packCategories} categoryWeights={categoryWeights} />
			</Flex>
		</Flex>
	);
};
