import Avatar from '../../../../shared/ui/Avatar';
import { Popup, PopupContent } from 'semantic-ui-react';
import styled from 'styled-components';
import { AvatarMenu } from './Menus';
import { CustomLink } from '../../../../shared/ui/CustomLinks';

type PopupMenuProps = {
	profilePhotoUrl: string | undefined;
	isMobile: boolean;
	logout: () => void;
};

const PopupMenu = (props: PopupMenuProps) => {
	const { profilePhotoUrl, isMobile, logout } = props;
	return (
		<Popup
			pinned
			position="bottom left"
			openOnTriggerClick
			openOnTriggerMouseEnter
			hoverable
			hideOnScroll
			eventsEnabled
			trigger={
				<Container>
					<CustomLink link="/profile" enabled={!isMobile}>
						<Avatar src={profilePhotoUrl} size="small" />
					</CustomLink>
				</Container>
			}>
			<PopupContent>
				<AvatarMenu logout={logout} />
			</PopupContent>
		</Popup>
	);
};
export default PopupMenu;

const Container = styled.div`
	width: fit-content;
	margin: 20px 0px;
`;
