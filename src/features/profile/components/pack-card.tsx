import {
	CardMeta,
	CardHeader,
	CardDescription,
	CardContent,
	Card,
	Icon,
} from 'semantic-ui-react';
import styled from 'styled-components';
import { PackLabels } from '@/features/dashboard/components/pack-info/pack-labels';
import { type Pack } from '@/types/pack-types';
import { Link } from '@/components/ui';
import { encode } from '@/utils';
import { PackPhoto } from '@/features/dashboard/components/pack-modal/pack-photo';
import { useUploadPackPhotoMutation } from '@/queries/pack-queries';

type PackCardProps = {
	pack: Pack;
	userView: boolean;
};

export const PackCard = (props: PackCardProps) => {
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
					<StyledCardHeader>
						<Link link={link} enabled={userView}>
							<p>{packName}</p>
						</Link>
					</StyledCardHeader>
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

const StyledCard = styled(Card)`
	&&& {
		margin: 15px;
		a {
			${({ theme: t }) => t.mx.themeColor('primary')}
			&:hover {
				opacity: 0.8;
			}
		}
		${({ theme: t }) => t.mx.mobile(`width: fit-content;`)}
	}
`;

const StyledCardHeader = styled(CardHeader)`
	p {
		${({ theme: t }) => t.mx.themeColor('primary')}
	}
`;
