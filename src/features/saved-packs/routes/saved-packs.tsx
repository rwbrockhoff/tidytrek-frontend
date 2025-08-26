import { BookmarkIcon } from '@/components/icons';
import { Flex, Stack } from '@/components/layout';
import { Heading } from '@radix-ui/themes';
import { PageLayout } from '@/layout/layouts/page-layout/page-layout';
import { SavedPacksContent } from '../components/saved-packs-content/saved-packs-content';
import styles from './saved-packs.module.css';

export const SavedPacks = () => {
	return (
		<PageLayout>
			<Stack className="gap-4">
				<Heading size="6">
					<Flex className="items-center justify-center gap-2">
						<BookmarkIcon />
						Saved Packs
					</Flex>
				</Heading>

				<p className={styles.descriptionText}>
					Your saved packs for reference & inspiration.
				</p>

				<SavedPacksContent />
			</Stack>
		</PageLayout>
	);
};
