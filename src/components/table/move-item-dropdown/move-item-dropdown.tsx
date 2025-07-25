import { useState } from 'react';
import styles from './move-item-dropdown.module.css';
import { BaseTableRowItem, type PackListItem } from '@/types/pack-types';
import { usePackDropdown } from './use-pack-dropdown';
import { Button, Flex, Select, Table } from '@radix-ui/themes';
import { MdOutlineMoveDown } from 'react-icons/md';
import { useMoveItemToPackMutation } from '@/queries/closet-queries';

type MoveItemDropdownProps = {
	packItem: BaseTableRowItem;
	availablePacks: PackListItem[];
};

export const MoveItemDropdown = (props: MoveItemDropdownProps) => {
	const { packItem, availablePacks } = props;

	// Hide dropdown if no packs are available
	if (!availablePacks || availablePacks.length === 0) return null;

	const { packItemId, packItemIndex } = packItem;

	const { mutate: moveItemToPack } = useMoveItemToPackMutation();

	const [packId, setPackId] = useState<string | null>();
	const [categoryId, setCategoryId] = useState<string | null>();

	const [currentPack] = availablePacks.filter((item) => item.packId === Number(packId));

	const availableCategories = currentPack?.packCategories || [];

	const { packList, categoryList } = usePackDropdown(availablePacks, availableCategories);

	const handleSelectPack = (value: string) => {
		if (value) {
			setPackId(value);
			setCategoryId(null);
		}
	};

	const handleSelectCategory = (value: string) => {
		if (value) setCategoryId(value);
	};

	const handleMoveItemToPack = () => {
		if (packId && categoryId) {
			moveItemToPack({
				packItemId,
				packId: currentPack.packId,
				packCategoryId: categoryId,
				packItemIndex,
			});
		}
	};

	return (
		<Table.Row className={styles.tableRow}>
			<Table.Cell colSpan={24}>
				<Flex
					justify="end"
					align="center"
					ml="auto"
					direction={{ initial: 'column', sm: 'row' }}>
					<Select.Root onValueChange={handleSelectPack}>
						<Select.Trigger className="dropdown-primary" placeholder="Choose a pack..." />
						<Select.Content style={{ height: 'fit-content' }}>
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

					<Select.Root onValueChange={handleSelectCategory} disabled={!packId}>
						<Select.Trigger
							className="dropdown-secondary"
							placeholder="Choose a category..."
						/>
						<Select.Content style={{ height: 'fit-content' }}>
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
					<Button size="2" disabled={!categoryId} onClick={handleMoveItemToPack}>
						<MdOutlineMoveDown />
						Move Item
					</Button>
				</Flex>
			</Table.Cell>
		</Table.Row>
	);
};
