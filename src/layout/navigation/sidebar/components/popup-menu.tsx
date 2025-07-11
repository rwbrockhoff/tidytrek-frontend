import { Avatar, Link } from '@/components/ui';
import { AvatarMenu } from './menus';
import { Popover } from '@radix-ui/themes';
import { HoverContext } from '@/contexts/hover-context';
import { useContext } from 'react';

type PopupMenuProps = {
	profilePhotoUrl: string | undefined;
	isMobile: boolean;
	logout: () => void;
};

export const PopupMenu = (props: PopupMenuProps) => {
	const { profilePhotoUrl, isMobile, logout } = props;
	const isHovering = useContext(HoverContext);

	return (
		<Popover.Root open={isHovering}>
			<Popover.Trigger>
				<div>
					<Link to="/profile" enabled={!isMobile}>
						<Avatar src={profilePhotoUrl} size="small" />
					</Link>
				</div>
			</Popover.Trigger>

			<Popover.Content side="bottom" size={'1'} sideOffset={0}>
				<AvatarMenu logout={logout} />
			</Popover.Content>
		</Popover.Root>
	);
};
