import { Table, Icon } from 'semantic-ui-react';
import { Button } from '../../../../shared/ui/SemanticUI';
import styled from 'styled-components';
import {
	usePricingContext,
	useUserContext,
} from '../../../../views/Dashboard/hooks/useViewerContext';
import { mobile, themeBgColor } from '../../../../shared/mixins/mixins';
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

	//calculate colSpans
	const firstColumnSize =
		(hasItems ? 14 : 19) + (userView ? 0 : 2) + (showPrices ? 0 : 3);
	const firstCol = firstColumnSize + (!hasItems && showPrices ? 3 : 0);

	return (
		<StyledFooter>
			<StyledRow>
				<Table.Cell colSpan={firstCol}>
					{userView && (
						<StyledButton
							size="mini"
							floated="left"
							compact
							basic
							$footerButton
							onClick={handleAddItem}>
							<Icon name="add" />
							Add Item
						</StyledButton>
					)}
				</Table.Cell>

				{hasItems && (
					<>
						<StyledCell textAlign="left" colSpan={2}>
							{itemQuantity} Items
						</StyledCell>
						<StyledCell textAlign="center" colSpan={3}>
							<TableText $width="100px">{`${weight} lbs`}</TableText>
						</StyledCell>

						{showPrices && (
							<StyledCell textAlign="left" colSpan={3} style={{ paddingLeft: '25px' }}>
								<TableText $width="75px" $paddingLeft="13px">
									{price}
								</TableText>
							</StyledCell>
						)}
					</>
				)}
				{userView && <Table.Cell colSpan={2}></Table.Cell>}
			</StyledRow>
		</StyledFooter>
	);
};

export default TableFooter;

export const StyledFooter = styled(Table.Footer)`
	&& {
		${themeBgColor('lightGrey')}
		font-size: 0.9em;
		color: grey;
		${mobile(`
			font-size: 1.1em;
		`)}
	}
`;

const StyledRow = styled(Table.Row)`
	&&& {
		${mobile(`
			display: flex !important;
			position: relative;
			height: 50px;
			padding-top: 10px;
			td:first-child {
				position: absolute;
				top: 50px;
				left: -10px;
			}
			td:last-child {
				display: none !important;
			}
			td {
				border: none !important;
			}
			td:not(:first-child) {
				height: 40px;
			}
		`)}
	}
`;

const StyledCell = styled(Table.Cell)`
	&&& {
		text-align: center;
		font-size: 1em;
	}
`;

const StyledButton = styled(Button)`
	&&& {
		font-size: 1em;
	}
`;
