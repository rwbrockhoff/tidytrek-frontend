import { SearchIcon } from '@/components/icons';
import { Table } from '@/components/alpine';
import { Flex } from '@/components/layout';
import { useTableColumnWidths } from '@/shared/components/pack-item-management/table/hooks/use-table-column-widths';

export const NotFoundMessage = () => {
	const { totalColumns } = useTableColumnWidths();
	return (
		<Table.Row>
			<Table.Cell colSpan={totalColumns} align="center">
				<Flex className="justify-center items-center p-2 gap-2">
					<SearchIcon />
					<p>No Items Found</p>
				</Flex>
			</Table.Cell>
		</Table.Row>
	);
};
