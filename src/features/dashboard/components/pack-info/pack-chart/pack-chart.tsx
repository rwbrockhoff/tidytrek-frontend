import { type Category } from '@/types/pack-types';
import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, TooltipItem } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { getPaletteColor } from '@/styles/palette/palette-map';
import { usePackContext } from '@/features/dashboard/hooks/use-pack-context';

type PackChartProps = {
	categories: Category[];
	categoryWeights: number[];
};

// Register Chart.js components once
ChartJS.register(ArcElement, Tooltip, Legend);
ChartJS.overrides.doughnut.plugins.legend.display = false;
ChartJS.defaults.plugins.tooltip.displayColors = false;

export const PackChart = ({ categories, categoryWeights }: PackChartProps) => {
	const { palette, weightUnit } = usePackContext();
	const { settings } = useGetAuth();
	const isDarkMode = settings?.darkMode || false;

	const categoryLabels = useMemo(
		() => (categories || []).map((category) => category.packCategoryName),
		[categories],
	);

	const categoryColors = useMemo(
		() =>
			(categories || []).map((category) =>
				getPaletteColor(palette, category.packCategoryColor),
			),
		[categories, palette],
	);

	const borderColor = isDarkMode ? '#111827' : '#ffffff';

	const chartOptions = useMemo(
		() => ({
			responsive: true,
			maintainAspectRatio: true,
			aspectRatio: 1,
			plugins: {
				tooltip: {
					callbacks: {
						title: (context: TooltipItem<'doughnut'>[]) => {
							const categoryName = context[0]?.label || '';
							return categoryName.length > 20
								? categoryName.substring(0, 20) + '...'
								: categoryName;
						},
						label: (context: TooltipItem<'doughnut'>) => {
							const label = context.formattedValue || '0';
							return `${label} ${weightUnit.base}`;
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
					borderColor,
				},
			],
		}),
		[categoryLabels, categoryColors, categoryWeights, borderColor],
	);

	return (
		<div className="w-full md:w-fit h-full relative">
			<Doughnut data={chartData} options={chartOptions} />
		</div>
	);
};
