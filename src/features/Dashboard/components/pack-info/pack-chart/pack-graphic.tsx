import styled from 'styled-components';
import { Category } from '@/types/pack-types';
import { PackChart } from './pack-chart';
import { Image, List, ListItem, Label, Divider } from 'semantic-ui-react';
import { Icon } from '@/components/ui/SemanticUI';
import { Panel } from '@/components/ui/TidyUI';
import CampGraphic from '@/assets/camping.svg';
import { useCategoryInfo } from '../../../hooks/use-category-info';
import { PackSummaryPanel } from '../pack-summary-panel';

type PackGraphicProps = {
	packCategories: Category[];
	fetching: boolean;
	display: boolean;
};

export const PackGraphic = (props: PackGraphicProps) => {
	const { packCategories, fetching, display } = props;
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
			<OuterPanel $width="50%" $display={display}>
				<SummaryPanel $width="50%">
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
				<ChartPanel $width="50%">
					<PackChart categories={packCategories} categoryWeights={categoryWeights} />
				</ChartPanel>
			</OuterPanel>
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

const OuterPanel = styled(Panel)<{ $display: boolean }>`
	display: flex;
	align-items: center;
	transition: max-height 350ms ease-in-out;
	${(props) =>
		props.theme.mx.mobile(`
			max-height: ${props.$display ? '150vh' : 0};
			overflow: hidden;
			flex-direction: column-reverse;
	`)}
`;

const ChartPanel = styled(Panel)`
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-left: 25px;
	${({ theme: t }) =>
		t.mx.mobile(`
			width: 75vw;
			margin-left: 0;
			margin-bottom: 25px;
	`)}
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
	${({ theme: t }) => t.mx.mobile(`display:none;`)}
`;

const SummaryPanel = styled(Panel)`
	display: flex;
	flex-direction: column;
	align-items: flex-end;
	padding-right: 15px;
	${({ theme: t }) =>
		t.mx.mobile(`
			padding-right: 0;
			align-items: center;
	`)}
`;

const ChartList = styled(List)`
	&&& {
		width: fit-content;
		${({ theme: t }) =>
			t.mx.mobile(`
				width: 75vw;
		`)}
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
