import { SearchIcon } from '@/components/ui';
import { Table, Flex } from '@radix-ui/themes';

export const NotFoundMessage = () => {
	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan={24} style={{ opacity: 0.4 }} align="center">
					<Flex asChild justify="center" align="center" p="3" gap="1">
						<p>
							<SearchIcon />
							No Items Found
						</p>
					</Flex>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};
