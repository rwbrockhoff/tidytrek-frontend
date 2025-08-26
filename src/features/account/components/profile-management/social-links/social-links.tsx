import { type SocialLink } from '@/types/profile-types';
import { Segment, SegmentHeader } from '@/components/primitives';
import { AddLink } from './add-link';
import { SocialLinkList } from '@/components';
import { Stack } from '@/components/layout';

export const SocialLinks = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
	return (
		<Segment>
			<Stack>
				<SegmentHeader
					title="Profile Links"
					description="Add links that others can see on your profile. 4 link maximum to keep things tidy."
				/>

				<SocialLinkList socialLinks={socialLinks} deleteEnabled />

				<AddLink socialLinksCount={socialLinks.length} />
			</Stack>
		</Segment>
	);
};
