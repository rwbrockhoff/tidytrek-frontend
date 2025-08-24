import { Category } from '@/types/pack-types';
import { useCategoryInfo } from '../../../hooks/use-category-info';
import { usePermissions } from '@/hooks/auth/use-permissions';
import { PackChartView } from './pack-chart-view';
import { PackEmptyGraphic } from './pack-empty-graphic/pack-empty-graphic';

type PackGraphicProps = {
	packCategories: Category[];
	fetching: boolean;
	display: boolean;
};

export const PackGraphic = (props: PackGraphicProps) => {
	const { isCreator } = usePermissions();

	const { packCategories, fetching, display } = props;
	const {
		chartCategoryInfo,
		categoryWeights,
		totalWeight,
		packHasWeight,
		descriptivePackWeight,
		totalPackPrice,
	} = useCategoryInfo(packCategories);

	if (fetching || !packCategories) return null;

	// Wait for calculations before showing chart UI
	const isCalculating =
		packCategories.length > 0 && (!chartCategoryInfo || chartCategoryInfo.length === 0);

	if (isCalculating) return null;

	if (packHasWeight) {
		return (
			<PackChartView
				packCategories={packCategories}
				chartCategoryInfo={chartCategoryInfo}
				categoryWeights={categoryWeights}
				totalWeight={totalWeight}
				descriptivePackWeight={descriptivePackWeight}
				totalPackPrice={totalPackPrice}
				display={display}
			/>
		);
	}

	// No weight - show empty graphic (and null for viewers)
	return isCreator ? <PackEmptyGraphic /> : null;
};
