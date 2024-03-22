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

				<Flex direction="column" mb="6">
					<StyledCardHeader size="4">
						<Link link={link} enabled={userView}>
							{packName}
						</Link>
					</StyledCardHeader>
					<Text size="2" my="1" color="gray">
						{packPublic ? 'Public' : 'Private'}
					</Text>
					<Text my="2" color="gray">
						{packDescription}
					</Text>
					<PackLabels pack={pack} />
				</Flex>

				{userView && (
					<CardFooter direction="column">
						<Separator size="4" mt="4" />

						<CardFooterText color="gray" mt="2">
							<ViewsIcon />
							{packViews} Views
						</CardFooterText>
					</CardFooter>
				)}
			</StyledCard>
		</Link>
	);
};

const CardFooter = styled(Flex)`
	position: absolute;
	bottom: 0;
	width: calc(100% - (var(--card-padding) * 2));
`;
const StyledCard = styled(Card)`
	display: flex;
	width: 100%;
	max-width: 325px;
	height: 100%;
	position: relative;
	padding-bottom: 1em;
	a {
		${({ theme: t }) => t.mx.themeColor('primary')}
		&:hover {
			filter: brightness(80%);
		}
	}
	${({ theme: t }) => t.mx.mobile(`width: fit-content;`)}
`;

const CardFooterText = styled(Text)`
	display: flex;
	align-items: center;
	svg {
		margin-right: 0.5em;
	}
`;

const StyledCardHeader = styled(Heading)`
	${({ theme: t }) => t.mx.themeColor('primary')}
`;
