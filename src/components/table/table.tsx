import styled from 'styled-components';
import { Table as RadixTable } from '@radix-ui/themes';
import { usePricingContext, useUserContext } from '@/hooks';
import React, { useMemo } from 'react';

export const Table = ({ children }: { children: React.ReactNode }) => {
	const showPrices = usePricingContext() || false;
	const isUser = useUserContext();

	const generateWidth = () =>
		useMemo(() => {
			let cellWidth = 30;
			if (showPrices) cellWidth -= 5;
			if (!isUser) cellWidth += 5;
			return `${cellWidth}%`;
		}, [isUser, showPrices]);

	const mainCellWidth = generateWidth();

	return (
		<StyledTable variant="surface" size="1">
			<colgroup>
				<col width={mainCellWidth} />
				<col width={mainCellWidth} />
				<col width="12%" />
				<col width="8%" />
				<col width="10%" />
				{showPrices && <col width="10%" />}
				{isUser && <col width="10%" />}
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
	}

	${({ theme: t }) =>
		t.mx.mobile(`
			col {
				width: 100%;
			}
			tbody tr {
				width: 100%;
				display: flex;
				flex-direction: column;
				min-height: 60px;
				td {
					height: 60px;
				}
			}

		`)}
`;
