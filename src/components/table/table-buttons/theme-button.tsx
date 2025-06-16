import styles from './theme-button.module.css';
import { Flex, Popover } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import { paletteList } from '@/styles/theme/palette-constants';

type ThemeButtonProps = {
	color: string | undefined;
	onClick: (categoryColor: string) => void;
};

export const ThemeButton = ({ color, onClick }: ThemeButtonProps) => {
	const handleOnClick = (newColor: string) => onClick(newColor);

	return (
		<Popover.Root>
			<Popover.Trigger>
				<Flex align="center" justify="center" m="1">
					<Button
						className={styles.circleButton}
						style={{
							backgroundColor: color ? `var(--${color})` : 'inherit',
						}}
					/>
				</Flex>
			</Popover.Trigger>

			<Popover.Content side="top">
				<Flex>
					{paletteList.map((themeColor, index) => (
						<Button
							key={themeColor || index}
							className={styles.circleButton}
							style={{
								backgroundColor: `var(--${themeColor})`,
							}}
							onClick={() => handleOnClick(themeColor)}
						/>
					))}
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};
