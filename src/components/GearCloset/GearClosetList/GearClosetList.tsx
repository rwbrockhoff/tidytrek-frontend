import { Icon } from 'semantic-ui-react';
import TidyTable from '../../../shared/ui/TidyTable';
import { Button, Table } from '../../../shared/ui/SemanticUI';
import { type PackListItem, type PackItem, PackInfo } from '../../../types/packTypes';
import { useAddGearClosetItemMutation } from '../../../queries/closetQueries';
import TableRow from '../../Dashboard/PackCategory/TableRow/TableRow';
import GearClosetHeader from '../GearClosetHeader/GearClosetHeader';
import { DropTableBody } from '../../../shared/components/DragDropWrapper';
import { StyledFooter } from '../../Dashboard/PackCategory/TableFooter/TableFooter';
import { PricingContext } from '../../../views/Dashboard/hooks/useViewerContext';
import styled from 'styled-components';
import { mobile } from '../../../shared/mixins/mixins';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: PackItem[] | [];
	dragDisabled: boolean;
	listHasItems: boolean;
	onSave: (packItem: PackItem) => void;
	onDelete: (packItemId: number) => void;
	onMove: (packInfo: PackInfo) => void;
};

const GearClosetList = ({
	gearClosetList,
	packList,
	dragDisabled,
	listHasItems,
	onSave,
	onMove,
	onDelete,
}: GearClosetListProps) => {
	const { mutate: addItem, isPending: isPendingAddItem } = useAddGearClosetItemMutation();

	return (
		<PricingContext.Provider value={true}>
			<StyledTidyTable
				$tableCellWidth="5%"
				$themeColor="primary"
				unstackable
				fixed
				striped
				size="small">
				<GearClosetHeader />

				{listHasItems ? (
					<DropTableBody
						droppableId={`gear-closet`}
						type="closet-item"
						disabled={dragDisabled}>
						{gearClosetList.map((item: PackItem, index) => (
							<TableRow
								item={item}
								packList={packList}
								disabled={dragDisabled}
								key={item.packItemId}
								index={index}
								handleMoveItemToPack={onMove}
								handleOnSave={onSave}
								handleDelete={onDelete}
							/>
						))}
					</DropTableBody>
				) : (
					<NotFoundMessage />
				)}

				<StyledFooter>
					<Table.Row>
						<Table.Cell colSpan="24">
							<Button
								size="mini"
								floated="left"
								compact
								basic
								$footerButton
								disabled={isPendingAddItem}
								onClick={() => addItem()}>
								<Icon name="add" />
								Add Item
							</Button>
						</Table.Cell>
					</Table.Row>
				</StyledFooter>
			</StyledTidyTable>
		</PricingContext.Provider>
	);
};

export default GearClosetList;

const NotFoundMessage = () => {
	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan="24" textAlign="center" style={{ opacity: 0.4 }}>
					<Icon name="search" /> No Items Found.
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};

const StyledTidyTable = styled(TidyTable)`
	&&& {
		${mobile(`
			thead {
				display: none;
			}

			tfoot button {
				font-size: 1.1em;
			}
		`)}
	}
`;
