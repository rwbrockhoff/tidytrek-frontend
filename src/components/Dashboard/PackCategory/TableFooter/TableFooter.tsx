import { Table, Icon } from 'semantic-ui-react';
import { Button } from '../../../../shared/ui/SemanticUI';
import styled from 'styled-components';
import { useUserContext } from '../../../../views/Dashboard/hooks/useUserContext';
import { themeBgColor } from '../../../../shared/mixins/mixins';

type TableFooterProps = {
	itemQuantity: number;
	weight: number;
	handleAddItem: () => void;
};

const TableFooter = ({ itemQuantity, weight, handleAddItem }: TableFooterProps) => {
	const userView = useUserContext();
	return (
		<StyledFooter>
			<Table.Row className="footer-container">
				<Table.Cell colSpan={userView ? 11 : 12}>
					{userView && (
						<Button
							size="mini"
							floated="left"
							compact
							basic
							$footerButton
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
		</StyledFooter>
	);
};

export default TableFooter;

export const StyledFooter = styled(Table.Footer)`
	&& {
		${themeBgColor('lightGrey')}
		font-size: 0.9em;
		color: grey;
	}
`;
