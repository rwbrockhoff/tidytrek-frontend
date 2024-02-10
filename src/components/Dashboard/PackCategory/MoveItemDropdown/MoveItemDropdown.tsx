import { Dropdown, Table, Button, Icon, DropdownProps } from 'semantic-ui-react';
import { PackItem, type PackListItem } from '../../../../types/packTypes';
import { type PackInfo } from '../../../../types/packTypes';
import { useState } from 'react';
import { SyntheticEvent } from 'react';

type MoveItemDropdownProps = {
	packItem: PackItem;
	availablePacks: PackListItem[];
	moveItemToPack: (packInfo: PackInfo) => void;
};

const MoveItemDropdown = (props: MoveItemDropdownProps) => {
	const { packItem, availablePacks, moveItemToPack } = props;
	const { packItemId, packItemIndex } = packItem;
	const [packId, setPackId] = useState<number | null>();
	const [categoryId, setCategoryId] = useState<number | null>();

	const packList = availablePacks.map((item) => ({
		key: item.packId,
		value: item.packId,
		text: item.packName,
	}));

	const [currentPack] = availablePacks.filter((item) => item.packId === packId);

	const availableCategories = currentPack?.packCategories || [];

	const categoryList = availableCategories[0]
		? availableCategories.map((item) => ({
				key: item?.packCategoryId,
				value: item?.packCategoryId,
				text: item?.packCategoryName,
			}))
		: [];

	const handleSelectPack = (
		_event: SyntheticEvent<HTMLElement, Event>,
		data: DropdownProps,
	) => {
		if (data.value && typeof data.value === 'number') {
			setPackId(data.value);
			setCategoryId(null);
		}
	};

	const handleCategorySelect = (
		_event: SyntheticEvent<HTMLElement, Event>,
		data: DropdownProps,
	) => {
		if (data.value && typeof data.value === 'number') setCategoryId(data.value);
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

	const packSelected = packId ? true : false;
	const packAndCategorySelected = packId && categoryId ? true : false;

	return (
		<tr style={{ paddingTop: '25px !important' }}>
			<Table.Cell colSpan="8" />
			<Table.Cell colSpan="3" collapsing>
				<Dropdown
					selection
					placeholder="Choose pack..."
					search
					fluid
					labeled
					value={packId || undefined}
					options={packList}
					onChange={handleSelectPack}
				/>
			</Table.Cell>
			<Table.Cell colSpan="3" collapsing>
				<Dropdown
					selection
					placeholder="Choose Category..."
					search
					fluid
					labeled
					disabled={!packSelected}
					value={categoryId || undefined}
					options={categoryList}
					onChange={handleCategorySelect}
				/>
			</Table.Cell>
			<Table.Cell colSpan="2" textAlign="left">
				<Button
					size="small"
					disabled={!packAndCategorySelected}
					color={packAndCategorySelected ? 'blue' : 'grey'}
					onClick={handleMoveItemToPack}>
					<Icon name="share" />
					Move
				</Button>
			</Table.Cell>
		</tr>
	);
};

export default MoveItemDropdown;
