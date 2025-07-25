import { useUserContext } from '@/hooks/auth/use-user-context';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { Select, Text } from '@radix-ui/themes';
import { useMemo } from 'react';

type WeightDropdownProps = {
	unit: string;
	onChange: (unit: string) => void;
};

export const WeightDropdown = ({ unit, onChange }: WeightDropdownProps) => {
	const userView = useUserContext();
	const { settings } = useGetAuth();
	
	const orderedOptions = useMemo(() => {
		const isMetric = settings?.weightUnit === 'metric';
		return isMetric
			? [{ value: 'g', label: 'g' }, { value: 'kg', label: 'kg' }, { value: 'oz', label: 'oz' }, { value: 'lb', label: 'lb' }]
			: [{ value: 'oz', label: 'oz' }, { value: 'lb', label: 'lb' }, { value: 'g', label: 'g' }, { value: 'kg', label: 'kg' }];
	}, [settings?.weightUnit]);

	if (userView) {
		return (
			<Select.Root size="2" value={unit} onValueChange={onChange}>
				<Select.Trigger variant="ghost" />
				<Select.Content>
					{orderedOptions.map(option => (
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
