import { FaSearch as SearchIcon } from 'react-icons/fa';
import { Icon } from '@/components/ui';
import { Table, Flex } from '@radix-ui/themes';

export const NotFoundMessage = () => {
	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan={24} style={{ opacity: 0.4 }} align="center">
					<Flex asChild justify="center">
						<p>
							<Icon>
								<SearchIcon />
							</Icon>
							No Items Found
						</p>
					</Flex>
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};
