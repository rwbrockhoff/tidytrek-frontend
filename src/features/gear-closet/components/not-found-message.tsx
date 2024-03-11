import { Icon, Table } from 'semantic-ui-react';

export const NotFoundMessage = () => {
	return (
		<Table.Body>
			<Table.Row>
				<Table.Cell colSpan="24" textAlign="center" style={{ opacity: 0.4 }}>
					<Icon name="search" /> No Items Found.
				</Table.Cell>
			</Table.Row>
		</Table.Body>
	);
};
