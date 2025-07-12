import { Category } from '@/types/pack-types';
import { useCategoryInfo } from '../../../hooks/use-category-info';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { PackChartView } from './pack-chart-view';
import { PackEmptyState } from './pack-empty-state';

type PackGraphicProps = {
	packCategories: Category[];
	fetching: boolean;
	display: boolean;
};

export const PackGraphic = (props: PackGraphicProps) => {
	const userView = useUserContext();

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

	if (noPackWeight) {
		return <PackEmptyState />;
	}

	return null;
};
