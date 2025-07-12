import { Link } from '@/components/ui';
import { Avatar } from '@/components/media';
import { AvatarMenu } from './avatar-menu';
import { Popover } from '@radix-ui/themes';
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
		<Popover.Root open={isHovering}>
			<Popover.Trigger>
				<div>
					<Link to="/profile" enabled={!isMobile}>
						<Avatar src={profilePhotoUrl} size={isMobile ? 'medium' : 'small'} />
					</Link>
				</div>
			</Popover.Trigger>

			<Popover.Content side="bottom" size={'1'} sideOffset={0}>
				<AvatarMenu logout={logout} />
			</Popover.Content>
		</Popover.Root>
	);
};
