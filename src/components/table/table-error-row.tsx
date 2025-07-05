import { type FormError } from '@/types/form-types';
import { Flex, Text } from '@radix-ui/themes';
import { TableRow, TableCell } from '@/components/ui/alpine';
import { WarningIcon } from '../ui';
import { cn } from '@/styles/utils';
import styles from './table-error-row.module.css';

export const TableErrorRow = ({ error }: { error: FormError }) => {
	const hasError = error.error;

	return (
		<TableRow
			className={cn(styles.errorRow, hasError ? styles.hasError : styles.noError)}>
			<TableCell
				className={cn(styles.errorCell, hasError ? styles.hasError : styles.noError)}
				colSpan={24}
				verticalAlign="middle">
				<Flex justify="center" align="center" height="100%">
					<WarningIcon />
					<Text trim="both" ml="2" weight="light">
						{error.message}
					</Text>
				</Flex>
			</TableCell>
		</TableRow>
	);
};
