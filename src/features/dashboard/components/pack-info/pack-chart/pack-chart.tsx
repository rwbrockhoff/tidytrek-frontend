import { type Category } from '@/types/pack-types';
import { Flex } from '@/components/layout';
import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useUserWeightUnit } from '@/hooks/ui/use-user-weight-unit';

type PackChartProps = {
	categories: Category[];
	categoryWeights: number[];
};

// Register Chart.js components once
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.overrides.doughnut.plugins.legend.display = false;
ChartJS.defaults.plugins.tooltip.displayColors = false;

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
	const weightUnit = useUserWeightUnit();
	
	const categoryLabels = useMemo(
		() => (categories || []).map((category) => category.packCategoryName),
		[categories],
	);

	const categoryColors = useMemo(
		() =>
			(categories || []).map((category) => getPaletteColor(category.packCategoryColor)),
		[categories],
	);

	const chartOptions = useMemo(
		() => ({
			plugins: {
				tooltip: {
					callbacks: {
						label: (context: TooltipItem<'doughnut'>) => {
							const label = context.formattedValue || '0';
							return `${label} ${weightUnit}`;
						},
					},
				},
			},
		}),
		[weightUnit],
	);

	const chartData = useMemo(
		() => ({
			labels: categoryLabels,
			datasets: [
				{
					data: categoryWeights,
					backgroundColor: categoryColors,
					borderWidth: 2,
				},
			],
		}),
		[categoryLabels, categoryColors, categoryWeights],
	);

	return (
		<Flex className="justify-center items-center w-full">
			<Doughnut data={chartData} options={chartOptions} />
		</Flex>
	);
};
