import { type SocialLink } from '@/types/profile-types';
import { useState } from 'react';
import styles from './social-links.module.css';
import { PlusIcon } from '@/components/ui';
import { Button } from '@radix-ui/themes';
import { SubText } from '@/components/ui/TidyUI';
import { AddLink } from './add-link';
import { SocialLinkList } from '@/components';

export const SocialLinks = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
	const [showLinks, setShowLinks] = useState(false);

	return (
		<>
			<p className={styles.text}> Profile Links </p>
			<SubText>
				Add links that others can see on your profile. 4 link maximum to keep things tidy.
			</SubText>

			<SocialLinkList socialLinks={socialLinks} deleteEnabled />

			{!showLinks && (
				<Button
					variant="outline"
					color="gray"
					size="3"
					my="4"
					onClick={() => setShowLinks(true)}>
					<PlusIcon />
					Add Link
				</Button>
			)}

			{showLinks && <AddLink />}
		</>
	);
};
