import { type Category } from '@/types/pack-types';
import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Flex } from '@radix-ui/themes';

type PackChartProps = {
	categories: Category[];
	categoryWeights: number[];
};

// Register Chart.js components once
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.overrides.doughnut.plugins.legend.display = false;
ChartJS.defaults.plugins.tooltip.displayColors = false;
ChartJS.defaults.plugins.tooltip.callbacks.label = (context) => {
	let label = context.formattedValue || '0';
	return (label += ' lbs');
};

// New utility fn that converts variable -> computed value for chart
const getPaletteColor = (colorName: string): string => {
	const cssVariable = `--${colorName}`;
	const paletteElement = document.querySelector('[data-theme-palette]');
	const computedValue = paletteElement
		? getComputedStyle(paletteElement).getPropertyValue(cssVariable).trim()
		: getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();

	return computedValue || '#338866'; // Fallback color
};

export const PackChart = ({ categories, categoryWeights }: PackChartProps) => {
	const categoryLabels = useMemo(
		() => categories.map((category) => category.packCategoryName),
		[categories],
	);

	const categoryColors = useMemo(
		() => categories.map((category) => getPaletteColor(category.packCategoryColor)),
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
		<Flex justify="center" align="center" width="100%">
			<Doughnut data={chartData} />
		</Flex>
	);
};
