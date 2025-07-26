import { Category } from '@/types/pack-types';
import { useCategoryInfo } from '../../../hooks/use-category-info';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { PackChartView } from './pack-chart-view';
import { PackEmptyGraphic } from './pack-empty-graphic/pack-empty-graphic';

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

	if (fetching || !packCategories) return null;

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

	// only show empty pack for users with pack categories (without weight)
	if (userView && !packHasWeight) {
		return <PackEmptyGraphic />;
	}

	return null;
};
