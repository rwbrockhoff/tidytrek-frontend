import { Button } from '@/components/alpine';
import { PopoverMenu } from '@/components/ui/popover-menu';
import { TrashIcon, ShareIcon, MinusIcon, PlusIcon, MenuIcon } from '@/components/icons';
import { DeleteModal } from '@/components/ui';
import { useToggle } from '@/hooks/ui/use-toggle';
import tableStyles from '../table-main/table.module.css';

type CategoryActionsMenuProps = {
	isMinimized: boolean;
	onMinimizeCategory: () => void;
	onDeletePackCategory: () => void;
	onDeletePackCategoryAndItems: () => void;
};

export const CategoryActionsMenu = ({
	isMinimized,
	onMinimizeCategory,
	onDeletePackCategory,
	onDeletePackCategoryAndItems,
}: CategoryActionsMenuProps) => {
	const { isToggled: isOpen, toggleClose, toggle } = useToggle();

	const handleMinimizeCategory = () => {
		onMinimizeCategory();
		toggleClose();
	};

	const handleDeletePackCategory = () => {
		onDeletePackCategory();
		toggleClose();
	};

	const handleDeletePackCategoryAndItems = () => {
		onDeletePackCategoryAndItems();
		toggleClose();
	};

	return (
		<PopoverMenu
			trigger={<Button variant="ghost" size="md" iconLeft={<MenuIcon />} />}
			side="bottom"
			size="1"
			sideOffset={2}
			open={isOpen}
			onOpenChange={toggle}>
			<div className="flex flex-col gap-1">
				<Button
					variant="ghost"
					size="sm"
					iconLeft={isMinimized ? <PlusIcon /> : <MinusIcon />}
					override
					className={tableStyles.actionMenuButtons}
					onClick={handleMinimizeCategory}>
					{isMinimized ? 'Expand' : 'Minimize'}
				</Button>
				<DeleteModal
					title="Are you sure?"
					description="You can permanently delete your category or move the items to your gear closet."
					onDelete={handleDeletePackCategoryAndItems}
					secondaryAction={{
						text: 'Move to Gear Closet',
						onClick: handleDeletePackCategory,
						icon: <ShareIcon />,
					}}>
					<Button
						variant="ghost"
						size="sm"
						iconLeft={<TrashIcon />}
						override
						className={tableStyles.actionMenuButtons}>
						Delete
					</Button>
				</DeleteModal>
			</div>
		</PopoverMenu>
	);
};
