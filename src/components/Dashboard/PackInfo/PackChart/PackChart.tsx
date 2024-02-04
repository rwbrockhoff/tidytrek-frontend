import './PackChart.css';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Category } from '../../../../types/packTypes';

type PackChartProps = {
	categories: Category[];
	categoryWeights: number[];
};

const PackChart = (props: PackChartProps) => {
	ChartJS.register(ArcElement, Tooltip, Legend);
	ChartJS.overrides.doughnut.plugins.legend.display = false;
	ChartJS.defaults.plugins.tooltip.displayColors = false;
	ChartJS.defaults.plugins.tooltip.callbacks.label = (context) => {
		let label = context.formattedValue || '0';
		return (label += ' lbs');
	};

	const categoryLabels = props.categories.map((category) => {
		return category.packCategoryName;
	});

	const chartData = {
		labels: categoryLabels,
		datasets: [
			{
				data: props.categoryWeights,
				backgroundColor: [
					'#338866',
					'#78B87A',
					'#5F84A2',
					'#7BB8C0',
					'#A7B5FE',
					'#F36F3B',
				],
				borderWidth: 2,
			},
		],
	};

	return (
		<div className="pack-chart-container">
			<Doughnut data={chartData} />
		</div>
	);
};

export default PackChart;