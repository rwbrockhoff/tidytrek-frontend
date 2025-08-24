import { type PackItemProperty, type BaseTableRowItem } from '@/types/pack-types';
import { Table } from '@/components/alpine';
import { PropertyButtons } from '../../property-buttons';
import { usePermissions } from '@/hooks/auth/use-permissions';

type PropertiesCellProps = {
	isDisabled: boolean;
	onClick: (property: PackItemProperty) => void;
	packItem: BaseTableRowItem;
};

export const PropertiesCell = (props: PropertiesCellProps) => {
	const { isDisabled, onClick, packItem } = props;

	const { isCreator } = usePermissions();
	const { wornWeight, consumable, favorite } = packItem || {};

	return (
		<Table.Cell textAlign="center" align="center">
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
