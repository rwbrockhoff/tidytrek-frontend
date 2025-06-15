import { useTheme } from 'styled-components';
import styles from './theme-button.module.css';
import { Flex, Popover } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';

type ThemeButtonProps = {
	color: string | undefined;
	onClick: (categoryColor: string) => void;
};

export const ThemeButton = ({ color, onClick }: ThemeButtonProps) => {
	const { user: userTheme } = useTheme() || {};

	const handleOnClick = (newColor: string) => onClick(newColor);

	return (
		<Popover.Root>
			<Popover.Trigger>
				<Flex align="center" justify="center" m="1">
					<Button
						className={styles.circleButton}
						style={{
							backgroundColor: userTheme?.[color as keyof typeof userTheme] || 'inherit',
						}}
					/>
				</Flex>
			</Popover.Trigger>

			<Popover.Content side="top">
				<Flex>
					{Object.keys(userTheme || {}).map((themeColor, index) => (
						<Button
							key={themeColor || index}
							className={styles.circleButton}
							style={{
								backgroundColor:
									userTheme?.[themeColor as keyof typeof userTheme] || 'inherit',
							}}
							onClick={() => handleOnClick(themeColor)}
						/>
					))}
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};
