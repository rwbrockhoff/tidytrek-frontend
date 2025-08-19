import { useState } from 'react';
import { BaseTableRowItem, type PackListItem } from '@/types/pack-types';
import { usePackDropdown } from './use-pack-dropdown';
import { Stack, Flex } from '@/components/layout';
import { Select, Dialog } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { cn } from '@/styles/utils';
import { MoveIcon, ClosetIcon } from '@/components/icons';
import { useMoveItemToPackMutation } from '@/queries/closet-queries';
import styles from './move-item-modal.module.css';

type MoveItemModalProps = {
	packItem: BaseTableRowItem;
	availablePacks: PackListItem[];
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onMoveToCloset?: () => void;
};

export const MoveItemModal = (props: MoveItemModalProps) => {
	const { packItem, availablePacks, open, onOpenChange, onMoveToCloset } = props;

	const { packItemId, packItemIndex, packItemName } = packItem;

	const { mutate: moveItemToPack } = useMoveItemToPackMutation();

	const [packId, setPackId] = useState<string>('');
	const [categoryId, setCategoryId] = useState<string>('');

	const [currentPack] = availablePacks.filter((item) => item.packId === Number(packId));

	const availableCategories = currentPack?.packCategories || [];

	const { packList, categoryList } = usePackDropdown(availablePacks, availableCategories);

	// Hide modal if no packs are available
	if (!availablePacks || availablePacks.length === 0) return null;

	const handleSelectPack = (value: string) => {
		setPackId(value);
		setCategoryId('');
	};

	const handleSelectCategory = (value: string) => {
		setCategoryId(value);
	};

	const handleMoveItemToPack = () => {
		if (packId && categoryId) {
			moveItemToPack({
				packItemId,
				packId: currentPack.packId,
				packCategoryId: categoryId,
				packItemIndex,
			});
			setPackId('');
			setCategoryId('');
			onOpenChange(false);
		}
	};

	const handleClose = () => {
		setPackId('');
		setCategoryId('');
		onOpenChange(false);
	};

	const handleMoveToCloset = () => {
		if (onMoveToCloset) {
			onMoveToCloset();
			onOpenChange(false);
		}
	};

	return (
		<Dialog.Root open={open} onOpenChange={onOpenChange}>
			<Dialog.Content style={{ maxWidth: 450 }}>
				<Dialog.Title>Move {packItemName}</Dialog.Title>
				<Dialog.Description>
					Select a pack and category to move this item.
				</Dialog.Description>

				<Stack className={cn('gap-3 mt-4', styles.moveItemSelect)}>
					<Select.Root onValueChange={handleSelectPack} value={packId}>
						<Select.Trigger className="dropdown-primary" placeholder="Choose a pack..." />
						<Select.Content>
							<Select.Group>
								<Select.Label>Packs</Select.Label>
								{packList.map((packItem, index) => (
									<Select.Item value={`${packItem.value}`} key={packItem.key || index}>
										{packItem.text}
									</Select.Item>
								))}
							</Select.Group>
						</Select.Content>
					</Select.Root>

					<Select.Root
						onValueChange={handleSelectCategory}
						value={categoryId}
						disabled={!packId}>
						<Select.Trigger
							className="dropdown-secondary"
							placeholder="Choose a category..."
						/>
						<Select.Content>
							<Select.Group>
								<Select.Label>Categories</Select.Label>
								{categoryList.map((category, index) => (
									<Select.Item value={`${category.value}`} key={category.key || index}>
										{category.text || 'Default Category'}
									</Select.Item>
								))}
							</Select.Group>
						</Select.Content>
					</Select.Root>
				</Stack>

				<Flex className="gap-3 mt-6 justify-end">
					<Dialog.Close>
						<Button variant="secondary" onClick={handleClose}>
							Cancel
						</Button>
					</Dialog.Close>
					{onMoveToCloset && (
						<Button
							variant="outline"
							onClick={handleMoveToCloset}
							iconLeft={<ClosetIcon />}>
							Move to Closet
						</Button>
					)}
					<Button
						disabled={!categoryId}
						onClick={handleMoveItemToPack}
						iconLeft={<MoveIcon />}>
						Move Item
					</Button>
				</Flex>
			</Dialog.Content>
		</Dialog.Root>
	);
};
