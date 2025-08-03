import styles from './share-settings.module.css';
import {
	CheckIcon,
	PrivateIcon,
	PublicIcon,
	ShareIcon,
	ShareLinkIcon,
} from '@/components/icons';
import { Flex } from '@/components/layout';
import { cn } from '@/styles/utils';
import { Popover, Heading } from '@radix-ui/themes';
import { TextField, Button } from '@/components/alpine';
import { useState } from 'react';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { frontendURL } from '@/api/tidytrek-api';

type ShareSettingsProps = { packPublic: boolean; packId: string | undefined };

export const ShareSettings = ({ packPublic, packId }: ShareSettingsProps) => {
	const { isCreator } = useUserPermissionsContext();
	const packLink = `${frontendURL}/pk/${packId}`;
	const [linkCopied, setLinkCopied] = useState(false);

	const handleCopyToClipboard = () => {
		navigator.clipboard.writeText(packLink);
		setLinkCopied(true);
	};

	const handleReset = () => linkCopied && setLinkCopied(false);

	if (!isCreator) return null;

	if (packPublic) {
		return (
			<Flex className="items-center gap-4">
				<p className={cn(styles.lightText, "flex items-center")}>
					<PublicIcon /> Public
				</p>
				<Popover.Root
					onOpenChange={handleReset}
					// onClose={handleReset}
				>
					<Popover.Trigger>
						<p className={cn(styles.shareText, "flex items-center")}>
							<ShareLinkIcon />
							Share Pack
						</p>
					</Popover.Trigger>
					<Popover.Content side="top" sideOffset={0}>
						<Heading as="h4" size="4" mb="2">
							Share Your Pack
						</Heading>

						<Flex className="gap-2">
							<TextField.Standalone value={packLink} readOnly />

							<Button
								onClick={handleCopyToClipboard}
								iconLeft={linkCopied ? <CheckIcon /> : <ShareIcon />}>
								{linkCopied ? 'Copied' : 'Copy Link'}
							</Button>
						</Flex>
					</Popover.Content>
				</Popover.Root>
			</Flex>
		);
	} else {
		return (
			<p className={cn(styles.lightText, "flex items-center")}>
				<PrivateIcon /> Private
			</p>
		);
	}
};
