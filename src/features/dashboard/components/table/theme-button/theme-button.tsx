import styles from './theme-button.module.css';
import { Flex } from '@/components/layout';
import { Popover } from '@radix-ui/themes';
import { Button } from '@/components/alpine';
import { paletteList } from '@/styles/palette/palette-constants';
import { cn, mx } from '@/styles/utils';

type ThemeButtonProps = {
	paletteColor: string | undefined;
	disabled: boolean;
	onClick: (categoryColor: string) => void;
};

export const ThemeButton = ({ paletteColor, disabled, onClick }: ThemeButtonProps) => {
	const handleOnClick = (newColor: string) => onClick(newColor);

	const bgColorPalette = {
		backgroundColor: paletteColor ? `var(--${paletteColor})` : 'inherit',
	};

	if (disabled) {
		return (
			<Flex className="items-center justify-center m-1">
				<Button
					className={cn(styles.circleButton, mx.noPointer)}
					style={bgColorPalette}
					disabled={disabled}
				/>
			</Flex>
		);
	}

	return (
		<Popover.Root>
			<Popover.Trigger>
				<Flex className="items-center justify-center m-1">
					<Button
						className={styles.circleButton}
						style={bgColorPalette}
					/>
				</Flex>
			</Popover.Trigger>

			<Popover.Content side="top">
				<Flex>
					{paletteList.map((themeColor, index) => (
						<Popover.Close key={themeColor || index}>
							<Button
								className={styles.circleButton}
								style={{
									backgroundColor: `var(--${themeColor})`,
								}}
								onClick={() => handleOnClick(themeColor)}
							/>
						</Popover.Close>
					))}
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};
