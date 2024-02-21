import Avatar from '../../../../shared/ui/Avatar';
import { Popup, PopupContent } from 'semantic-ui-react';
import styled from 'styled-components';
import { AvatarMenu } from './Menus';

type PopupMenuProps = {
	profilePhotoUrl: string | undefined;
	logout: () => void;
};

const PopupMenu = (props: PopupMenuProps) => {
	const { profilePhotoUrl, logout } = props;
	return (
		<Popup
			pinned
			position="bottom left"
			openOnTriggerClick
			openOnTriggerMouseEnter
			hoverable
			trigger={
				<Container>
					<Avatar src={profilePhotoUrl} size="small" margin="0px" />
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
