import { type SocialLink } from '@/types/profile-types';
import { Icon } from 'semantic-ui-react';
import { useState } from 'react';
import styled from 'styled-components';
import { Button } from '@/components/ui/SemanticUI';
import { SubText } from '@/components/ui/TidyUI';
import { AddLink } from './add-link';
import { useHandlers } from '../../hooks/use-profile-handlers';
import { SocialLinkList } from './social-link-list';

type SocialLinksProps = {
	socialLinks: SocialLink[];
};

export const SocialLinks = (props: SocialLinksProps) => {
	const { socialLinks } = props;
	const { deleteSocialLink } = useHandlers().handlers;

	const [showLinks, setShowLinks] = useState(false);

	return (
		<>
			<Text style={{ marginTop: 25 }}> Profile Links </Text>
			<SubText>
				Add links that others can see on your profile. 4 link maximum to keep things tidy.
			</SubText>

			<SocialLinkList
				socialLinks={socialLinks}
				deleteEnabled
				onDelete={deleteSocialLink}
			/>

			{!showLinks && (
				<Button
					basic
					$themeColor="primary"
					style={{ margin: '10px 0px' }}
					onClick={() => setShowLinks(true)}>
					<Icon name="add" />
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
