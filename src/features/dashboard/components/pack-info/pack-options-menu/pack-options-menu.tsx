import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PopoverOptionsMenu } from '@/components/ui/popover-options-menu';
import { Button } from '@/components/alpine';
import { MenuIcon, EditPencilIcon, LinkIcon, CheckIcon } from '@/components/icons';
import { PackModal } from '../../pack-modal/pack-modal';
import type { Pack } from '@/types/pack-types';
import { frontendURL } from '@/api/tidytrek-api';
import { encode } from '@/utils';
import { useScreen } from '@/hooks/ui/use-screen';

type PackOptionsMenuProps = {
	pack: Pack;
	packId: string | undefined;
};

export const PackOptionsMenu = ({ pack, packId }: PackOptionsMenuProps) => {
	const [linkCopied, setLinkCopied] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const navigate = useNavigate();
	const { isMobile } = useScreen();

	const handleCopyLink = () => {
		const packUrl = `${frontendURL}/pk/${packId}`;
		navigator.clipboard.writeText(packUrl);
		setLinkCopied(true);
	};

	const handleEditPack = () => {
		if (isMobile) {
			const encodedPackId = encode(pack.packId);
			navigate(`/pack/edit/${encodedPackId}`);
		}
	};

	useEffect(() => {
		if (linkCopied) {
			const timer = setTimeout(() => {
				setLinkCopied(false);
			}, 2000);
			return () => clearTimeout(timer);
		}
	}, [linkCopied]);

	const editPackItem = isMobile
		? {
				icon: <EditPencilIcon />,
				label: 'Edit Pack',
				onClick: handleEditPack,
			}
		: {
				icon: <EditPencilIcon />,
				label: 'Edit Pack',
				wrapper: (children: React.ReactNode) => (
					<PackModal pack={pack} onClose={() => setIsOpen(false)}>
						{children}
					</PackModal>
				),
			};

	const copyLinkItem = {
		icon: linkCopied ? <CheckIcon /> : <LinkIcon />,
		label: linkCopied ? 'Link Copied' : 'Copy Link',
		onClick: handleCopyLink,
		variant: linkCopied ? ('primary' as const) : undefined,
	};

	const menuItems = [editPackItem, ...(pack.packPublic ? [copyLinkItem] : [])];

	return (
		<PopoverOptionsMenu
			trigger={
				<Button
					variant="ghost"
					size="sm"
					iconLeft={<MenuIcon />}
					aria-label="Pack options"
				/>
			}
			items={menuItems}
			side="bottom"
			align="start"
			open={isOpen}
			onOpenChange={setIsOpen}
		/>
	);
};
