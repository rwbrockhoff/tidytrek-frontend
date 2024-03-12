import { Icon } from './ui/SemanticUI';
import styled, { css } from 'styled-components';
import { Label, type SemanticICONS } from 'semantic-ui-react';
import { Pack } from '../types/pack-types';
import { isValidElement } from 'react';

export const PackLabels = ({
	pack,
	padded = false,
}: {
	pack: Pack;
	padded?: boolean;
}) => {
	const { packLocationTag, packDurationTag, packSeasonTag, packDistanceTag } = pack;

	return (
		<PackLabelContainer $padded={padded}>
			{packLocationTag && <PropertyLabel name={packLocationTag} icon="location arrow" />}
			{packSeasonTag && <PropertyLabel name={packSeasonTag} icon="sun" />}

			{packDurationTag && <PropertyLabel name={packDurationTag} icon="time" />}

			{packDistanceTag && (
				<PropertyLabel
					name={packDistanceTag}
					icon={
						<i className="fa-solid fa-person-hiking" style={{ paddingRight: '5px' }} />
					}
				/>
			)}
		</PackLabelContainer>
	);
};

type PropertyLabelProps = { name: string; icon: SemanticICONS | React.ReactNode };

const PropertyLabel = ({ name, icon }: PropertyLabelProps) => {
	const iconIsJsx = isValidElement(icon);

	if (iconIsJsx) {
		return (
			<Label>
				{icon}
				{name}
			</Label>
		);
	} else {
		return (
			<Label>
				<Icon name={icon} />
				{name}
			</Label>
		);
	}
};

const PackLabelContainer = styled.div<{ $padded?: boolean }>`
	${(props) =>
		props.$padded &&
		css`
			margin-top: 15px;
			.label {
				margin-right: 5px;
				margin-bottom: 10px;
			}
		`};
`;
