import { Category } from '../../../types/packTypes';
import PackChart from '../PackChart/PackChart';
import { Image, Icon, List, ListItem, Label, Divider } from 'semantic-ui-react';
import CampGraphic from '../../../assets/camping.svg';
import { useCategoryInfo } from './useCategoryInfo';

type PackGraphicProps = {
	fetching: boolean;
	packCategories: Category[];
};

const PackGraphic = (props: PackGraphicProps) => {
	const { fetching, packCategories } = props;
	const { chartCategoryInfo, categoryWeights, totalWeight, packHasWeight } =
		useCategoryInfo(packCategories);

	if (packHasWeight && !fetching) {
		return (
			<>
				<div className="pack-info-center-panel">
					<List className="chart-display-list">
						{chartCategoryInfo.map((category) => {
							return (
								<ListItem key={category.categoryId} className="chart-display-list-item">
									<Icon name="circle" style={{ color: category.chartColor || 'grey' }} />
									{category.categoryName} : <Label>{category.totalWeight} lbs</Label>
								</ListItem>
							);
						})}
						<Divider />

						<ListItem className="chart-display-list-item" style={{ fontSize: '0.9em' }}>
							Total Weight: <Label>{totalWeight} lbs</Label>
						</ListItem>
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
