import { type PackItemProperty } from '@/types/pack-types';
import { Table } from '@/components/ui/alpine';
import { PropertyButtons } from '@/components/ui/property-buttons/property-buttons';
import { useUserContext } from '@/hooks/use-viewer-context';
import { useContext } from 'react';
import { TableRowContext } from '../../context/table-row-context';
import { useCellWidth } from '@/components/table/hooks/use-cell-width';

type ButtonProps = {
	display: boolean;
	isDisabled: boolean;
	onClick: (property: PackItemProperty) => void;
};

export const PropertiesCell = (props: ButtonProps) => {
	const { display, isDisabled, onClick } = props;

	const userView = useUserContext();
	const { packItem, isDragging } = useContext(TableRowContext);
	const { wornWeight, consumable, favorite } = packItem || {};
	const { ref, width } = useCellWidth(isDragging);

	const showOnHover = (display && userView) || isDragging;

	return (
		<Table.Cell textAlign="center" align="center" ref={ref} style={{ width }}>
			<PropertyButtons
				wornWeight={wornWeight || false}
				consumable={consumable || false}
				favorite={favorite || false}
				isDisabled={isDisabled || !userView}
				showAlways={showOnHover}
				onClick={onClick}
			/>
		</Table.Cell>
	);
};
