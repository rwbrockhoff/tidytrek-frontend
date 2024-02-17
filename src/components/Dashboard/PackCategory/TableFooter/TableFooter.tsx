import { Table, Button, Icon } from 'semantic-ui-react';
import { useUserContext } from '../../../../views/Dashboard/useUserContext';

type TableFooterProps = {
	itemQuantity: number;
	weight: number;
	handleAddItem: () => void;
};

const TableFooter = ({ itemQuantity, weight, handleAddItem }: TableFooterProps) => {
	const userView = useUserContext();
	return (
		<Table.Footer>
			<Table.Row className="footer-container">
				<Table.Cell colSpan={userView ? 11 : 12}>
					{userView && (
						<Button
							size="mini"
							floated="left"
							compact
							basic
							className="add-item-table-button"
							onClick={handleAddItem}>
							<Icon name="add" />
							Add Item
						</Button>
					)}
				</Table.Cell>
				<Table.Cell textAlign="center" colSpan={2} style={{ paddingLeft: '50px' }}>
					{itemQuantity} Items
				</Table.Cell>
				<Table.Cell
					textAlign="center"
					colSpan={2}
					style={{ paddingLeft: userView ? '25px' : 0 }}>{`${weight} lbs`}</Table.Cell>
				{userView && <Table.Cell colSpan={1}></Table.Cell>}
			</Table.Row>
		</Table.Footer>
	);
};

export default TableFooter;
