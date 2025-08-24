import { Avatar } from '@/components/media';
import { AccessibleButton } from '@/components/ui';
import { AvatarMenu } from './avatar-menu';
import { PopoverMenu as PopoverMenuComponent } from '@/components/ui/popover-menu';
import { HoverContext } from '@/contexts/hover-context';
import { useContext, useState, useRef } from 'react';
import styles from './popover-menu.module.css';

type PopoverMenuProps = {
	profilePhotoUrl: string | undefined;
	isMobile: boolean;
	logout: () => void;
};

export const PopoverMenu = (props: PopoverMenuProps) => {
	const { profilePhotoUrl, isMobile, logout } = props;
	const isHovering = useContext(HoverContext);
	const [isKeyboardControlled, setIsKeyboardControlled] = useState(false);
	const buttonRef = useRef<HTMLButtonElement>(null);

	const handleOpenChange = (open: boolean) => {
		if (open) {
			setIsKeyboardControlled(true);
		} else {
			setIsKeyboardControlled(false);
			if (buttonRef.current) {
				buttonRef.current.focus();
			}
		}
	};

	const isOpen = isKeyboardControlled ? undefined : isHovering;

	const renderTrigger = () => (
		<AccessibleButton 
			ref={buttonRef}
			className={styles.avatarButton}
			aria-label="Open user menu">
			<Avatar src={profilePhotoUrl} size={isMobile ? 'md' : 'sm'} />
		</AccessibleButton>
	);

	return (
		<PopoverMenuComponent
			trigger={<div>{renderTrigger()}</div>}
			side="bottom"
			size="1"
			sideOffset={0}
			open={isOpen}
			onOpenChange={handleOpenChange}>
			<AvatarMenu logout={logout} />
		</PopoverMenuComponent>
	);
};
