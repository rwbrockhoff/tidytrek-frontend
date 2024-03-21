import styled from 'styled-components';
import { Table as RadixTable } from '@radix-ui/themes';
import { usePricingContext } from '@/hooks';

type TableProps = {
	children: React.ReactNode;
};
export const Table = (props: TableProps) => {
	const showPrices = usePricingContext() || false;
	const { children } = props;
	return (
		<StyledTable variant="surface">
			<colgroup>
				<col width={showPrices ? '25%' : '30%'} />
				<col width={showPrices ? '25%' : '30%'} />
				<col width="12%" />
				<col width="8%" />
				<col width="10%" />
				{showPrices && <col width="10%" />}
				<col width="10%" />
			</colgroup>
			{children}
		</StyledTable>
	);
};

const StyledTable = styled(RadixTable.Root)`
	table-layout: fixed;
	border: none;
	width: 100%;
	min-width: 100%;
	tr:nth-child(even) {
		background-color: var(--gray-1);
	}
	thead.withPrimaryBorder {
		border-top: 3px solid var(--jade-9);
		/* box-shadow: inset 0px -4px 0px -2px var(--gray-3); */
	}
`;
