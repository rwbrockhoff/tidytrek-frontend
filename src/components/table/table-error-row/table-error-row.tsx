import { type FormError } from '@/types/form-types';
import { Flex, Text } from '@radix-ui/themes';
import { Table } from '@/components/ui/alpine';
import { WarningIcon } from '../../ui';
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
				<Flex justify="center" align="center" height="100%">
					<WarningIcon size={16} />
					<Text trim="both" ml="2" weight="light">
						{error.message}
					</Text>
				</Flex>
			</Table.Cell>
		</Table.Row>
	);
};
