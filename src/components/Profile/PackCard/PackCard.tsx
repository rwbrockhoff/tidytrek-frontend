import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Card,
	Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import PackLabels from '../../Dashboard/PackInfo/PackLabels/PackLabels';
import { type Pack } from '../../../types/packTypes';
import { Link } from '../../../shared/ui/Link';
import { encode } from '../../../utils/generateDisplayId';
import { mobile } from '../../../shared/mixins/mixins';
import PackPhoto from '../../Dashboard/PackInfo/PackFormModal/PackPhoto';
import { useUploadPackPhotoMutation } from '../../../queries/packQueries';

type PackCardProps = {
	pack: Pack;
	userView: boolean;
};

const PackCard = (props: PackCardProps) => {
	const { mutate: uploadPackPhoto, isPending } = useUploadPackPhotoMutation();
	const { pack, userView } = props;
	const { packId, packName, packDescription, packPublic, packViews, packPhotoUrl } =
		pack || {};

	const handlePhotoUpload = (formData: FormData) => uploadPackPhoto({ packId, formData });

	const encodedPackId = encode(packId);
	const userBasedUrl = userView ? 'pack' : 'pk';
	const link = `/${userBasedUrl}/${encodedPackId}`;

	return (
		<Link link={link} enabled={!userView}>
			<StyledCard>
				<PackPhoto
					src={packPhotoUrl}
					uploadEnabled={!isPending && userView}
					isPending={isPending}
					onUpload={handlePhotoUpload}
				/>
				<CardContent>
					<CardHeader>
						<Link link={link} enabled={userView}>
							{packName}
						</Link>
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
		</Link>
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
