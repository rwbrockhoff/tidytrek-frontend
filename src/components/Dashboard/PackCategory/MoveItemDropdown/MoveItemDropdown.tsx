import { Dropdown, Icon, DropdownProps } from 'semantic-ui-react';
import { Button, TableCell } from '../../../../shared/ui/SemanticUI';
import { PackItem, type PackListItem } from '../../../../types/packTypes';
import { type PackInfo } from '../../../../types/packTypes';
import { useState } from 'react';
import usePackDropdown from './usePackDropdown';
import { SyntheticEvent } from 'react';
import styled from 'styled-components';

type SelectEvent = SyntheticEvent<HTMLElement, Event>;

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

	const [currentPack] = availablePacks.filter((item) => item.packId === packId);

	const availableCategories = currentPack?.packCategories || [];

	const { packList, categoryList } = usePackDropdown(availablePacks, availableCategories);

	const handleSelectPack = (_event: SelectEvent, data: DropdownProps) => {
		if (data.value && typeof data.value === 'number') {
			setPackId(data.value);
			setCategoryId(null);
		}
	};

	const handleSelectCategory = (_event: SelectEvent, data: DropdownProps) => {
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
		<TableRow>
			<TableCell colSpan="8" />
			<TableCell colSpan="3" collapsing $overflow={true}>
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
			</TableCell>
			<TableCell colSpan="3" collapsing $overflow={true}>
				<Dropdown
					selection
					placeholder="Choose Category..."
					search
					fluid
					labeled
					disabled={!packSelected}
					value={categoryId || undefined}
					options={categoryList}
					onChange={handleSelectCategory}
				/>
			</TableCell>
			<TableCell colSpan="2" textAlign="left">
				<Button
					$themeColor="primary"
					size="small"
					disabled={!packAndCategorySelected}
					onClick={handleMoveItemToPack}>
					<Icon name="share" />
					Move
				</Button>
			</TableCell>
		</TableRow>
	);
};

export default MoveItemDropdown;

const TableRow = styled.tr`
	&&&& {
		height: 60px;
	}
`;
