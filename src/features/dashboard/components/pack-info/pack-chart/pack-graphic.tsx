import { Category } from '@/types/pack-types';
import { useCategoryInfo } from '../../../hooks/use-category-info';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { PackChartView } from './pack-chart-view';
import { PackEmptyGraphic } from './pack-empty-graphic/pack-empty-graphic';

type PackGraphicProps = {
	packCategories: Category[];
	fetching: boolean;
	display: boolean;
};

export const PackGraphic = (props: PackGraphicProps) => {
	const { isCreator } = useUserPermissionsContext();

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
	if (isCreator && !packHasWeight) {
		return <PackEmptyGraphic />;
	}

	return null;
};
