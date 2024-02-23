import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Card,
	Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { Pack } from '../../../types/packTypes';
import { Link } from 'react-router-dom';
import { encode } from '../../../utils/generateDisplayId';

type PackCardProps = {
	pack: Pack;
};

const PackCard = (props: PackCardProps) => {
	const { pack } = props;
	const { packId, packName, packDescription, packPublic, packViews } = pack || {};
	const encodedPackId = encode(packId);
	return (
		<StyledCard>
			<CardContent>
				<CardHeader>
					<Link to={`/pack/${encodedPackId}`}>{packName}</Link>
				</CardHeader>
				<CardMeta>
					<span>{packPublic ? 'Public' : 'Private'}</span>
				</CardMeta>
				<CardDescription>{packDescription}</CardDescription>
			</CardContent>
			<CardContent extra>
				<Icon name="eye" />
				{packViews} Views
			</CardContent>
		</StyledCard>
	);
};

export default PackCard;

const StyledCard = styled(Card)`
	&&& {
		margin: 15px;

		a {
			color: ${(props) => props.theme.primary || 'inherit'};
			&:hover {
				opacity: 0.8;
			}
		}
	}
`;
