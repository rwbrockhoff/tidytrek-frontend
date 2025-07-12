import { type InputEvent } from '@/types/form-types';
import { Flex } from '@radix-ui/themes';
import { Button } from '@/components/ui/alpine';
import { TextField } from '@/components/ui/alpine';
import { useState } from 'react';
import { PlusIcon } from '@/components/ui';
import { useAddSocialLinkMutation } from '@/queries/profile-settings-queries';
import { normalizeURL } from '@/utils';

export const AddLink = () => {
	const { mutate: addSocialLink, isPending } = useAddSocialLinkMutation();

	const [socialLink, setSocialLink] = useState('');
	const [linkError, setLinkError] = useState(false);

	const handleAddLink = () => {
		const cleanURL = normalizeURL(socialLink);
		addSocialLink(cleanURL, {
			onSuccess: () => setSocialLink(''),
			onError: () => setLinkError(true),
		});
	};

	const handleInput = (e: InputEvent) => {
		setSocialLink(e.target.value);
	};

	return (
		<Flex direction="column">
			<Flex align="center" gap="2" my="6">
				<TextField.Standalone
					placeholder="Paste your link..."
					value={socialLink}
					onChange={handleInput}
					width={'30%'}
				/>
				<Button disabled={!socialLink || isPending} onClick={handleAddLink}>
					<PlusIcon />
					Add Link
				</Button>
			</Flex>
			{linkError && <p>There was an error adding your link at this time.</p>}
		</Flex>
	);
};
