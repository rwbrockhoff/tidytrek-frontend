import { Segment, SegmentHeader } from '@/components/primitives';
import { PaletteName } from '@/styles/palette/palette-constants';
import { useAuth } from '@/hooks/auth/use-auth';
import { useUpdateSettingsMutation } from '@/queries/user-settings-queries';
import { Alert } from '@/components/ui';
import { PalettePicker } from '@/shared/components/palette-picker';

export const ProfilePalette = () => {
	const { settings, isLoading } = useAuth();
	const { mutate: updateSettings, isError } = useUpdateSettingsMutation();

	const handlePaletteChange = (value: PaletteName) => {
		if (value !== settings?.palette) updateSettings({ palette: value });
	};

	if (isLoading) return null;
	
	return (
		<Segment>
			<SegmentHeader
				title="Default Palette"
				description="Choose your default theme for new packs and your gear closet."
			/>
			<PalettePicker 
				currentPalette={settings?.palette} 
				onPaletteChange={handlePaletteChange}
				className="md:mr-12"
			/>
			{isError && (
				<Alert
					variant="error"
					className="my-4"
				>
					There was an error updating your palette at this time.
				</Alert>
			)}
		</Segment>
	);
};
