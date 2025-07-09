import { type SocialLink } from '@/types/profile-types';
import styles from './social-links.module.css';
import { AddLink } from './add-link';
import { SocialLinkList } from '@/components';

export const SocialLinks = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
	return (
		<>
			<p className={styles.text}> Profile Links </p>
			<p className={styles.textSubtle}>
				Add links that others can see on your profile. 4 link maximum to keep things tidy.
			</p>

			<SocialLinkList socialLinks={socialLinks} deleteEnabled />

			<AddLink />
		</>
	);
};
