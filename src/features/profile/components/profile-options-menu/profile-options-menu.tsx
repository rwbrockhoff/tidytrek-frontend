import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PopoverOptionsMenu } from '@/components/ui/popover-options-menu';
import { Button } from '@/components/alpine';
import { MenuIcon, SettingsIcon, LinkIcon, CheckIcon } from '@/components/icons';
import { frontendURL } from '@/api/tidytrek-api';

type ProfileOptionsMenuProps = {
	username?: string;
};

export const ProfileOptionsMenu = ({ username }: ProfileOptionsMenuProps) => {
	const navigate = useNavigate();
	const [linkCopied, setLinkCopied] = useState(false);

	const handleEditProfile = () => {
		navigate('/account/profile-settings');
	};

	const handleShareProfile = () => {
		const profileUrl = `${frontendURL}/u/${username}`;
		navigator.clipboard.writeText(profileUrl);
		setLinkCopied(true);
	};

	useEffect(() => {
		if (linkCopied) {
			const timer = setTimeout(() => {
				setLinkCopied(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [linkCopied]);

	const menuItems = [
		{
			id: 'edit-profile',
			icon: <SettingsIcon />,
			label: 'Edit Profile',
			onClick: handleEditProfile,
		},
		{
			id: 'copy-link',
			icon: linkCopied ? <CheckIcon /> : <LinkIcon />,
			label: linkCopied ? 'Link Copied' : 'Copy Link',
			onClick: handleShareProfile,
			variant: linkCopied ? ('primary' as const) : undefined,
		},
	];

	return (
		<PopoverOptionsMenu
			trigger={
				<Button
					variant="ghost"
					size="sm"
					iconLeft={<MenuIcon />}
					aria-label="Profile options"
				/>
			}
			items={menuItems}
			side="bottom"
			align="start"
			buttonAlignment="left"
		/>
	);
};
