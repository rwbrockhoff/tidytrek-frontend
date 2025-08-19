import { Button } from '@/components/alpine';
import { PopoverMenu } from '@/components/ui/popover-menu';
import { TrashIcon, MoveIcon, MenuIcon } from '@/components/icons';
import { DeletePackItemModal } from '@/features/dashboard/components/modals';
import { type BaseTableRowItem } from '@/types/pack-types';
import { isPackItem } from '@/types/pack-types';
import tableStyles from '../table-main/table.module.css';

type RowActionsMenuProps = {
	packItem: BaseTableRowItem;
	onMove: () => void;
	onMoveToCloset: () => void;
	onDelete: () => void;
};

export const RowActionsMenu = ({
	packItem,
	onMove,
	onMoveToCloset,
	onDelete,
}: RowActionsMenuProps) => {
	const hasPackId = isPackItem(packItem);

	return (
		<PopoverMenu
			trigger={<Button variant="ghost" size="md" iconLeft={<MenuIcon />} />}
			side="right"
			size="1"
			sideOffset={0}>
			<div className="flex flex-col gap-1">
				<Button
					variant="ghost"
					size="sm"
					override
					className={tableStyles.actionMenuButtons}
					iconLeft={<MoveIcon />}
					onClick={onMove}>
					Move
				</Button>
				<DeletePackItemModal
					id={packItem.packItemId}
					hasPackId={hasPackId}
					onClickMove={onMoveToCloset}
					onClickDelete={onDelete}>
					<Button
						variant="ghost"
						size="sm"
						override
						className={tableStyles.actionMenuButtons}
						iconLeft={<TrashIcon />}>
						Delete
					</Button>
				</DeletePackItemModal>
			</div>
		</PopoverMenu>
	);
};
