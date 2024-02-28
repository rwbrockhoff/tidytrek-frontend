import { Icon } from 'semantic-ui-react';
import { Table, Button } from '../../../shared/ui/SemanticUI';
import { type PackListItem, type PackItem, PackInfo } from '../../../types/packTypes';
import { useAddGearClosetItemMutation } from '../../../queries/closetQueries';
import TableRow from '../../Dashboard/PackCategory/TableRow/TableRow';
import { DropTableBody } from '../../../shared/DragDropWrapper';
import { StyledFooter } from '../../Dashboard/PackCategory/TableFooter/TableFooter';
import styled from 'styled-components';
import {
	HeaderCell,
	TableText,
} from '../../Dashboard/PackCategory/TableHeader/TableHeader';
import { PricingContext } from '../../../views/Dashboard/hooks/useViewerContext';

export type GearClosetListProps = {
	packList: PackListItem[] | [];
	gearClosetList: PackItem[] | [];
	dragDisabled: boolean;
	isEmptyList: boolean;
	onSave: (packItem: PackItem) => void;
	onDelete: (packItemId: number) => void;
	onMove: (packInfo: PackInfo) => void;
};

const GearClosetList = ({
	gearClosetList,
	packList,
	dragDisabled,
	isEmptyList,
	onSave,
	onMove,
	onDelete,
}: GearClosetListProps) => {
	const { mutate: addItem, isPending: isPendingAddItem } = useAddGearClosetItemMutation();

	return (
		<PricingContext.Provider value={true}>
			<StyledTable $themeColor="primary" fixed striped size="small">
				<Table.Header>
					<Table.Row>
						<HeaderCell colSpan="5" $paddingLeft="25px">
							Item
						</HeaderCell>

						<HeaderCell colSpan="5" $paddingLeft="25px">
							Description
						</HeaderCell>

						<Table.HeaderCell colSpan="4" />
						<HeaderCell textAlign="left" colSpan="2" $paddingLeft="15px">
							Qty
						</HeaderCell>

						<HeaderCell textAlign="center" colSpan="3">
							<TableText $width="100px" $paddingRight="13px">
								Weight
							</TableText>
						</HeaderCell>

						<HeaderCell textAlign="left" colSpan="3" $paddingLeft="25px">
							<TableText $width="75px" $paddingLeft="13px">
								Price
							</TableText>
						</HeaderCell>

						<Table.HeaderCell colSpan="2"></Table.HeaderCell>
					</Table.Row>
				</Table.Header>

				{!isEmptyList ? (
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
					<Table.Row className="footer-container">
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
			</StyledTable>
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

const StyledTable = styled(Table)`
	td {
		width: 5%;
	}
`;
