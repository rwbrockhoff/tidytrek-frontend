import { type Pack } from '@/types/pack-types';
import { Heading, Inset, Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { ViewsIcon, PublicIcon, PrivateIcon, BookmarkIcon } from '@/components/icons';
import { Card } from '@/components/alpine';
import { Link } from '@/components/ui';
import styles from './pack-card.module.css';
import { cn, mx } from '@/styles/utils';
import { PackLabels, PackPhoto } from '@/components';
import { encode, formatNumber } from '@/utils';
import { useUploadPackPhotoMutation } from '@/queries/pack-queries';

type PackCardProps = {
	pack: Pack;
	canEdit: boolean;
};

export const PackCard = ({ pack, canEdit }: PackCardProps) => {
	const { mutate: uploadPackPhoto, isPending } = useUploadPackPhotoMutation();
	const { packId, packName, packDescription, packPublic, packViews, packPhotoUrl, packBookmarkCount } =
		pack || {};

	const handlePhotoUpload = (formData: FormData) => uploadPackPhoto({ packId, formData });

	const encodedPackId = encode(packId);
	const userBasedUrl = canEdit ? 'pack' : 'pk';
	const link = `/${userBasedUrl}/${encodedPackId}`;

	return (
		<Card.Root
			variant="surface"
			rounded="md"
			override
			className={cn(styles.styledCard, mx.responsiveContent, 'hover-lift')}>
			<Link to={link} enabled={!canEdit} className="profilePackLink">
				<Inset clip="padding-box" side="top" pb="current">
					<PackPhoto
						src={packPhotoUrl}
						packId={packId}
						uploadEnabled={!isPending && canEdit}
						isPending={isPending}
						onUpload={handlePhotoUpload}
					/>
				</Inset>

				<Card.Body className={styles.cardBody}>
					<Stack className="gap-2">
						<Stack className="gap-1">
							<Heading size="4">
								<Link to={link} enabled={canEdit}>
									{packName}
								</Link>
							</Heading>
							<Flex className="items-center gap-1">
								{packPublic ? (
									<>
										<PublicIcon />
										<Text size="2">Public</Text>
									</>
								) : (
									<>
										<PrivateIcon />
										<Text size="2">Private</Text>
									</>
								)}
							</Flex>
						</Stack>
						<Text className={styles.packDescription}>{packDescription}</Text>
						<PackLabels pack={pack} />
					</Stack>
				</Card.Body>

				{canEdit && (
					<Card.Footer className={styles.cardFooter}>
						<Flex className={cn(styles.cardFooterText, 'items-center gap-4')}>
							<Flex className="items-center">
								<ViewsIcon />
								<Text>{formatNumber(packViews)} Views</Text>
							</Flex>
							<Flex className="items-center">
								<BookmarkIcon />
								<Text>{formatNumber(packBookmarkCount || 0)} Saves</Text>
							</Flex>
						</Flex>
					</Card.Footer>
				)}
			</Link>
		</Card.Root>
	);
};
