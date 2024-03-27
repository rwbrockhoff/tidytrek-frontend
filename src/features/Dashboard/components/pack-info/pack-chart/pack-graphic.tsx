import styled from 'styled-components';
import { Category } from '@/types/pack-types';
import { PackChart } from './pack-chart';
import { Badge, Flex, Separator } from '@radix-ui/themes';
import { CircleIcon, DownArrowIcon } from '@/components/ui';
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
					<ChartList role="list" direction="column">
						{chartCategoryInfo.map((category) => {
							return (
								<ChartItem key={category.categoryId}>
									<ThemeIcon $themeColor={category.chartColor} />
									<p>{category.categoryName}: </p>
									<Badge color="gray" ml="auto">
										{category.totalWeight} lbs
									</Badge>
								</ChartItem>
							);
						})}

						<Separator size="4" mb="4" style={{ opacity: 0.5 }} />

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
				<img src={CampGraphic} />
				<GraphicText>
					<DownArrowIcon />
					Add items below to get started
				</GraphicText>
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
			margin-bottom: ${props.$display ? '3em' : 0};
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
	${({ theme: t }) => t.mx.mobile(`display:none;`)}
`;

const GraphicText = styled.p`
	display: inline-flex;
	align-items: center;
	width: 50%;
	text-align: center;
	margin-right: 1.25em;
	svg {
		margin-right: 0.5em;
	}
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

const ChartList = styled(Flex)`
	width: fit-content;
	${({ theme: t }) =>
		t.mx.mobile(`
				width: 75vw;
		`)}
`;
const ChartItem = styled(Flex)`
	height: 2.5em;
	font-size: 0.9em;
	display: flex;
	align-items: center;
	p {
		margin-right: 5px;
	}
`;

const ThemeIcon = styled(CircleIcon)<{ $themeColor: string }>`
	${(props) => props.theme.mx.themeColor(props.$themeColor)};
	margin-right: 0.5em;
`;
