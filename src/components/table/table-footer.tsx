import { Button, Table } from '@radix-ui/themes';
import { PlusIcon } from '../ui';
import styled from 'styled-components';
import { usePricingContext, useUserContext } from '@/hooks/use-viewer-context';

type TableFooterProps = {
	itemQuantity: number;
	weight: number;
	price: string;
	handleAddItem: () => void;
};

export const TableFooter = ({
	itemQuantity,
	weight,
	price,
	handleAddItem,
}: TableFooterProps) => {
	const userView = useUserContext();
	const showPrices = usePricingContext();
	const hasItems = itemQuantity > 0;

	return (
		<StyledFooter>
			<StyledRow>
				<Table.Cell colSpan={hasItems ? 3 : 6}>
					{userView && (
						<Button
							variant="outline"
							color="gray"
							size="1"
							ml="4"
							onClick={handleAddItem}>
							<PlusIcon />
							Add Item
						</Button>
					)}
				</Table.Cell>

				{hasItems && (
					<>
						<StyledCell style={{ textAlign: 'left' }}>{itemQuantity} Items</StyledCell>
						<StyledCell style={{ textAlign: 'left' }}>{`${weight} lbs`}</StyledCell>
						{showPrices && <StyledCell>{price}</StyledCell>}
					</>
				)}
				{userView && <Table.Cell></Table.Cell>}
			</StyledRow>
		</StyledFooter>
	);
};

export const StyledFooter = styled.tfoot`
	background-color: ${({ theme: t }) => t.tidy.tidyLightGrey};
	font-size: 0.9em;
	color: grey;
	vertical-align: top;
	td {
		box-shadow: none;
	}
	${({ theme: t }) =>
		t.mx.mobile(`
			font-size: 1.1em;
		`)}
`;

const StyledRow = styled(Table.Row)`
	${({ theme: t }) =>
		t.mx.mobile(`
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
`;

const StyledCell = styled(Table.Cell)`
	text-align: center;
	font-size: 1em;
`;
