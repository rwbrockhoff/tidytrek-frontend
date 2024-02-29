import { Category } from '../../../types/packTypes';
import PackChart from './PackChart/PackChart';
import { Image, List, ListItem, Label, Divider } from 'semantic-ui-react';
import { Icon } from '../../../shared/ui/SemanticUI';
import CampGraphic from '../../../assets/camping.svg';
import { useCategoryInfo } from './useCategoryInfo';
import PackSummaryPanel from './PackSummaryPanel';
import { Panel } from '../../../shared/ui/TidyUI';
import styled from 'styled-components';

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
				<SummaryPanel $width="25%">
					<ChartList>
						{chartCategoryInfo.map((category) => {
							return (
								<ChartItem key={category.categoryId}>
									<Icon name="circle" $themeColor={category.chartColor} />
									<p>{category.categoryName}: </p>
									<Label>{category.totalWeight} lbs</Label>
								</ChartItem>
							);
						})}

						<Divider />

						<PackSummaryPanel
							totalWeight={totalWeight}
							descriptivePackWeight={descriptivePackWeight}
							totalPackPrice={totalPackPrice}
						/>
					</ChartList>
				</SummaryPanel>
				<ChartPanel $width="25%">
					<PackChart categories={packCategories} categoryWeights={categoryWeights} />
				</ChartPanel>
			</>
		);
	}
	if (!packHasWeight && !fetching) {
		return (
			<GraphicPanel $width="50%">
				<Image src={CampGraphic} />
				<p>
					<Icon name="hand point down outline" />
					Add items below to get started
				</p>
			</GraphicPanel>
		);
	} else return null;
};

export default PackGraphic;

const ChartPanel = styled(Panel)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-left: 25px;
`;

const GraphicPanel = styled(Panel)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	justify-content: flex-end;
	height: 30vh;
	img {
		height: 100%;
	}
	p {
		margin-right: 30px;
	}
`;

const SummaryPanel = styled(Panel)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-right: 15px;
`;

const ChartList = styled(List)`
	&&& {
		width: fit-content;
	}
`;
const ChartItem = styled(ListItem)`
	&&& {
		font-size: 0.9em;
		display: flex;
		align-items: baseline;
		p {
			margin-right: 5px;
		}
		div.ui.label {
			margin-left: auto;
		}
	}
`;
