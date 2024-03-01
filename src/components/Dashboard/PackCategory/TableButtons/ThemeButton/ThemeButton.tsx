import { Popup as SemPopup, PopupContent } from 'semantic-ui-react';
import { Button } from '../../../../../shared/ui/SemanticUI';
import styled, { useTheme } from 'styled-components';

type ThemeButtonProps = {
	color: string | undefined;
	onClick: (categoryColor: string) => void;
};

const ThemeButton = ({ color, onClick }: ThemeButtonProps) => {
	const { user: userTheme } = useTheme() || {};

	const handleOnClick = (newColor: string) => onClick(newColor);

	return (
		<Popup
			on="click"
			hoverable
			hideOnScroll
			trigger={
				<Container>
					<CircleButton $themeColor={color} circular />
				</Container>
			}>
			<PopupContent>
				<PopupContainer>
					{Object.keys(userTheme).map((color, index) => (
						<CircleButton
							key={color || index}
							$themeColor={color}
							circular
							onClick={() => handleOnClick(color)}
						/>
					))}
				</PopupContainer>
			</PopupContent>
		</Popup>
	);
};

export default ThemeButton;

const Container = styled.div`
	margin: 0px 5px;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const CircleButton = styled(Button)`
	&&& {
		padding: 0px;
		${({ theme }) => theme.mx.wh('18px')}
	}
`;

const PopupContainer = styled.div`
	&&& {
		display: flex;
		button {
			margin: 10px;
		}
	}
`;

const Popup = styled(SemPopup)`
	&&&& {
		margin-left: -12px;
	}
`;
