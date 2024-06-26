import { type Category } from '@/types/pack-types';
import styled, { useTheme } from 'styled-components';
import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

type PackChartProps = {
	categories: Category[];
	categoryWeights: number[];
};

export const PackChart = ({ categories, categoryWeights }: PackChartProps) => {
	const theme = useTheme();

	ChartJS.register(ArcElement, Tooltip, Legend);
	ChartJS.overrides.doughnut.plugins.legend.display = false;
	ChartJS.defaults.plugins.tooltip.displayColors = false;
	ChartJS.defaults.plugins.tooltip.callbacks.label = (context) => {
		let label = context.formattedValue || '0';
		return (label += ' lbs');
	};

	const categoryLabels = useMemo(
		() =>
			categories.map((category) => {
				return category.packCategoryName;
			}),
		[categories],
	);

	const categoryColors = useMemo(
		() =>
			categories.map((category) => {
				return theme.user[category.packCategoryColor];
			}),
		[categories],
	);

	const chartData = {
		labels: categoryLabels,
		datasets: [
			{
				data: categoryWeights,
				backgroundColor: categoryColors,
				borderWidth: 2,
			},
		],
	};

	return (
		<ChartContainer>
			<Doughnut data={chartData} />
		</ChartContainer>
	);
};

const ChartContainer = styled.div`
	${({ theme: t }) => t.mx.flexCenter()}
	width: 100%;
`;
