import { Flex, Stack } from '@/components/layout';
import { Segment, SegmentHeader } from '@/components/primitives';
import {
	PALETTE_NAMES,
	paletteList,
	PaletteName,
} from '@/styles/palette/palette-constants';
import styles from './profile-palette-section.module.css';
import { Text } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import { useGetAuth } from '@/hooks/auth/use-get-auth';
import { CheckCircle2 } from 'lucide-react';
import { useUpdateSettingsMutation } from '@/queries/user-settings-queries';
import { Message } from '@/components/ui';

export const ProfilePalette = () => {
	const { settings, isLoading } = useGetAuth();
	const { mutate: updateSettings, isPending, isError } = useUpdateSettingsMutation();

	const handlePaletteChange = (value: PaletteName) => {
		if (value !== settings?.palette) updateSettings({ palette: value });
	};

	const currentPalette = settings?.palette;

	if (isLoading) return null;
	return (
		<Segment>
			<SegmentHeader
				title="Profile Palette"
				description="Choose your accent theme to customize the feel of your pack."
			/>
			<Flex
				className={cn(
					isPending && styles.disabledThemeSelection,
					'gap-4 md:flex-wrap md:flex-row flex-col md:mr-12',
				)}>
				{PALETTE_NAMES.map((paletteTheme) => {
					const isCurrentPalette = paletteTheme === currentPalette;
					return (
						<Stack
							data-theme-palette={paletteTheme}
							className={cn(styles.themeRow, 'gap-2')}
							style={{
								borderColor: isCurrentPalette ? 'var(--color-primary)' : '',
							}}
							key={`${paletteTheme}-palette`}
							onClick={() => handlePaletteChange(paletteTheme)}
							tabIndex={0}
							role="button"
							aria-label={`Select ${paletteTheme} palette theme`}
							aria-pressed={isCurrentPalette}
							onKeyDown={(e) => {
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									handlePaletteChange(paletteTheme);
								}
							}}>
							<Flex className="justify-between">
								<Text size="2" weight="medium">
									{paletteTheme}
								</Text>

								{isCurrentPalette && <CheckCircle2 />}
							</Flex>
							<Flex>
								{paletteList.map((paletteColor) => {
									return (
										<Flex key={`${paletteColor}-palette-color`}>
											<div
												className={styles.themeSquare}
												style={{
													backgroundColor: `var(--${paletteColor})`,
												}}></div>
										</Flex>
									);
								})}
							</Flex>
						</Stack>
					);
				})}
			</Flex>
			{isError && (
				<Message
					messageType="error"
					text="There was an error updating your palette at this time."
				/>
			)}
		</Segment>
	);
};
