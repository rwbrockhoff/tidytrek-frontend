import { Icon } from 'semantic-ui-react';
import { Button } from '../../../shared/ui/SemanticUI';
import AddLink from './AddLink';
import styled from 'styled-components';
import { SocialLink } from '../../../types/profileTypes';
import { useState } from 'react';
import { useHandlers } from '../../../views/Account/ProfileSettings/useProfileHandlers';
import SocialLinkList from './SocialLinkList';

type SocialLinksProps = {
	socialLinks: SocialLink[];
};

const SocialLinks = (props: SocialLinksProps) => {
	const { socialLinks } = props;
	const { deleteSocialLink } = useHandlers().handlers;

	const [showLinks, setShowLinks] = useState(false);

	return (
		<>
			<Text style={{ marginTop: 25 }}> Profile Links </Text>
			<p style={{ opacity: 0.5 }}>
				Add links that others can see on your profile. 4 link maximum to keep things tidy.
			</p>

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

export default SocialLinks;

const Text = styled.p`
	display: block;
	margin: 0 0 0.28571429rem 0;
	color: rgba(0, 0, 0, 0.87);
	font-size: 0.92857143em;
	font-weight: 700;
	text-transform: none;
	margin-top: 15px;
`;
