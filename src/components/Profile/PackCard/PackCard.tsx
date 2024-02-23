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

type PackCardProps = {
	pack: Pack;
};
const PackCard = (props: PackCardProps) => {
	const { pack } = props;
	const { packName, packDescription, packPublic, packViews } = pack || {};
	return (
		<StyledCard>
			<CardContent>
				<CardHeader>{packName}</CardHeader>
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
	}
`;
