import { type InputEvent } from '@/types/form-types';
import { Button, Separator, Flex, Popover } from '@radix-ui/themes';
import { TextField } from '@/components/ui/alpine';
import { useState } from 'react';
import { SocialButton, SocialButtonPicker } from './social-button';
import socialMediaUI from '../../constants/social-media-ui';
import { useProfileActions } from '../../hooks/use-profile-actions';
import { mx } from '@/styles/utils';
import { PlusIcon } from '@/components/ui';
import { detectPlatformFromUrl } from '@/utils/social-platform-detector';

export const AddLink = () => {
	const {
		addSocialLink,
		mutations: {
			addSocialLink: { isPending },
		},
	} = useProfileActions();

	const [service, setService] = useState('facebook');
	const [socialLink, setSocialLink] = useState('');

	const handleChangeButton = (socialName: string | undefined) => {
		socialName && setService(socialName);
	};

	const handleAddLink = () => {
		addSocialLink(service, socialLink);
		setService('facebook');
		setSocialLink('');
	};

	const handleUpdateService = (value: string) => {
		const detectedPlatform = detectPlatformFromUrl(value);
		if (detectedPlatform !== service) setService(detectedPlatform);
	};

	const handleInput = (e: InputEvent) => {
		setSocialLink(e.target.value);
		handleUpdateService(e.target.value);
	};

	const currentSocial = socialMediaUI[service];

	return (
		<>
			<Separator size="4" my="6" />
			<Flex align="center">
				<Popover.Root>
					<Popover.Trigger>
						<div>
							<SocialButtonPicker currentSocial={currentSocial} />
						</div>
					</Popover.Trigger>
					<Popover.Content side="top" style={{ width: '60%' }}>
						<Flex wrap="wrap">
							{Object.keys(socialMediaUI).map((key, index) => {
								const { socialName, icon } = socialMediaUI[key];
								return (
									<SocialButton
										key={index}
										socialName={socialName}
										icon={icon}
										onClick={handleChangeButton}
									/>
								);
							})}
						</Flex>
					</Popover.Content>
				</Popover.Root>

				<TextField.Standalone
					className={mx.halfWidth}
					placeholder="Paste your link..."
					value={socialLink}
					onChange={handleInput}
					style={{ margin: '0 var(--space-sm)' }}
				/>
				<Button
					size="3"
					color="gray"
					variant="outline"
					disabled={!socialLink || isPending}
					onClick={handleAddLink}>
					<PlusIcon />
					Add Link
				</Button>
			</Flex>
		</>
	);
};
