import styled from 'styled-components';
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
				<LightText>
					<PublicIcon /> Public
				</LightText>
				<Popover.Root
					onOpenChange={handleReset}
					// onClose={handleReset}
				>
					<Popover.Trigger>
						<ShareText>
							<ShareLinkIcon />
							Share Pack
						</ShareText>
					</Popover.Trigger>
					<Popover.Content side="top" sideOffset={0}>
						<Heading as="h4" size="4" mb="2">
							Share Your Pack
						</Heading>

						<Flex>
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
			<LightText>
				<PrivateIcon /> Private
			</LightText>
		);
	}
};

const LightText = styled.p`
	color: var(--gray-9);
	display: flex;
	align-items: center;
	svg {
		margin-right: 0.5em;
	}
`;

const ShareText = styled(LightText)`
	margin-left: 1em;
	cursor: pointer;
	&:hover {
		${({ theme: t }) => t.mx.themeColor('primary')}
	}
`;
