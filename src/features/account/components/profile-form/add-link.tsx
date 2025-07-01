import { type InputEvent } from '@/types/form-types';
import { Button, Separator, Flex } from '@radix-ui/themes';
import { TextField } from '@/components/ui/alpine';
import { useState } from 'react';
import { SocialButtonPicker } from './social-button';
import socialMediaUI from '../../constants/social-media-ui';
import { useProfileActions } from '../../hooks/use-profile-actions';
import { PlusIcon } from '@/components/ui';
import { detectPlatformFromUrl } from '@/utils/social-platform-detector';

export const AddLink = () => {
	const {
		addSocialLink,
		mutations: {
			addSocialLink: { isPending },
		},
	} = useProfileActions();

	const [service, setService] = useState('custom');
	const [socialLink, setSocialLink] = useState('');

	const handleAddLink = () => {
		addSocialLink(service, socialLink);
		setService('custom');
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
			<Flex align="center" gap="2">
				<SocialButtonPicker currentSocial={currentSocial} />
				<TextField.Standalone
					placeholder="Paste your link..."
					value={socialLink}
					onChange={handleInput}
					width={'30%'}
				/>
				<Button
					size="2"
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
