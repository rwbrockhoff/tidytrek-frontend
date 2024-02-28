import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Card,
	Icon,
	Image,
} from 'semantic-ui-react';
import styled from 'styled-components';
import PackLabels from '../../Dashboard/PackInfo/PackLabels/PackLabels';
import { type Pack } from '../../../types/packTypes';
import { CustomLink } from '../../../shared/ui/CustomLinks';
import { encode } from '../../../utils/generateDisplayId';
import { useUserContext } from '../../../views/Dashboard/hooks/useViewerContext';
import { mobile } from '../../../shared/mixins/mixins';

type PackCardProps = {
	pack: Pack;
};

const defaultPackPhoto =
	'https://photos.tidytrek.co/eyJidWNrZXQiOiJ0aWR5dHJlay1kZWZhdWx0LXBob3RvcyIsImtleSI6InBhY2tfY2FyZF9kZWZhdWx0LnBuZyIsImVkaXRzIjp7InJlc2l6ZSI6eyJ3aWR0aCI6NjAwLCJoZWlnaHQiOjQwMH19fQ==';

const PackCard = (props: PackCardProps) => {
	const userView = useUserContext();
	const { pack } = props;
	const { packId, packName, packDescription, packPublic, packViews, packPhotoUrl } =
		pack || {};

	const encodedPackId = encode(packId);
	const userBasedUrl = userView ? 'pack' : 'pk';
	const link = `/${userBasedUrl}/${encodedPackId}`;
	return (
		<CustomLink link={link} enabled={!userView}>
			<StyledCard>
				<Image src={packPhotoUrl || defaultPackPhoto} />
				<CardContent>
					<CardHeader>
						<CustomLink link={link} enabled={userView}>
							{packName}
						</CustomLink>
					</CardHeader>
					<CardMeta>
						<span>{packPublic ? 'Public' : 'Private'}</span>
					</CardMeta>
					<CardDescription>{packDescription}</CardDescription>
					<PackLabels pack={pack} padded />
				</CardContent>
				{userView && (
					<CardContent extra>
						<Icon name="eye" />
						{packViews} Views
					</CardContent>
				)}
			</StyledCard>
		</CustomLink>
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
		${mobile(`width: fit-content;`)}
	}
`;
