import Avatar from '../../shared/ui/Avatar';

type PopupMenuProps = {
	profilePhotoUrl: string | undefined;
};

const PopupMenu = (props: PopupMenuProps) => {
	const { profilePhotoUrl } = props;
	return <Avatar src={profilePhotoUrl} size="small" />;
};
export default PopupMenu;
