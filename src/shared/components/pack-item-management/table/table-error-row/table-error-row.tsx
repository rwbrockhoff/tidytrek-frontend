import { type FormError } from '@/types/form-types';
import { Text } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Table } from '@/components/alpine';
import { WarningIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './table-error-row.module.css';

export const TableErrorRow = ({ error }: { error: FormError }) => {
	const hasError = error.error;

	return (
		<Table.Row
			className={cn(styles.errorRow, hasError ? styles.hasError : styles.noError)}>
			<Table.Cell
				className={cn(styles.errorCell, hasError ? styles.hasError : styles.noError)}
				colSpan={24}
				verticalAlign="middle">
				<Flex className="justify-center items-center h-full">
					<WarningIcon />
					<Text trim="both" ml="2" weight="light">
						{error.message}
					</Text>
				</Flex>
			</Table.Cell>
		</Table.Row>
	);
};
