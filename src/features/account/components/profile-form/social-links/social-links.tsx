import { type SocialLink } from '@/types/profile-types';
import { useState } from 'react';
import styles from './social-links.module.css';
import { PlusIcon } from '@/components/ui';
import { Button } from '@radix-ui/themes';
import { AddLink } from '../components/add-link';
import { SocialLinkList } from '@/components';

export const SocialLinks = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
	const [showAddLinkForm, setShowAddLinkForm] = useState(false);

	return (
		<>
			<p className={styles.text}> Profile Links </p>
			<p className={styles.textSubtle}>
				Add links that others can see on your profile. 4 link maximum to keep things tidy.
			</p>

			<SocialLinkList socialLinks={socialLinks} deleteEnabled />

			{/* Toggle button to show add link form. Keeps UI tidy when user isn't adding links. */}
			{!showAddLinkForm && (
				<Button
					variant="outline"
					color="gray"
					size="2"
					my="4"
					onClick={() => setShowAddLinkForm(true)}>
					<PlusIcon />
					Add Link
				</Button>
			)}

			{showAddLinkForm && <AddLink />}
		</>
	);
};
