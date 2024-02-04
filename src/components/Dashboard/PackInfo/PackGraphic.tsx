import { Category } from '../../../types/packTypes';
import PackChart from '../PackChart/PackChart';
import {
	Image,
	Icon,
	List,
	ListItem,
	Label,
	Divider,
	Popup,
	PopupContent,
} from 'semantic-ui-react';
import CampGraphic from '../../../assets/camping.svg';
import { useCategoryInfo } from './useCategoryInfo';

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
	} = useCategoryInfo(packCategories, 'lb');

	if (packHasWeight && !fetching) {
		return (
			<>
				<div className="pack-info-center-panel">
					<List className="chart-display-list">
						{chartCategoryInfo.map((category) => {
							return (
								<ListItem key={category.categoryId} className="chart-display-list-item">
									<Icon name="circle" style={{ color: category.chartColor || 'grey' }} />
									<p>{category.categoryName}: </p>
									<Label>{category.totalWeight} lbs</Label>
								</ListItem>
							);
						})}
						<Divider />
						<Popup
							mouseEnterDelay={700}
							on="hover"
							trigger={
								<ListItem
									className="chart-display-list-item"
									style={{ cursor: 'pointer' }}>
									<Icon name="info circle" style={{ marginRight: 5, opacity: 0.2 }} />{' '}
									Total Weight: <Label>{totalWeight} lbs</Label>
								</ListItem>
							}>
							<PopupContent>
								<List className="chart-display-popup-list" relaxed>
									<ListItem className="chart-display-list-item">
										<p>
											<Icon color="teal" name="balance scale" />
											Base Weight:
										</p>
										<Label>{descriptivePackWeight.baseWeight}</Label>
									</ListItem>

									<ListItem className="chart-display-list-item">
										<p>
											<Icon name="food" color="olive" />
											Consumables:
										</p>
										<Label>{descriptivePackWeight.consumables}</Label>
									</ListItem>
									<ListItem className="chart-display-list-item">
										<p>
											<i className={`fa-solid fa-shirt`} />
											Worn Weight:
										</p>
										<Label>{descriptivePackWeight.wornWeight}</Label>
									</ListItem>
									<Divider />
									<ListItem className="chart-display-list-item">
										<p>Total Weight: </p> <Label>{totalWeight} lbs</Label>
									</ListItem>
								</List>
							</PopupContent>
						</Popup>
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
