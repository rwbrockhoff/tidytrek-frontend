import styles from './table-row.module.css';
import { DeletePackItemModal } from '@/features/dashboard/components/modals';
import { ShareIcon, TrashIcon } from '@/components/icons';
import { Flex } from '@/components/layout';
import { Button } from '@/components/alpine';
import { type BaseTableRowItem } from '@/types/pack-types';
import { isPackItem } from '@/types/pack-types';

type TableRowActionsProps = {
  packItem: BaseTableRowItem;
  onToggleGearButtons: () => void;
  onMoveToCloset: () => void;
  onDelete: () => void;
};

export const TableRowActions = ({
  packItem,
  onToggleGearButtons,
  onMoveToCloset,
  onDelete,
}: TableRowActionsProps) => {
  const hasPackId = isPackItem(packItem);

  return (
    <>
      <Flex className="items-center">
        <Button
          onClick={onToggleGearButtons}
          variant="ghost"
          size="md"
          override
          className={styles.tableActionButton}
          data-testid="move-pack-item-button"
          aria-label="Move pack item"
          iconLeft={<ShareIcon />}
        />
      </Flex>

      <DeletePackItemModal
        id={packItem.packItemId}
        itemName={packItem.packItemName}
        hasPackId={hasPackId}
        onClickMove={onMoveToCloset}
        onClickDelete={onDelete}>
        <Flex className="items-center">
          <Button
            variant="ghost"
            size="md"
            override
            className={styles.tableActionButton}
            data-testid="delete-pack-item-button"
            aria-label="Delete pack item"
            iconLeft={<TrashIcon />}
          />
        </Flex>
      </DeletePackItemModal>
    </>
  );
};