import { type SavedPack } from '@/types/saved-packs-types';
import { Heading, Inset, Text } from '@radix-ui/themes';
import { Flex, Stack } from '@/components/layout';
import { Button, Card } from '@/components/alpine';
import { Link } from '@/components/ui';
import { Avatar } from '@/components/media';
import { BookmarkIcon } from '@/components/icons';
import { SavedPackImage } from '../saved-pack-image/saved-pack-image';
import styles from './saved-pack-card.module.css';
import { cn, mx } from '@/styles/utils';
import { encode } from '@/utils';

type SavedPackCardProps = {
	savedPack: SavedPack;
	onRemoveBookmark: (packId: number) => void;
	isPending: boolean;
};

export const SavedPackCard = ({
	savedPack,
	onRemoveBookmark,
	isPending,
}: SavedPackCardProps) => {
	const { packId, packName, packDescription, packPhotoUrl, username, profilePhotoUrl } =
		savedPack;
	const encodedPackId = encode(packId);
	const link = `/pk/${encodedPackId}`;

	const handleRemoveBookmark = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		onRemoveBookmark(packId);
	};

	return (
		<Card.Root
			variant="surface"
			rounded="md"
			override
			className={cn(styles.styledCard, mx.responsiveContent, 'hover-lift')}>
			<Link to={link} className="savedPackLink">
				<Inset
					clip="padding-box"
					side="top"
					pb="current"
					className={styles.imageContainer}>
					<SavedPackImage src={packPhotoUrl} packName={packName} />
				</Inset>

				<Card.Body className={styles.cardBody}>
					<Stack className={cn(styles.contentStack, 'gap-4')}>
						<Flex className="items-start justify-between">
							<Stack className="gap-1 flex-1">
								<Heading size="4">{packName}</Heading>
								{packDescription && (
									<Text className={styles.packDescription}>{packDescription}</Text>
								)}
							</Stack>
							<Button
								onClick={handleRemoveBookmark}
								disabled={isPending}
								variant="ghost"
								color="tertiary"
								size="lg"
								iconLeft={<BookmarkIcon />}
								override
								className={styles.bookmarkButton}
							/>
						</Flex>
						<Flex className="items-center gap-2">
							<Avatar
								src={profilePhotoUrl || undefined}
								size="xs"
								withBorder={false}
								uploadEnabled={false}
							/>
							<Text size="2" className={styles.username}>
								{username}
							</Text>
						</Flex>
					</Stack>
				</Card.Body>
			</Link>
		</Card.Root>
	);
};
