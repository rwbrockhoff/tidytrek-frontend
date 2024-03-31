import styled from 'styled-components';
import { Category } from '@/types/pack-types';
import { PackChart } from './pack-chart';
import { Badge, Flex, Separator, Text } from '@radix-ui/themes';
import { CircleIcon, DownArrowIcon } from '@/components/ui';
import CampGraphic from '@/assets/camping.svg';
import { useCategoryInfo } from '../../../hooks/use-category-info';
import { PackSummaryPanel } from '../pack-summary-panel';
import { useUserContext } from '@/hooks';

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
			<OuterPanel align="center" $display={display}>
				<SummaryPanel direction="column" align="end">
					<ChartList role="list" direction="column">
						{chartCategoryInfo.map((category) => {
							return (
								<ChartItem align="center" key={category.categoryId}>
									<ThemeIcon $themeColor={category.chartColor} />
									<p>{category.categoryName || 'Category'} </p>
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
				<ChartPanel align="center" justify="end">
					<PackChart categories={packCategories} categoryWeights={categoryWeights} />
				</ChartPanel>
			</OuterPanel>
		);
	}
	if (noPackWeight) {
		return (
			<GraphicPanel align="center" justify="end">
				<Flex direction="column" height="auto">
					<img src={CampGraphic} />
					<GraphicText align="center">
						<DownArrowIcon />
						Add items below to get started
					</GraphicText>
				</Flex>
			</GraphicPanel>
		);
	} else return null;
};

const OuterPanel = styled(Flex)<{ $display: boolean }>`
	width: 50%;
	transition: max-height 350ms ease-in-out;
	${(props) =>
		props.theme.mx.mobile(`
		width: 100%;
			max-height: ${props.$display ? '150vh' : 0};
			overflow: hidden;
			flex-direction: column-reverse;
			margin-bottom: ${props.$display ? '3em' : 0};
	`)}
`;

const ChartPanel = styled(Flex)`
	width: 50%;
	margin-left: 25px;
	${({ theme: t }) =>
		t.mx.mobile(`
			width: 75vw;
			margin-left: 0;
			margin-bottom: 25px;
			
	`)}
`;

const GraphicPanel = styled(Flex)`
	width: 50%;
	height: 30vh;
	img {
		height: 100%;
	}
	${({ theme: t }) => t.mx.mobile(`display:none;`)}
`;

const GraphicText = styled(Text)`
	${({ theme }) => theme.mx.flexCenter()}
	svg {
		margin-right: 0.5em;
	}
`;

const SummaryPanel = styled(Flex)`
	width: 50%;
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
	p {
		margin-right: 5px;
	}
`;

const ThemeIcon = styled(CircleIcon)<{ $themeColor: string }>`
	${(props) => props.theme.mx.themeColor(props.$themeColor)};
	margin-right: 0.5em;
`;
