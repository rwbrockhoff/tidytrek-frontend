import styles from './share-settings.module.css';
import {
	CheckIcon,
	PrivateIcon,
	PublicIcon,
	ShareIcon,
	ShareLinkIcon,
} from '@/components/ui';
import { Popover, Heading, Flex, TextFieldInput, Button } from '@radix-ui/themes';
import { useState } from 'react';
import { useUserContext } from '@/hooks/use-viewer-context';
import { frontendURL } from '@/api/tidytrekAPI';

type ShareSettingsProps = { packPublic: boolean; packId: string | undefined };

export const ShareSettings = ({ packPublic, packId }: ShareSettingsProps) => {
	const userView = useUserContext();
	const packLink = `${frontendURL}/pk/${packId}`;
	const [linkCopied, setLinkCopied] = useState(false);

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(packLink);
		setLinkCopied(true);
	};

	const handleReset = () => linkCopied && setLinkCopied(false);

	if (!userView) return null;

	if (packPublic) {
		return (
			<Flex align="start">
				<p className={styles.lightText}>
					<PublicIcon /> Public
				</p>
				<Popover.Root
					onOpenChange={handleReset}
					// onClose={handleReset}
				>
					<Popover.Trigger>
						<p className={styles.shareText}>
							<ShareLinkIcon />
							Share Pack
						</p>
					</Popover.Trigger>
					<Popover.Content side="top" sideOffset={0}>
						<Heading as="h4" size="4" mb="2">
							Share Your Pack
						</Heading>

						<Flex gap="2">
							<TextFieldInput value={packLink} readOnly />

							<Button onClick={handleCopyToClipboard}>
								{linkCopied ? (
									<>
										<CheckIcon />
										Copied
									</>
								) : (
									<>
										<ShareIcon />
										Copy Link
									</>
								)}
							</Button>
						</Flex>
					</Popover.Content>
				</Popover.Root>
			</Flex>
		);
	} else {
		return (
			<p className={styles.lightText}>
				<PrivateIcon /> Private
			</p>
		);
	}
};

