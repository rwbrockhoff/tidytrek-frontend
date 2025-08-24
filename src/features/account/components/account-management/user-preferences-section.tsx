import { useAuth } from '@/hooks/auth/use-auth';
import { useUpdateSettingsMutation } from '@/queries/user-settings-queries';
import { Select } from '@radix-ui/themes';
import { Segment, SegmentHeader } from '@/components/primitives';
import { Stack } from '@/components/layout';
import { Message } from '@/components/ui';
import { cn } from '@/styles/utils';
import styles from './user-preferences-section.module.css';

const CURRENCY_OPTIONS = [
	{ value: 'USD', label: 'USD ($)' },
	{ value: 'EUR', label: 'EUR (€)' },
	{ value: 'GBP', label: 'GBP (£)' },
	{ value: 'CAD', label: 'CAD ($)' },
	{ value: 'AUD', label: 'AUD ($)' },
	{ value: 'JPY', label: 'JPY (¥)' },
];

const WEIGHT_UNIT_OPTIONS = [
	{ value: 'metric', label: 'Metric (kg, g)' },
	{ value: 'imperial', label: 'Imperial (lbs, oz)' },
];

export const UserPreferencesSection = () => {
	const { settings } = useAuth();
	const { mutate: updateSettings, isError } = useUpdateSettingsMutation();

	const handleWeightUnitChange = (value: string) => {
		updateSettings({ weightUnit: value as 'metric' | 'imperial' });
	};

	const handleCurrencyChange = (value: string) => {
		updateSettings({ currencyUnit: value });
	};

	if (!settings) return null;

	return (
		<Segment>
			<SegmentHeader
				title="Preferences"
				description="Choose how you want to see weights and prices."
			/>
			<Stack className="gap-4">
				<Stack className="justify-center gap-1">
					<label htmlFor="weight-unit-select">Weight Units</label>
					<Select.Root value={settings.weightUnit} onValueChange={handleWeightUnitChange}>
						<Select.Trigger id="weight-unit-select" className={cn(styles.selectTrigger, 'dropdown-primary')} />
						<Select.Content>
							{WEIGHT_UNIT_OPTIONS.map((option) => (
								<Select.Item key={option.value} value={option.value}>
									{option.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</Stack>

				<Stack className="justify-center gap-1">
					<label htmlFor="currency-select">Currency</label>
					<Select.Root value={settings.currencyUnit} onValueChange={handleCurrencyChange}>
						<Select.Trigger id="currency-select" className={cn(styles.selectTrigger, 'dropdown-primary')} />
						<Select.Content>
							{CURRENCY_OPTIONS.map((option) => (
								<Select.Item key={option.value} value={option.value}>
									{option.label}
								</Select.Item>
							))}
						</Select.Content>
					</Select.Root>
				</Stack>
			</Stack>
			{isError && (
				<Message
					messageType="error"
					text="There was an error updating your preferences at this time."
				/>
			)}
		</Segment>
	);
};
