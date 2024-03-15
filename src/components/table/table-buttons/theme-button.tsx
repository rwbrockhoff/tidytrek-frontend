import { Flex, Popover } from '@radix-ui/themes';
import { Button } from '@radix-ui/themes';
import styled, { useTheme } from 'styled-components';

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
					<CircleButton $themeColor={color} />
				</Flex>
			</Popover.Trigger>

			<Popover.Content side="top">
				<Flex>
					{Object.keys(userTheme).map((color, index) => (
						<CircleButton
							key={color || index}
							$themeColor={color}
							onClick={() => handleOnClick(color)}
						/>
					))}
				</Flex>
			</Popover.Content>
		</Popover.Root>
	);
};

const CircleButton = styled(Button)<{ $themeColor: string | undefined }>`
	&&& {
		padding: 0px;
		${(props) => props.theme.mx.themeBgColor(props.$themeColor)};
		${({ theme }) => theme.mx.wh('18px')}
		margin: 5px 10px;
		border-radius: 9px;
		cursor: pointer;
	}
`;
