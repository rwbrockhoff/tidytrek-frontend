import styled from 'styled-components';
import { SocialButton } from './SocialButton';
import { SocialLink } from '../../../types/profileTypes';
import socialMediaUI from '../../../shared/ui/SocialMediaUI';

type SocialLinkListProps = {
	socialLinks: SocialLink[];
	deleteEnabled: boolean;
	colorButton?: boolean;
	onDelete?: (socialLinkId: number | undefined) => void | undefined;
};
const SocialLinkList = (props: SocialLinkListProps) => {
	const { socialLinks, deleteEnabled, colorButton, onDelete } = props;

	return (
		<CurrentLinksContainer>
			{socialLinks.map((link, index) => {
				const { socialName, color, icon } = socialMediaUI[link.socialLinkName];
				const { socialLinkId: id } = link;
				return (
					<SocialButton
						key={index}
						socialLinkId={id}
						socialName={socialName}
						colorButton={colorButton}
						color={color}
						icon={icon}
						socialLinkUrl={link.socialLinkUrl}
						deleteEnabled={deleteEnabled}
						onDelete={onDelete}
					/>
				);
			})}
		</CurrentLinksContainer>
	);
};

export default SocialLinkList;

const CurrentLinksContainer = styled.div`
	display: flex;
	&&& {
		div.ui.label {
			margin: 5px 0px;
			margin-right: 10px;
		}
	}
`;
