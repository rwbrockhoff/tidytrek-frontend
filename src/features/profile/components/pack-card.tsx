import { type Pack } from '@/types/pack-types';
import { Card, Flex, Heading, Inset, Separator, Text } from '@radix-ui/themes';
import { ViewsIcon, Link } from '@/components/ui';
import styled from 'styled-components';
import { PackLabels, PackPhoto } from '@/components';
import { encode } from '@/utils';
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
			<StyledCard m="2">
				<Inset clip="padding-box" side="top" pb="current">
					<PackPhoto
						src={packPhotoUrl}
						uploadEnabled={!isPending && userView}
						isPending={isPending}
						onUpload={handlePhotoUpload}
					/>
				</Inset>
				<Flex direction="column">
					<StyledCardHeader size="4">
						<Link link={link} enabled={userView}>
							{packName}
						</Link>
					</StyledCardHeader>
					<CardMeta size="2" my="1">
						{packPublic ? 'Public' : 'Private'}
					</CardMeta>
					<Text my="2">{packDescription}</Text>
					<PackLabels pack={pack} />
				</Flex>
				{userView && (
					<CardFooter direction="column">
						<Separator size="4" my="4" />
						<p>
							<ViewsIcon />
							{packViews} Views
						</p>
					</CardFooter>
				)}
			</StyledCard>
		</Link>
	);
};

const StyledCard = styled(Card)`
	width: 30%;
	max-width: 325px;
	a {
		${({ theme: t }) => t.mx.themeColor('primary')}
		&:hover {
			filter: brightness(80%);
		}
	}
	${({ theme: t }) => t.mx.mobile(`width: fit-content;`)}
`;

const CardMeta = styled(Text)`
	color: var(--gray-9);
`;

const CardFooter = styled(Flex)`
	color: var(--gray-9);
	p {
		display: flex;
		align-items: center;
		svg {
			margin-right: 0.5em;
		}
	}
`;

const StyledCardHeader = styled(Heading)`
	${({ theme: t }) => t.mx.themeColor('primary')}
`;
