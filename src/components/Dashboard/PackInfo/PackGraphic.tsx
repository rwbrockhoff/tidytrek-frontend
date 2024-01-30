import { Category } from '../../../types/packTypes';
import PackChart from '../PackChart/PackChart';
import { Image, Icon } from 'semantic-ui-react';
import CampGraphic from '../../../assets/camping.svg';
import { useWeightSum } from './useWeightSum';

type PackGraphicProps = {
	fetching: boolean;
	packCategories: Category[];
};

const PackGraphic = (props: PackGraphicProps) => {
	const { fetching, packCategories } = props;
	const { categoryWeights, packHasWeight } = useWeightSum(packCategories);
	if (packHasWeight && !fetching) {
		return (
			<div className="pack-info-right-panel-graphic">
				<PackChart categories={packCategories} categoryWeights={categoryWeights} />
			</div>
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
