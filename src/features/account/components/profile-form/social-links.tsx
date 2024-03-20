import { type SocialLink } from '@/types/profile-types';
import { useState } from 'react';
import styled from 'styled-components';
import { PlusIcon } from '@/components/ui';
import { Button } from '@radix-ui/themes';
import { SubText } from '@/components/ui/TidyUI';
import { AddLink } from './add-link';
import { useHandlers } from '../../hooks/use-profile-handlers';
import { SocialLinkList } from '@/components';

export const SocialLinks = ({ socialLinks }: { socialLinks: SocialLink[] }) => {
	const { deleteSocialLink } = useHandlers().handlers;

	const [showLinks, setShowLinks] = useState(false);

	return (
		<>
			<Text> Profile Links </Text>
			<SubText>
				Add links that others can see on your profile. 4 link maximum to keep things tidy.
			</SubText>

			<SocialLinkList
				socialLinks={socialLinks}
				deleteEnabled
				onDelete={deleteSocialLink}
			/>

			{!showLinks && (
				<Button variant="outline" size="3" my="4" onClick={() => setShowLinks(true)}>
					<PlusIcon />
					Add Link
				</Button>
			)}

			{showLinks && <AddLink />}
		</>
	);
};

const Text = styled.p`
	display: block;
	margin: 0 0 0.28571429rem 0;
	color: rgba(0, 0, 0, 0.87);
	font-size: 0.92857143em;
	font-weight: 700;
	text-transform: none;
	margin-top: 15px;
`;
