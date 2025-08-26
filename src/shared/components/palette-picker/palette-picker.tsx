import { Flex, Stack } from '@/components/layout';
import {
	PALETTE_NAMES,
	paletteList,
	PaletteName,
} from '@/styles/palette/palette-constants';
import styles from './palette-picker.module.css';
import { Text } from '@radix-ui/themes';
import { cn } from '@/styles/utils';
import { CheckCircle2 } from 'lucide-react';

type PalettePickerProps = {
	currentPalette: PaletteName | undefined;
	onPaletteChange: (palette: PaletteName) => void;
	disabled?: boolean;
	className?: string;
};

export const PalettePicker = ({
	currentPalette,
	onPaletteChange,
	disabled = false,
	className,
}: PalettePickerProps) => {
	return (
		<div className={cn(className)}>
			<Flex
				className={cn(
					disabled && styles.disabledThemeSelection,
					'gap-4 md:flex-wrap md:flex-row flex-col',
				)}>
				{PALETTE_NAMES.map((paletteTheme) => {
					const isCurrentPalette = paletteTheme === currentPalette;
					return (
						<Stack
							data-theme-palette={paletteTheme}
							className={cn(styles.themeRow, 'hover-lift gap-2')}
							style={{
								borderColor: isCurrentPalette ? 'var(--color-primary)' : '',
							}}
							key={`${paletteTheme}-palette`}
							onClick={() => !disabled && onPaletteChange(paletteTheme)}
							tabIndex={disabled ? -1 : 0}
							role="button"
							aria-label={`Select ${paletteTheme} palette theme`}
							aria-pressed={isCurrentPalette}
							onKeyDown={(e) => {
								if (disabled) return;
								if (e.key === 'Enter' || e.key === ' ') {
									e.preventDefault();
									onPaletteChange(paletteTheme);
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
		</div>
	);
};