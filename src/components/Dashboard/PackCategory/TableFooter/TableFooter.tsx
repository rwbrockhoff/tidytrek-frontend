import { Table, Icon } from 'semantic-ui-react';
import { Button } from '../../../../shared/ui/SemanticUI';
import styled from 'styled-components';
import {
	usePricingContext,
	useUserContext,
} from '../../../../views/Dashboard/hooks/useViewerContext';
import { themeBgColor } from '../../../../shared/mixins/mixins';
import { TableText } from '../TableHeader/TableHeader';

type TableFooterProps = {
	itemQuantity: number;
	weight: number;
	price: string;
	handleAddItem: () => void;
};

const TableFooter = ({
	itemQuantity,
	weight,
	price,
	handleAddItem,
}: TableFooterProps) => {
	const userView = useUserContext();
	const showPrices = usePricingContext();
	const hasItems = itemQuantity > 0;
	const firstColumnSize =
		(hasItems ? 14 : 22) + (userView ? 0 : 2) + (showPrices ? 0 : 3);

	return (
		<StyledFooter>
			<Table.Row className="footer-container">
				<Table.Cell colSpan={firstColumnSize}>
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

				{hasItems && (
					<>
						<Table.Cell textAlign="left" colSpan={2}>
							{itemQuantity} Items
						</Table.Cell>
						<Table.Cell textAlign="center" colSpan={3}>
							<TableText $width="100px">{`${weight} lbs`}</TableText>
						</Table.Cell>

						{showPrices && (
							<Table.Cell textAlign="left" colSpan={3} style={{ paddingLeft: '25px' }}>
								<TableText $width="75px" $paddingLeft="13px">
									{price}
								</TableText>
							</Table.Cell>
						)}
					</>
				)}
				{userView && <Table.Cell colSpan={2}></Table.Cell>}
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
