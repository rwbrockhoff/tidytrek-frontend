import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { Table } from '@/components/alpine';
import { PropertyButtons } from '@/components/ui/property-buttons/property-buttons';
import { useUserContext } from '@/hooks/auth/use-user-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type PropertiesCellProps = {
	isDisabled: boolean;
	onClick: (property: PackItemProperty) => void;
	packItem: BaseTableRowItem;
	isDragging: boolean;
};

export const PropertiesCell = (props: PropertiesCellProps) => {
	const { isDisabled, onClick, packItem, isDragging } = props;

	const userView = useUserContext();
	const { wornWeight, consumable, favorite } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	return (
		<Table.Cell textAlign="center" align="center" ref={ref} style={{ width }}>
			<PropertyButtons
				wornWeight={wornWeight || false}
				consumable={consumable || false}
				favorite={favorite || false}
				isDisabled={isDisabled || !userView}
				onClick={onClick}
			/>
		</Table.Cell>
	);
};
