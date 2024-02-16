import { Icon } from '../../../../shared/ui/SemanticUI';
import { Label, Container, type SemanticICONS } from 'semantic-ui-react';
import { Pack } from '../../../../types/packTypes';

const PackLabels = ({ pack }: { pack: Pack }) => {
	const { packLocationTag, packDurationTag, packSeasonTag, packDistanceTag } = pack;

	return (
		<Container>
			{packLocationTag && <PropertyLabel name={packLocationTag} icon="location arrow" />}
			{packSeasonTag && <PropertyLabel name={packSeasonTag} icon="sun" />}

			{packDurationTag && <PropertyLabel name={packDurationTag} icon="time" />}

			{packDistanceTag && (
				<Label>
					<i className="fa-solid fa-person-hiking" style={{ paddingRight: '5px' }} />
					{packDistanceTag}
				</Label>
			)}
		</Container>
	);
};

export default PackLabels;

type PropertyLabelProps = { name: string; icon: SemanticICONS | undefined };

const PropertyLabel = ({ name, icon }: PropertyLabelProps) => {
	return (
		<Label>
			<Icon name={icon} />
			{name}
		</Label>
	);
};
