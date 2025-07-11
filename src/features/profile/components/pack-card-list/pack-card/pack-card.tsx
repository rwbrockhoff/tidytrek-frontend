import { type Pack } from '@/types/pack-types';
import { Flex, Heading, Inset, Text } from '@radix-ui/themes';
import { ViewsIcon, Link, PublicIcon, PrivateIcon } from '@/components/ui';
import { Card } from '@/components/ui/alpine';
import styles from './pack-card.module.css';
import { mx } from '@/styles/utils';
import { PackLabels, PackPhoto } from '@/components';
import { encode } from '@/utils';
import { useUploadPackPhotoMutation } from '@/queries/pack-queries';
import { cn } from '@/styles/utils/cn';

type PackCardProps = {
	pack: Pack;
	userView: boolean;
};

export const PackCard = ({ pack, userView }: PackCardProps) => {
	const { mutate: uploadPackPhoto, isPending } = useUploadPackPhotoMutation();
	const { packId, packName, packDescription, packPublic, packViews, packPhotoUrl } =
		pack || {};

	const handlePhotoUpload = (formData: FormData) => uploadPackPhoto({ packId, formData });

	const encodedPackId = encode(packId);
	const userBasedUrl = userView ? 'pack' : 'pk';
	const link = `/${userBasedUrl}/${encodedPackId}`;

	return (
		<Card.Root
			variant="surface"
			rounded="md"
			shadow="paper"
			override
			className={cn(styles.styledCard, mx.responsiveContent)}>
			<Link to={link} enabled={!userView} className="profilePackLink">
				<Inset clip="padding-box" side="top" pb="current">
					<PackPhoto
						src={packPhotoUrl}
						packId={packId}
						uploadEnabled={!isPending && userView}
						isPending={isPending}
						onUpload={handlePhotoUpload}
					/>
				</Inset>

				<Card.Body className={styles.cardBody}>
					<Heading size="4">
						<Link to={link} enabled={userView}>
							{packName}
						</Link>
					</Heading>
					<Flex align="center" gap="1" my="1">
						{packPublic ? (
							<>
								<PublicIcon size={16} />
								<Text size="2">Public</Text>
							</>
						) : (
							<>
								<PrivateIcon size={16} />
								<Text size="2">Private</Text>
							</>
						)}
					</Flex>
					<Text my="2">{packDescription}</Text>
					<PackLabels pack={pack} />
				</Card.Body>

				{userView && (
					<Card.Footer className={styles.cardFooter}>
						<Flex align="center" className={styles.cardFooterText}>
							<ViewsIcon size={16} />
							<Text>{packViews} Views</Text>
						</Flex>
					</Card.Footer>
				)}
			</Link>
		</Card.Root>
	);
};
