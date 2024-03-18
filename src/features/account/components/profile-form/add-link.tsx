import { type InputEvent } from '@/types/form-types';
import { Button, TextFieldInput, Separator, Flex, Popover } from '@radix-ui/themes';
import { useState } from 'react';
import { SocialButton, SocialButtonPicker } from './social-button';
import socialMediaUI from '@/styles/theme/social-media-ui';
import { useHandlers } from '../../hooks/use-profile-handlers';
import { PlusIcon } from '@/components/ui';

export const AddLink = () => {
	const { addSocialLink } = useHandlers().handlers;
	const {
		addSocialLink: { isPending },
	} = useHandlers().mutations;

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
		// update social service icon based on URL
		const [socialService] = Object.keys(socialMediaUI).filter((social) =>
			value.includes(social),
		);
		if (socialService === service) return;
		if (socialService && socialService !== service) return setService(socialService);
		if (service !== 'custom') setService('custom');
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
								const { socialName, color, icon } = socialMediaUI[key];
								return (
									<SocialButton
										key={index}
										socialName={socialName}
										color={color}
										icon={icon}
										onClick={handleChangeButton}
									/>
								);
							})}
						</Flex>
					</Popover.Content>
				</Popover.Root>

				<TextFieldInput
					width="50%"
					mx="3"
					size="3"
					placeholder="Paste your link..."
					value={socialLink}
					onChange={handleInput}
				/>
				<Button size="3" disabled={!socialLink || isPending} onClick={handleAddLink}>
					<PlusIcon />
					Add Link
				</Button>
			</Flex>
		</>
	);
};
