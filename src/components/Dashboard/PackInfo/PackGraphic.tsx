import { Category } from '../../../types/packTypes';
import PackChart from './PackChart/PackChart';
import { Image, List, ListItem, Label, Divider } from 'semantic-ui-react';
import { Icon } from '../../../shared/ui/SemanticUI';
import CampGraphic from '../../../assets/camping.svg';
import { useCategoryInfo } from './useCategoryInfo';
import PackSummaryPanel from './PackSummaryPanel';

type PackGraphicProps = {
	fetching: boolean;
	packCategories: Category[];
};

const PackGraphic = (props: PackGraphicProps) => {
	const { fetching, packCategories } = props;
	const {
		chartCategoryInfo,
		categoryWeights,
		totalWeight,
		packHasWeight,
		descriptivePackWeight,
		totalPackPrice,
	} = useCategoryInfo(packCategories, 'lb');

	if (packHasWeight && !fetching) {
		return (
			<>
				<div className="pack-info-center-panel">
					<List className="chart-display-list">
						{chartCategoryInfo.map((category) => {
							return (
								<ListItem key={category.categoryId} className="chart-display-list-item">
									<Icon name="circle" $themeColor={category.chartColor} />
									<p>{category.categoryName}: </p>
									<Label>{category.totalWeight} lbs</Label>
								</ListItem>
							);
						})}

						<Divider />

						<PackSummaryPanel
							totalWeight={totalWeight}
							descriptivePackWeight={descriptivePackWeight}
							totalPackPrice={totalPackPrice}
						/>
					</List>
				</div>
				<div className="pack-info-right-panel-chart">
					<PackChart categories={packCategories} categoryWeights={categoryWeights} />
				</div>
			</>
		);
	}
	if (!packHasWeight && !fetching) {
		return (
			<div className="pack-info-right-panel-graphic">
				<Image src={CampGraphic} />
				<p>
					<Icon name="hand point down outline" />
					Add items below to get started
				</p>
			</div>
		);
	} else return null;
};

export default PackGraphic;
