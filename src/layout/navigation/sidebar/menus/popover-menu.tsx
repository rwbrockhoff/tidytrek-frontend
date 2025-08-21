import { Link } from '@/components/ui';
import { Avatar } from '@/components/media';
import { AvatarMenu } from './avatar-menu';
import { PopoverMenu as PopoverMenuComponent } from '@/components/ui/popover-menu';
import { HoverContext } from '@/contexts/hover-context';
import { useContext } from 'react';

type PopoverMenuProps = {
	profilePhotoUrl: string | undefined;
	isMobile: boolean;
	logout: () => void;
};

export const PopoverMenu = (props: PopoverMenuProps) => {
	const { profilePhotoUrl, isMobile, logout } = props;
	const isHovering = useContext(HoverContext);

	return (
		<PopoverMenuComponent
			trigger={
				<div>
					<Link to="/profile" enabled={!isMobile}>
						<Avatar src={profilePhotoUrl} size={isMobile ? 'md' : 'sm'} />
					</Link>
				</div>
			}
			side="bottom"
			size="1"
			sideOffset={0}
			open={isHovering}>
			<AvatarMenu logout={logout} />
		</PopoverMenuComponent>
	);
};
