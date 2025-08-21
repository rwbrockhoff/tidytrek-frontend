import { Segment, SegmentHeader } from '@/components/primitives';
import { PaletteName } from '@/styles/palette/palette-constants';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { useUpdateSettingsMutation } from '@/queries/user-settings-queries';
import { Message } from '@/components/ui';
import { PalettePicker } from '@/shared/components/palette-picker';

export const ProfilePalette = () => {
	const { settings, isLoading } = useGetAuth();
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
				<Message
					messageType="error"
					text="There was an error updating your palette at this time."
				/>
			)}
		</Segment>
	);
};
