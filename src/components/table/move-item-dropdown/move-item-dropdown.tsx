import { useState, type SyntheticEvent } from 'react';
import { Dropdown, Icon, DropdownProps } from 'semantic-ui-react';
import { type PackInfo } from '../../../types/pack-types';
import styled from 'styled-components';
import { Button, TableCell } from '../../ui/SemanticUI';
import { PackItem, type PackListItem } from '../../../types/pack-types';
import { usePackDropdown } from './use-pack-dropdown';

type SelectEvent = SyntheticEvent<HTMLElement, Event>;

type MoveItemDropdownProps = {
	packItem: PackItem;
	availablePacks: PackListItem[];
	moveItemToPack: (packInfo: PackInfo) => void;
};

export const MoveItemDropdown = (props: MoveItemDropdownProps) => {
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
			<TableCell colSpan="15" />
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
			<TableCell colSpan="3" textAlign="left">
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

const TableRow = styled.tr`
	&&&& {
		height: 60px;
		${({ theme: t }) =>
			t.mx.mobile(`
			height: fit-content;
			td {
				padding: 10px 15px;
				border: none;
			}
			td:last-child {
				display: flex;
				justify-content: flex-end;
				padding-right: 15px;
				padding-bottom: 25px;
				button {
					font-size: 1em;
				}
			}
		`)}
	}
`;
