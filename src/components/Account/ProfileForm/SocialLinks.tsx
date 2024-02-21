import { SocialButton } from './SocialButton';
import { Icon } from 'semantic-ui-react';
import { Button } from '../../../shared/ui/SemanticUI';
import socialMediaUI from '../../../shared/ui/SocialMediaUI';
import AddLink from './AddLink';
import styled from 'styled-components';
import { SocialLink } from '../../../types/profileSettingsTypes';
import { useState } from 'react';
import { useHandlers } from '../../../views/Account/ProfileSettings/useHandlers';

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

			<CurrentLinksContainer>
				{socialLinks.map((link, index) => {
					const { socialName, color, icon } = socialMediaUI[link.socialLinkName];
					const { socialLinkId: id } = link;
					return (
						<SocialButton
							key={index}
							socialLinkId={id}
							socialName={socialName}
							color={color}
							icon={icon}
							socialLinkUrl={link.socialLinkUrl}
							linkEnabled
							deleteEnabled
							onDelete={() => deleteSocialLink(id)}
						/>
					);
				})}
			</CurrentLinksContainer>

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

const CurrentLinksContainer = styled.div`
	display: flex;
	margin-bottom: 25px;
	&&& {
		div.ui.label {
			margin: 5px 0px;
			margin-right: 10px;
		}
	}
`;
