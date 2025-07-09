import { type InputEvent } from '@/types/form-types';
import { Button, Flex } from '@radix-ui/themes';
import { TextField } from '@/components/ui/alpine';
import { useState } from 'react';
import { SocialButtonPicker } from './social-button/social-button';
import socialMediaUI from '../../../constants/social-media-ui';
import { useProfileActions } from '../../../hooks/use-profile-actions';
import { PlusIcon } from '@/components/ui';
import { detectPlatformFromUrl } from '@/utils/social-platform-detector';

export const AddLink = () => {
	const DEFAULTS = {
		socialLink: '',
		socialService: 'custom',
	};

	const {
		addSocialLink,
		mutations: {
			addSocialLink: { isPending },
		},
	} = useProfileActions();

	const [service, setService] = useState(DEFAULTS.socialService);
	const [socialLink, setSocialLink] = useState('');

	const handleAddLink = () => {
		addSocialLink(service, socialLink);
		setService(DEFAULTS.socialService);
		setSocialLink(DEFAULTS.socialLink);
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
		<Flex align="center" gap="2" my="6">
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
	);
};
