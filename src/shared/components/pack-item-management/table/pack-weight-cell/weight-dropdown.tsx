import { useUserPermissionsContext } from '@/hooks/auth/use-user-permissions-context';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { Select, Text } from '@radix-ui/themes';
import { useMemo } from 'react';
import { WeightUnit } from '@/types/pack-types';

type WeightDropdownProps = {
	unit: WeightUnit;
	onChange: (unit: WeightUnit) => void;
};

export const WeightDropdown = ({ unit, onChange }: WeightDropdownProps) => {
	const { isCreator } = useUserPermissionsContext();
	const { settings } = useGetAuth();

	const orderedOptions = useMemo(() => {
		const isMetric = settings?.weightUnit === 'metric';
		return isMetric
			? [
					{ value: WeightUnit.g, label: 'g' },
					{ value: WeightUnit.kg, label: 'kg' },
					{ value: WeightUnit.oz, label: 'oz' },
					{ value: WeightUnit.lb, label: 'lb' },
				]
			: [
					{ value: WeightUnit.oz, label: 'oz' },
					{ value: WeightUnit.lb, label: 'lb' },
					{ value: WeightUnit.g, label: 'g' },
					{ value: WeightUnit.kg, label: 'kg' },
				];
	}, [settings?.weightUnit]);

	if (isCreator) {
		return (
			<Select.Root size="2" value={unit} onValueChange={onChange}>
				<Select.Trigger variant="ghost" />
				<Select.Content>
					{orderedOptions.map((option) => (
						<Select.Item key={option.value} value={option.value}>
							{option.label}
						</Select.Item>
					))}
				</Select.Content>
			</Select.Root>
		);
	} else {
		return <Text>{unit}</Text>;
	}
};
