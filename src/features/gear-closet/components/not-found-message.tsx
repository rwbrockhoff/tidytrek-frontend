import { SearchIcon } from '@/components/icons';
import { Table } from '@/components/alpine';
import { Flex } from '@/components/layout';

export const NotFoundMessage = () => {
	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan={24} style={{ opacity: 0.4 }} align="center">
					<Flex className="justify-center items-center p-1 gap-1">
						<SearchIcon />
						<p>No Items Found</p>
					</Flex>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};
