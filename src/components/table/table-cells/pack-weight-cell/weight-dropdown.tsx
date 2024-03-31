import { useUserContext } from '@/hooks/use-viewer-context';
import { Select, Text } from '@radix-ui/themes';

type WeightDropdownProps = {
	unit: string;
	onChange: (unit: string) => void;
};

export const WeightDropdown = ({ unit, onChange }: WeightDropdownProps) => {
	const userView = useUserContext();

	if (userView) {
		return (
			<Select.Root size="2" value={unit} onValueChange={onChange}>
				<Select.Trigger variant="ghost" />
				<Select.Content style={{ height: 'fit-content' }}>
					<Select.Item value="oz">oz</Select.Item>
					<Select.Item value="lb">lb</Select.Item>
					<Select.Item value="g">g</Select.Item>
					<Select.Item value="kg">kg</Select.Item>
				</Select.Content>
			</Select.Root>
		);
	} else {
		return <Text>{unit}</Text>;
	}
};
