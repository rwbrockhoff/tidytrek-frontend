import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { Table } from '@/components/alpine';
import { PropertyButtons } from '../../property-buttons';
import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useCellWidth } from '../hooks/use-cell-width';

type PropertiesCellProps = {
	isDisabled: boolean;
	onClick: (property: PackItemProperty) => void;
	packItem: BaseTableRowItem;
	isDragging: boolean;
};

export const PropertiesCell = (props: PropertiesCellProps) => {
	const { isDisabled, onClick, packItem, isDragging } = props;

	const { isCreator } = useUserPermissionsContext();
	const { wornWeight, consumable, favorite } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	return (
		<Table.Cell textAlign="center" align="center" ref={ref} style={{ width }}>
			<PropertyButtons
				wornWeight={wornWeight || false}
				consumable={consumable || false}
				favorite={favorite || false}
				isDisabled={isDisabled || !isCreator}
				onClick={onClick}
			/>
		</Table.Cell>
	);
};
