import { type Pack } from '@/types/pack-types';
import { Card, Flex, Heading, Inset, Separator, Text } from '@radix-ui/themes';
import { ViewsIcon, Link } from '@/components/ui';
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
		<Card m="2" className={cn(styles.styledCard, mx.responsiveContent)}>
			<Link link={link} enabled={!userView} className="profilePackLink">
				<Inset clip="padding-box" side="top" pb="current">
					<PackPhoto
						src={packPhotoUrl}
						packId={packId}
						uploadEnabled={!isPending && userView}
						isPending={isPending}
						onUpload={handlePhotoUpload}
					/>
				</Inset>

				<Flex direction="column" mb="6">
					<Heading size="4">
						<Link link={link} enabled={userView}>
							{packName}
						</Link>
					</Heading>
					<Text size="2" my="1">
						{packPublic ? 'Public' : 'Private'}
					</Text>
					<Text my="2">{packDescription}</Text>
					<PackLabels pack={pack} />
				</Flex>

				{userView && (
					<Flex direction="column" className={styles.cardFooter}>
						<Separator size="4" mt="4" />

						<Flex align="center" mt="2" className={styles.cardFooterText}>
							<ViewsIcon />
							<Text>{packViews} Views</Text>
						</Flex>
					</Flex>
				)}
			</Link>
		</Card>
	);
};
