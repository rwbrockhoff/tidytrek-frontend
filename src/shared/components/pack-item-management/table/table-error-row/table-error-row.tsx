import { type FormError } from '@/types/form-types';
import { Text } from '@radix-ui/themes';
import { Flex } from '@/components/layout';
import { Table } from '@/components/alpine';
import { WarningIcon } from '@/components/icons';
import { cn } from '@/styles/utils';
import styles from './table-error-row.module.css';

export const TableErrorRow = ({ error }: { error: FormError }) => {
	if (!error.error) {
		return null;
	}

	return (
		<Table.Row>
			<Table.Cell
				className={cn(styles.errorCell, 'py-4')}
				colSpan={24}
				verticalAlign="middle">
				<Flex className="justify-center items-center gap-2">
					<WarningIcon />
					<Text trim="both" size="2">
						{error.message}
					</Text>
				</Flex>
			</Table.Cell>
		</Table.Row>
	);
};
